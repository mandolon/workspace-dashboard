
import { useState } from 'react';
import { updateTask } from '@/data/taskData';
import { Task } from '@/types/task';

export const useTaskEdit = () => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const handleTaskNameClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  };

  const handleEditClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  };

  const handleSaveEdit = (taskId: number, onTaskUpdate: (taskId: number, updates: Partial<Task>) => void) => {
    console.log(`Updating task ${taskId} with new title: ${editingValue}`);
    
    // Validate the title
    if (editingValue.trim() === '') {
      console.warn('Cannot save empty task title');
      setEditingTaskId(null);
      setEditingValue('');
      return;
    }

    // Update the centralized task data
    const updatedTask = updateTask(taskId, { title: editingValue.trim() });
    
    if (updatedTask) {
      // Update local state through callback
      onTaskUpdate(taskId, { title: editingValue.trim() });
      console.log(`Successfully updated task ${taskId} title to: ${editingValue.trim()}`);
    } else {
      console.error(`Failed to update task ${taskId}`);
    }
    
    setEditingTaskId(null);
    setEditingValue('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number, onTaskUpdate: (taskId: number, updates: Partial<Task>) => void) => {
    if (e.key === 'Enter') {
      handleSaveEdit(taskId, onTaskUpdate);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return {
    editingTaskId,
    editingValue,
    setEditingValue,
    handleTaskNameClick,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleKeyDown
  };
};
