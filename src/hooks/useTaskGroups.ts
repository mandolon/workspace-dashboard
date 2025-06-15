
import { useCallback } from 'react';
import { Task, TaskGroup } from '@/types/task';

export const useTaskGroups = (tasks: Task[]) => {
  const getTaskGroups = useCallback((): TaskGroup[] => {
    console.log('[useTaskGroups] Getting task groups from', tasks.length, 'tasks');
    // Filter tasks based on status, excluding soft-deleted tasks
    const centralizedRedline = tasks.filter(task => 
      task.status === 'redline' && !task.deletedAt && !task.archived
    );
    const centralizedProgress = tasks.filter(task => 
      task.status === 'progress' && !task.deletedAt && !task.archived
    );
    // Show completed tasks regardless of archived status since they're intentionally archived
    const centralizedCompleted = tasks.filter(task => 
      task.status === 'completed' && !task.deletedAt
    );

    const taskGroups: TaskGroup[] = [
      {
        title: "TASK/ REDLINE",
        count: centralizedRedline.length,
        color: "bg-red-500",
        status: "redline",
        tasks: centralizedRedline
      },
      {
        title: "PROGRESS/ UPDATE",
        count: centralizedProgress.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: centralizedProgress
      },
      {
        title: "COMPLETED",
        count: centralizedCompleted.length,
        color: "bg-green-500",
        status: "completed",
        tasks: centralizedCompleted
      }
    ];
    
    console.log('[useTaskGroups] Task groups:', taskGroups.map(g => `${g.status}: ${g.count}`));
    return taskGroups;
  }, [tasks]);

  return { getTaskGroups };
};
