
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";
import { fetchAllTasks, dbRowToTask } from "@/data/taskSupabase";
import { useUser } from "@/contexts/UserContext";
import { filterTasksForUser, canUserViewTask } from "@/utils/taskVisibility";

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);
  const { currentUser } = useUser();

  // Only expose tasks that are not soft-deleted or archived
  const secureSetTasks = (allTasks: Task[]) => {
    const filtered = filterTasksForUser(
      allTasks.filter(t => !t.deletedAt && !t.archived),
      currentUser
    );
    setTasks(filtered);
  };

  // Fetch on mount / currentUser change
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

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("public-tasks-change")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        payload => {
          const row = payload.new ?? payload.old;
          if (!row) return;
          const task = dbRowToTask(row);

          setTasks(prev => {
            // Filter out archived or soft-deleted tasks before updating local state
            const filteredPrev = filterTasksForUser(
              prev.filter(t => !t.archived && !t.deletedAt),
              currentUser
            );

            const visible = canUserViewTask(task, currentUser);
            // Hide if task is deleted or now invisible
            if (task.deletedAt || task.archived || !visible.allowed) {
              return filteredPrev.filter(t => t.id !== task.id);
            }
            if (payload.eventType === "INSERT") {
              if (!filteredPrev.some(t => t.id === task.id)) {
                return [task, ...filteredPrev];
              }
              return filteredPrev;
            }
            if (payload.eventType === "UPDATE") {
              // Update or (if now visible) add the task
              const present = filteredPrev.some(t => t.id === task.id);
              if (present) {
                return filteredPrev.map(t => (t.id === task.id ? task : t));
              }
              return [task, ...filteredPrev];
            }
            if (payload.eventType === "DELETE") {
              return filteredPrev.filter(t => t.id !== task.id);
            }
            return filteredPrev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { tasks, setTasks: secureSetTasks, loading };
}
