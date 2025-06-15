
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
          console.log('[useRealtimeTasks] Realtime update:', payload.eventType, payload.new || payload.old);
          const row = payload.new ?? payload.old;
          if (!row) return;
          const task = dbRowToTask(row);

          setTasks(prev => {
            const visible = canUserViewTask(task, currentUser);
            // Hide if task is deleted, archived, or now invisible
            if (task.deletedAt || task.archived || !visible.allowed) {
              const filtered = prev.filter(t => t.id !== task.id);
              console.log('[useRealtimeTasks] Hiding task:', task.id, 'Reason:', task.deletedAt ? 'deleted' : task.archived ? 'archived' : 'not visible');
              return filtered;
            }
            if (payload.eventType === "INSERT") {
              if (!prev.some(t => t.id === task.id)) {
                console.log('[useRealtimeTasks] Adding new task:', task.id, task.title);
                return [task, ...prev];
              }
              return prev;
            }
            if (payload.eventType === "UPDATE") {
              // Update or (if now visible) add the task
              const present = prev.some(t => t.id === task.id);
              if (present) {
                console.log('[useRealtimeTasks] Updating task:', task.id, task.title);
                return prev.map(t => (t.id === task.id ? task : t));
              }
              console.log('[useRealtimeTasks] Adding updated task:', task.id, task.title);
              return [task, ...prev];
            }
            if (payload.eventType === "DELETE") {
              console.log('[useRealtimeTasks] Deleting task:', task.id);
              return prev.filter(t => t.id !== task.id);
            }
            return prev;
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
