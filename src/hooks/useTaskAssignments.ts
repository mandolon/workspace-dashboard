
import React, { useCallback } from 'react';
import { Task, TaskUser } from '@/types/task';

/**
 * Assignment hook for in-memory (non-supabase) tasks.
 * - Pass customTasks array
 * - updateTaskById callback: (taskId: number, updates: Partial<Task>) => void
 * - getTasksByStatus callback: (status: string) => Task[]
 */
export const useTaskAssignments = (
  customTasks: Task[],
  updateTaskById: (taskId: number, updates: Partial<Task>) => void,
  getTasksByStatus: (status: string) => Task[]
) => {
  // Accept taskId as string everywhere and handle both cases
  const assignPerson = useCallback((taskId: string, person: TaskUser) => {
    const taskNumericId = Number(taskId);
    updateTaskById(taskNumericId, { assignee: person });
    console.log(`Assigned ${person.fullName || person.name} to task ${taskId}`);
  }, [updateTaskById]);

  const removeAssignee = useCallback((taskId: string) => {
    const taskNumericId = Number(taskId);
    updateTaskById(taskNumericId, { assignee: null });
    console.log(`Removed assignee from task ${taskId}`);
  }, [updateTaskById]);

  const addCollaborator = useCallback((taskId: string, person: TaskUser) => {
    const taskNumericId = Number(taskId);
    const centralizedTask = [
      ...getTasksByStatus('redline'),
      ...getTasksByStatus('progress'),
      ...getTasksByStatus('completed'),
    ].find(t => t.id === taskNumericId);
    const customTask = customTasks.find(t => t.id === taskNumericId);
    const currentTask = centralizedTask || customTask;

    if (currentTask) {
      const updatedCollaborators = [...(currentTask.collaborators || []), person];
      updateTaskById(taskNumericId, { collaborators: updatedCollaborators });
    }
    console.log(`Added ${person.fullName || person.name} as collaborator to task ${taskId}`);
  }, [customTasks, updateTaskById, getTasksByStatus]);

  const removeCollaborator = useCallback((taskId: string, collaboratorIndex: number) => {
    const taskNumericId = Number(taskId);
    const centralizedTask = [
      ...getTasksByStatus('redline'),
      ...getTasksByStatus('progress'),
      ...getTasksByStatus('completed'),
    ].find(t => t.id === taskNumericId);
    const customTask = customTasks.find(t => t.id === taskNumericId);
    const currentTask = centralizedTask || customTask;

    if (currentTask) {
      const updatedCollaborators = currentTask.collaborators?.filter((_, index) => index !== collaboratorIndex) || [];
      updateTaskById(taskNumericId, { collaborators: updatedCollaborators });
    }
    console.log(`Removed collaborator ${collaboratorIndex} from task ${taskId}`);
  }, [customTasks, updateTaskById, getTasksByStatus]);

  return {
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator
  };
};
