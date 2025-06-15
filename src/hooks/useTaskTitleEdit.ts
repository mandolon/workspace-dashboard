
import { useState } from 'react';
import { updateTask } from '@/data/taskData';

export const useTaskTitleEdit = (taskId: number, initialTitle: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(initialTitle);

  console.log('[useTaskTitleEdit] Hook initialized:', { taskId, initialTitle, isEditing, editingValue });

  const startEditing = () => {
    console.log('[useTaskTitleEdit] startEditing called');
    setIsEditing(true);
    setEditingValue(initialTitle);
  };

  const saveEdit = () => {
    console.log('[useTaskTitleEdit] saveEdit called with value:', editingValue);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    console.log('[useTaskTitleEdit] cancelEdit called');
    setEditingValue(initialTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  const handleBlur = () => {
    saveEdit();
  };

  return {
    isEditing,
    editingValue,
    setEditingValue,
    startEditing,
    saveEdit,
    cancelEdit,
    handleKeyDown,
    handleBlur
  };
};
