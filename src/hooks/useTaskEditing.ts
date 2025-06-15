
import { useState, useCallback } from 'react';
import { Task } from '@/types/task';

export const useTaskEditing = (updateTaskById: (taskId: number, updates: Partial<Task>) => void) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const startEditingTask = useCallback((task: Task) => {
    console.log('[TaskEditing] startEditingTask called with:', task.id, task.title);
    setEditingTaskId(task.id);
    setEditingValue(task.title);
    console.log('[TaskEditing] State should be updated to:', task.id, task.title);
  }, []);

  const saveTaskEdit = useCallback((taskId: number) => {
    if (editingValue.trim() === '') {
      console.warn('[TaskEditing] Cannot save empty task title');
      setEditingTaskId(null);
      setEditingValue('');
      return;
    }
    console.log('[TaskEditing] saveTaskEdit:', taskId, editingValue);
    updateTaskById(taskId, { title: editingValue.trim() });
    setEditingTaskId(null);
    setEditingValue('');
  }, [editingValue, updateTaskById]);

  const cancelTaskEdit = useCallback(() => {
    console.log('[TaskEditing] cancelTaskEdit');
    setEditingTaskId(null);
    setEditingValue('');
  }, []);

  // Add debug logging to track state
  console.log('[useTaskEditing] Current state:', { editingTaskId, editingValue });

  return {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit
  };
};
