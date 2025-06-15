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

  // Filters and sets tasks so users only see what they should
  const secureSetTasks = (allTasks: Task[]) => {
    setTasks(filterTasksForUser(allTasks, currentUser));
  };

  // Fallback poller for when real-time fails
  const startFallbackPolling = () => {
    // Prevent duplicates
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
    let channel: any;
    setConnectionStatus("connecting");
    reconnectAttempts.current = 0;
    notifiedRef.current = false;

    const setupChannel = (retryAttempt: number = 0) => {
      channel = supabase
        .channel("public-tasks-change")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "tasks" },
          payload => {
            realTimeConnected = true;
            setConnectionStatus("live");
            // Get the real-time row and event type
            const row = payload.new ?? payload.old;
            if (!row) return;

            console.log("Supabase realtime event received:", {
              eventType: payload.eventType,
              row,
              payload,
              currentUser,
            });

            setTasks(prev => {
              // Re-run filter on prev for safety
              const filteredPrev = filterTasksForUser(prev, currentUser);

              const task = dbRowToTask(row);

              // Only update UI if new/changed/removed task matches visibility for this user
              const visible = canUserViewTask(task, currentUser);
              if (!visible.allowed) {
                // If losing access and present, remove
                if (filteredPrev.some(t => t.id === task.id)) {
                  return filteredPrev.filter(t => t.id !== task.id);
                }
                // Not present, do nothing
                return filteredPrev;
              }

              if (payload.eventType === "INSERT") {
                // Only add if not already present in state
                if (!filteredPrev.some(t => t.id === task.id)) {
                  // Debug
                  console.log("[Realtime] INSERT: Adding task to local state", task);
                  return [task, ...filteredPrev];
                }
                return filteredPrev;
              }
              if (payload.eventType === "UPDATE") {
                // Debug
                console.log("[Realtime] UPDATE: Updating existing task", task);
                const present = filteredPrev.some(t => t.id === task.id);
                if (present) {
                  return filteredPrev.map(t => (t.id === task.id ? task : t));
                }
                // Was not visible before, now is visible
                return [task, ...filteredPrev];
              }
              if (payload.eventType === "DELETE") {
                // Debug
                console.log("[Realtime] DELETE: Removing task from local state", task);
                // Remove deleted task from filtered list
                return filteredPrev.filter(t => t.id !== task.id);
              }
              return filteredPrev;
            });
          }
        )
        .subscribe((status: string) => {
          if (status === "SUBSCRIBED") {
            realTimeConnected = true;
            setConnectionStatus("live");
            stopFallbackPolling();
            // Only show one 'connected' toast per mount
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
            // Retry up to threshold, then fallback
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
                  // Drop destructive variant: less intrusive
                });
                notifiedRef.current = true;
              }
            }
          }
        });
    };

    setupChannel();

    // If after 2.5s live hasn't connected, set status to polling & notify ONCE
    setTimeout(() => {
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

    return () => {
      supabase.removeChannel(channel);
      stopFallbackPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { tasks, setTasks: secureSetTasks, loading, connectionStatus };
}
