import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";
import { fetchAllTasks, dbRowToTask } from "@/data/taskSupabase";
import { useUser } from "@/contexts/UserContext";
import { filterTasksForUser, canUserViewTask } from "@/utils/taskVisibility";
import { toast } from "@/hooks/use-toast";

// Fallback polling interval in ms if real-time connection fails.
const FALLBACK_POLL_INTERVAL = 10000;
const MAX_RECONNECT_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1500;

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);
  const { currentUser } = useUser();
  const [fallbackTimer, setFallbackTimer] = useState<NodeJS.Timeout | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"live" | "polling" | "connecting">("connecting");
  const reconnectAttempts = useRef(0);
  const notifiedRef = useRef(false);
  const channelRef = useRef<any>(null); // Track the current channel

  // Filters and sets tasks so users only see what they should
  const secureSetTasks = (allTasks: Task[]) => {
    setTasks(filterTasksForUser(allTasks, currentUser));
  };

  // Fallback poller for when real-time fails
  const startFallbackPolling = () => {
    if (fallbackTimer) return;
    const timer = setInterval(async () => {
      try {
        const tasks = await fetchAllTasks();
        secureSetTasks(tasks);
      } catch (e) {
        console.error("Fallback fetchAllTasks error", e);
      }
    }, FALLBACK_POLL_INTERVAL);
    setFallbackTimer(timer);
  };

  const stopFallbackPolling = () => {
    if (fallbackTimer) clearInterval(fallbackTimer);
    setFallbackTimer(null);
  };

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    fetchAllTasks()
      .then(secureSetTasks)
      .finally(() => {
        loadingRef.current = false;
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    let realTimeConnected = false;
    setConnectionStatus("connecting");
    reconnectAttempts.current = 0;
    notifiedRef.current = false;

    // Totally remove previous channel (if any) before new one is made
    if (channelRef.current) {
      try {
        // Proper cleanup if the channel is active
        supabase.removeChannel(channelRef.current);
      } catch (e) {
        // Defensive: in case Supabase already removed
        console.warn("Tried to remove Supabase channel; error:", e);
      }
      channelRef.current = null;
    }
    stopFallbackPolling();

    // Always produce a *brand new* channel instance
    const setupChannel = (retryAttempt: number = 0) => {
      // Final cleanup (in case called recursively)
      if (channelRef.current) {
        try {
          supabase.removeChannel(channelRef.current);
        } catch (e) {
          console.warn("Cleanup before new channel (recursive)", e);
        }
        channelRef.current = null;
      }

      // CREATE new channel instance and assign to ref before subscription!
      const newChannel = supabase
        .channel("public-tasks-change-" + Date.now() + "-" + Math.random()) // Ensure unique channel name so each is a true instance!
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "tasks" },
          payload => {
            const row = payload.new ?? payload.old;
            if (!row) return;
            console.log("Supabase realtime event received:", {
              eventType: payload.eventType,
              row,
              payload,
              currentUser,
            });
            setTasks(prev => {
              const filteredPrev = filterTasksForUser(prev, currentUser);
              const task = dbRowToTask(row);
              const visible = canUserViewTask(task, currentUser);
              if (!visible.allowed) {
                if (filteredPrev.some(t => t.id === task.id)) {
                  return filteredPrev.filter(t => t.id !== task.id);
                }
                return filteredPrev;
              }
              if (payload.eventType === "INSERT") {
                if (!filteredPrev.some(t => t.id === task.id)) {
                  console.log("[Realtime] INSERT: Adding task to local state", task);
                  return [task, ...filteredPrev];
                }
                return filteredPrev;
              }
              if (payload.eventType === "UPDATE") {
                console.log("[Realtime] UPDATE: Updating existing task", task);
                const present = filteredPrev.some(t => t.id === task.id);
                if (present) {
                  return filteredPrev.map(t => (t.id === task.id ? task : t));
                }
                return [task, ...filteredPrev];
              }
              if (payload.eventType === "DELETE") {
                console.log("[Realtime] DELETE: Removing task from local state", task);
                return filteredPrev.filter(t => t.id !== task.id);
              }
              return filteredPrev;
            });
          }
        );

      // Assign *before* subscribing, to avoid reference leaks
      channelRef.current = newChannel;

      // Immediately subscribe ONCE per instance
      newChannel.subscribe((status: string) => {
        if (status === "SUBSCRIBED") {
          realTimeConnected = true;
          setConnectionStatus("live");
          stopFallbackPolling();
          if (!notifiedRef.current) {
            toast({
              title: "Live updates active",
              description: "You're getting instant task changes.",
              duration: 1200,
            });
            notifiedRef.current = true;
          }
        } else if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          realTimeConnected = false;
          reconnectAttempts.current += 1;
          setConnectionStatus("connecting");
          if (reconnectAttempts.current <= MAX_RECONNECT_ATTEMPTS) {
            setTimeout(() => setupChannel(reconnectAttempts.current), RETRY_DELAY_BASE * reconnectAttempts.current);
          } else {
            setConnectionStatus("polling");
            startFallbackPolling();
            if (!notifiedRef.current) {
              toast({
                title: "Live updates not available",
                description: "Falling back to polling. New tasks or changes may be delayed.",
                duration: 4000,
              });
              notifiedRef.current = true;
            }
          }
        }
      });
    };

    setupChannel();

    // Delayed fallback if live hasn't started
    const fallbackTimeout = setTimeout(() => {
      if (!realTimeConnected && reconnectAttempts.current === 0) {
        setConnectionStatus("polling");
        startFallbackPolling();
        if (!notifiedRef.current) {
          toast({
            title: "You're on delayed updates",
            description: "Instant sync is not available. The board still works, but changes may take up to 10s.",
            duration: 4000,
          });
          notifiedRef.current = true;
        }
      }
    }, 2500);

    // CLEANUP: always remove channel, stop polling, clear timeout
    return () => {
      if (channelRef.current) {
        try {
          supabase.removeChannel(channelRef.current);
        } catch (e) {
          // Defensive logging
          console.warn("Cleanup on unmount", e);
        }
        channelRef.current = null;
      }
      stopFallbackPolling();
      clearTimeout(fallbackTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { tasks, setTasks: secureSetTasks, loading, connectionStatus };
}
