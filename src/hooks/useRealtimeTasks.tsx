
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
  const channelRef = useRef<any>(null);
  const { currentUser } = useUser();

  // Only expose tasks that are not soft-deleted or archived
  const secureSetTasks = (allTasks: Task[]) => {
    const filtered = filterTasksForUser(
      allTasks.filter(t => !t.deletedAt && (!t.archived || t.status === 'completed')),
      currentUser
    );
    console.log('[useRealtimeTasks] Setting tasks:', filtered.length, 'tasks');
    setTasks(filtered);
  };

  // Fetch on mount / currentUser change
  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    console.log('[useRealtimeTasks] Fetching initial tasks...');
    fetchAllTasks()
      .then(allTasks => {
        console.log('[useRealtimeTasks] Fetched', allTasks.length, 'tasks from database');
        secureSetTasks(allTasks);
      })
      .catch(error => {
        console.error('[useRealtimeTasks] Error fetching tasks:', error);
      })
      .finally(() => {
        loadingRef.current = false;
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Real-time subscription - separate effect to avoid duplicate subscriptions
  useEffect(() => {
    // Clean up existing channel if it exists
    if (channelRef.current) {
      console.log('[useRealtimeTasks] Cleaning up existing channel');
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    console.log('[useRealtimeTasks] Setting up real-time subscription...');
    
    // Create a unique channel name to avoid conflicts
    const channelName = `public-tasks-change-${Date.now()}-${Math.random()}`;
    const channel = supabase.channel(channelName);
    
    channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload: any) => {
          // Type assertion for the payload data
          const newRow = payload.new as any;
          const oldRow = payload.old as any;
          
          console.log('[useRealtimeTasks] Real-time event received:', {
            event: payload.eventType,
            taskId: newRow?.task_id || oldRow?.task_id,
            title: newRow?.title || oldRow?.title
          });
          
          const row = newRow ?? oldRow;
          if (!row) {
            console.warn('[useRealtimeTasks] No row data in payload');
            return;
          }
          
          const task = dbRowToTask(row);
          console.log('[useRealtimeTasks] Processed task:', task.taskId, task.title);

          setTasks(prev => {
            const visible = canUserViewTask(task, currentUser);
            
            // Hide if task is deleted, or archived but NOT completed, or now invisible
            if (task.deletedAt || (task.archived && task.status !== 'completed') || !visible.allowed) {
              const filtered = prev.filter(t => t.id !== task.id);
              console.log('[useRealtimeTasks] Hiding task:', task.taskId, 'Reason:', 
                task.deletedAt ? 'deleted' : (task.archived && task.status !== 'completed') ? 'archived (non-completed)' : 'not visible');
              return filtered;
            }
            
            if (payload.eventType === "INSERT") {
              if (!prev.some(t => t.id === task.id)) {
                console.log('[useRealtimeTasks] Adding new task:', task.taskId, task.title);
                return [task, ...prev];
              }
              console.log('[useRealtimeTasks] Task already exists, skipping insert');
              return prev;
            }
            
            if (payload.eventType === "UPDATE") {
              const taskIndex = prev.findIndex(t => t.id === task.id);
              if (taskIndex >= 0) {
                console.log('[useRealtimeTasks] Updating existing task:', task.taskId, task.title);
                const updated = [...prev];
                updated[taskIndex] = task;
                return updated;
              } else {
                console.log('[useRealtimeTasks] Adding updated task (was not visible before):', task.taskId);
                return [task, ...prev];
              }
            }
            
            if (payload.eventType === "DELETE") {
              console.log('[useRealtimeTasks] Deleting task:', task.taskId);
              return prev.filter(t => t.id !== task.id);
            }
            
            console.log('[useRealtimeTasks] Unknown event type:', payload.eventType);
            return prev;
          });
        }
      )
      .subscribe(status => {
        console.log('[useRealtimeTasks] Subscription status:', status);
      });

    // Store the channel reference
    channelRef.current = channel;

    return () => {
      console.log('[useRealtimeTasks] Cleaning up real-time subscription');
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { tasks, setTasks: secureSetTasks, loading };
}
