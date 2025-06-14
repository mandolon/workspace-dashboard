
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";
import { fetchAllTasks } from "@/data/taskSupabase";

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
    const channel = supabase
      .channel("public-tasks-change")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        payload => {
          fetchAllTasks().then(setTasks);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { tasks, setTasks };
}
