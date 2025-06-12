
import { useState } from 'react';

export const useTaskActions = () => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  return {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    selectedTask,
    showQuickAdd,
    setShowQuickAdd,
    handleTaskClick,
    handleCloseTaskDetail
  };
};
