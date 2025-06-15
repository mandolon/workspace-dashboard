
import { useCallback } from 'react';
import { Task, TaskUser } from '@/types/task';
import { updateTaskSupabase } from '@/data/taskSupabase';

export const useTaskAssignmentOperations = (tasks: Task[]) => {
  // Assignment handlers - rely on real-time to update UI
  const assignPerson = useCallback(async (taskId: string, person: TaskUser) => {
    console.log('[useTaskAssignmentOperations] Assigning person to task:', taskId, person.name);
    try {
      await updateTaskSupabase(taskId, { assignee: person });
      console.log('[useTaskAssignmentOperations] Person assigned successfully');
    } catch (error) {
      console.error('[useTaskAssignmentOperations] Failed to assign person:', error);
    }
  }, []);

  const removeAssignee = useCallback(async (taskId: string) => {
    console.log('[useTaskAssignmentOperations] Removing assignee from task:', taskId);
    try {
      await updateTaskSupabase(taskId, { assignee: null });
      console.log('[useTaskAssignmentOperations] Assignee removed successfully');
    } catch (error) {
      console.error('[useTaskAssignmentOperations] Failed to remove assignee:', error);
    }
  }, []);

  const addCollaborator = useCallback(async (taskId: string, person: TaskUser) => {
    console.log('[useTaskAssignmentOperations] Adding collaborator to task:', taskId, person.name);
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) {
      console.error('[useTaskAssignmentOperations] Task not found for adding collaborator:', taskId);
      return;
    }
    
    const collabs = (task.collaborators ?? []).slice();
    if (!collabs.find(c => c.id === person.id)) {
      collabs.push(person);
      try {
        await updateTaskSupabase(taskId, { collaborators: collabs });
        console.log('[useTaskAssignmentOperations] Collaborator added successfully');
      } catch (error) {
        console.error('[useTaskAssignmentOperations] Failed to add collaborator:', error);
      }
    }
  }, [tasks]);

  const removeCollaborator = useCallback(async (taskId: string, collaboratorIndex: number) => {
    console.log('[useTaskAssignmentOperations] Removing collaborator from task:', taskId, 'index:', collaboratorIndex);
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) {
      console.error('[useTaskAssignmentOperations] Task not found for removing collaborator:', taskId);
      return;
    }
    
    const collabs = (task.collaborators ?? []).slice();
    collabs.splice(collaboratorIndex, 1);
    try {
      await updateTaskSupabase(taskId, { collaborators: collabs });
      console.log('[useTaskAssignmentOperations] Collaborator removed successfully');
    } catch (error) {
      console.error('[useTaskAssignmentOperations] Failed to remove collaborator:', error);
    }
  }, [tasks]);

  return {
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
  };
};
