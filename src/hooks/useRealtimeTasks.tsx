
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";
import { fetchAllTasks, dbRowToTask } from "@/data/taskSupabase";
import { useUser } from "@/contexts/UserContext";
import { filterTasksForUser, canUserViewTask } from "@/utils/taskVisibility";
import { toast } from "@/hooks/use-toast";

// Fallback polling interval in ms if real-time connection fails.
const FALLBACK_POLL_INTERVAL = 10000;

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);
  const { currentUser } = useUser();
  const [fallbackTimer, setFallbackTimer] = useState<NodeJS.Timeout | null>(null);

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
    // Enhanced: handle real-time payloads for instant UI updates
    const channel = supabase
      .channel("public-tasks-change")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        payload => {
          realTimeConnected = true;
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
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          realTimeConnected = true;
          stopFallbackPolling();
          toast({
            title: "Real-time Connected",
            description: "Live task updates enabled.",
            duration: 2500,
          });
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          realTimeConnected = false;
          toast({
            title: "Live updates unavailable",
            description: "Falling back to polling. Task list may be delayed.",
            variant: "destructive",
            duration: 5000,
          });
          startFallbackPolling();
        }
      });

    // Catch broken websocket right away on mount
    setTimeout(() => {
      if (!realTimeConnected) {
        toast({
          title: "Live updates not connected",
          description: "WebSocket could not connect. Tasks may not update instantly.",
          variant: "destructive",
          duration: 5000,
        });
        startFallbackPolling();
      }
    }, 2500);

    return () => {
      supabase.removeChannel(channel);
      stopFallbackPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { tasks, setTasks: secureSetTasks, loading };
}
