
import { useCallback } from 'react';
import { Task } from '@/types/task';
import { getTasksByStatus } from '@/data/taskData';

export const useTaskAssignments = (
  customTasks: Task[],
  updateTaskById: (taskId: number, updates: Partial<Task>) => void
) => {
  const assignPerson = useCallback((taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    updateTaskById(taskId, { assignee: person });
    console.log(`Assigned ${person.fullName || person.name} to task ${taskId}`);
  }, [updateTaskById]);

  const removeAssignee = useCallback((taskId: number) => {
    updateTaskById(taskId, { assignee: null });
    console.log(`Removed assignee from task ${taskId}`);
  }, [updateTaskById]);

  const addCollaborator = useCallback((taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    const centralizedTask = getTasksByStatus('redline').concat(getTasksByStatus('progress')).concat(getTasksByStatus('completed')).find(t => t.id === taskId);
    const customTask = customTasks.find(t => t.id === taskId);
    const currentTask = centralizedTask || customTask;
    
    if (currentTask) {
      const updatedCollaborators = [...(currentTask.collaborators || []), person];
      updateTaskById(taskId, { collaborators: updatedCollaborators });
    }
    console.log(`Added ${person.fullName || person.name} as collaborator to task ${taskId}`);
  }, [customTasks, updateTaskById]);

  const removeCollaborator = useCallback((taskId: number, collaboratorIndex: number) => {
    const centralizedTask = getTasksByStatus('redline').concat(getTasksByStatus('progress')).concat(getTasksByStatus('completed')).find(t => t.id === taskId);
    const customTask = customTasks.find(t => t.id === taskId);
    const currentTask = centralizedTask || customTask;
    
    if (currentTask) {
      const updatedCollaborators = currentTask.collaborators?.filter((_, index) => index !== collaboratorIndex) || [];
      updateTaskById(taskId, { collaborators: updatedCollaborators });
    }
    console.log(`Removed collaborator ${collaboratorIndex} from task ${taskId}`);
  }, [customTasks, updateTaskById]);

  return {
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator
  };
};
