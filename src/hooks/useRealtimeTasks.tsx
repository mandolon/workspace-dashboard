
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";
import { fetchAllTasks, dbRowToTask } from "@/data/taskSupabase";

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    fetchAllTasks().then(setTasks).finally(() => {
      loadingRef.current = false;
    });
  }, []);

  useEffect(() => {
    // Enhanced: handle real-time payloads for instant UI updates
    const channel = supabase
      .channel("public-tasks-change")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        payload => {
          // Get the real-time row and event type
          const row = payload.new ?? payload.old;
          if (!row) return;
          setTasks(prev => {
            const task = dbRowToTask(row);
            // Handle event types
            if (payload.eventType === "INSERT") {
              // Add new task if not present
              if (!prev.some(t => t.id === task.id)) {
                return [task, ...prev];
              }
              return prev;
            }
            if (payload.eventType === "UPDATE") {
              // Replace the updated task
              return prev.map(t => (t.id === task.id ? task : t));
            }
            if (payload.eventType === "DELETE") {
              // Remove deleted task
              return prev.filter(t => t.id !== task.id);
            }
            // Unknown event: fallback to full refetch
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { tasks, setTasks };
}
