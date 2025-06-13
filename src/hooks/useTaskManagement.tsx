
import { useState } from 'react';
import { Task } from '@/types/task';
import { useTaskEdit } from './useTaskEdit';
import { useTaskAssignment } from './useTaskAssignment';
import { useTaskStatus } from './useTaskStatus';

export const useTaskManagement = (initialTasks: Task[], onTaskArchive?: (taskId: number) => void) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Use the smaller hooks
  const taskEdit = useTaskEdit();
  const taskAssignment = useTaskAssignment();
  const taskStatus = useTaskStatus(onTaskArchive);

  // Centralized task update function
  const updateTaskInState = (taskId: number, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Handle special cases for collaborators
          if (updates.collaborators !== undefined && updates.collaborators.length === 0) {
            // For removing collaborators, we need the current task state
            const currentTask = prevTasks.find(t => t.id === taskId);
            if (currentTask) {
              return { ...task, ...updates };
            }
          }
          return { ...task, ...updates };
        }
        return task;
      })
    );
  };

  // Enhanced collaborator handlers that work with current state
  const handleRemoveCollaborator = (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentTask = tasks.find(t => t.id === taskId);
    if (currentTask) {
      const updatedCollaborators = currentTask.collaborators?.filter((_, index) => index !== collaboratorIndex) || [];
      updateTaskInState(taskId, { collaborators: updatedCollaborators });
    }
    console.log(`Removed collaborator ${collaboratorIndex} from task ${taskId}`);
  };

  const handleAddCollaborator = (taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    const currentTask = tasks.find(t => t.id === taskId);
    if (currentTask) {
      const updatedCollaborators = [...(currentTask.collaborators || []), person];
      updateTaskInState(taskId, { collaborators: updatedCollaborators });
    }
    console.log(`Added ${person.fullName || person.name} as collaborator to task ${taskId}`);
  };

  return {
    tasks,
    editingTaskId: taskEdit.editingTaskId,
    editingValue: taskEdit.editingValue,
    setEditingValue: taskEdit.setEditingValue,
    handleTaskNameClick: taskEdit.handleTaskNameClick,
    handleEditClick: taskEdit.handleEditClick,
    handleSaveEdit: (taskId: number) => taskEdit.handleSaveEdit(taskId, updateTaskInState),
    handleCancelEdit: taskEdit.handleCancelEdit,
    handleKeyDown: (e: React.KeyboardEvent, taskId: number) => taskEdit.handleKeyDown(e, taskId, updateTaskInState),
    handleRemoveAssignee: (taskId: number, e: React.MouseEvent) => taskAssignment.handleRemoveAssignee(taskId, e, updateTaskInState),
    handleRemoveCollaborator,
    handleAssignPerson: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => taskAssignment.handleAssignPerson(taskId, person, updateTaskInState),
    handleAddCollaborator,
    handleTaskStatusClick: (taskId: number) => taskStatus.handleTaskStatusClick(taskId, tasks, updateTaskInState)
  };
};
