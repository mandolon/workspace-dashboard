
import { useState, useCallback } from 'react';
import { Task } from '@/types/task';

export const useTaskEditing = (updateTaskById: (taskId: number, updates: Partial<Task>) => void) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const startEditingTask = useCallback((task: Task) => {
    setEditingTaskId(task.id);
    setEditingValue(task.title);
    console.log('[TaskEditing] startEditingTask:', task.id, task.title);
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

  return {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit
  };
};
