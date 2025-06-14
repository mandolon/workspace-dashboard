
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";
import { fetchAllTasks, dbRowToTask } from "@/data/taskSupabase";
import { useUser } from "@/contexts/UserContext";
import { filterTasksForUser } from "@/utils/taskVisibility";

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const loadingRef = useRef(false);
  const { currentUser } = useUser();

  // Filters and sets tasks so users only see what they should
  const secureSetTasks = (allTasks: Task[]) => {
    setTasks(filterTasksForUser(allTasks, currentUser));
  };

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    fetchAllTasks()
      .then(secureSetTasks)
      .finally(() => {
        loadingRef.current = false;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
            // Re-run filter on prev for safety
            const filteredPrev = filterTasksForUser(prev, currentUser);

            const task = dbRowToTask(row);

            // Only update UI if new/changed/removed task matches visibility for this user
            const taskVisible = filterTasksForUser([task], currentUser).length > 0;

            if (payload.eventType === "INSERT") {
              // Add if not present and is visible
              if (taskVisible && !filteredPrev.some(t => t.id === task.id)) {
                return [task, ...filteredPrev];
              }
              return filteredPrev;
            }
            if (payload.eventType === "UPDATE") {
              if (taskVisible) {
                // If should be visible after update (add or update)
                const present = filteredPrev.some(t => t.id === task.id);
                if (present) {
                  return filteredPrev.map(t => (t.id === task.id ? task : t));
                }
                // Was not visible before, but now is visible
                return [task, ...filteredPrev];
              } else {
                // Was visible before, now should NOT be visible -> remove
                return filteredPrev.filter(t => t.id !== task.id);
              }
            }
            if (payload.eventType === "DELETE") {
              // Remove deleted task from filtered list
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

  return { tasks, setTasks: secureSetTasks };
}
