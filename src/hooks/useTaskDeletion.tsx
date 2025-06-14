
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task';

export const useTaskDeletion = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteTask, restoreDeletedTask } = useTaskContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteClick = useCallback((task: Task, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setTaskToDelete(task);
    setShowDeleteDialog(true);
  }, []);

  const handleDeleteTask = useCallback(async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete.id);
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been deleted.`,
        action: (
          <div className="flex items-center gap-1 mt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => restoreDeletedTask(taskToDelete.id)}
              className="text-muted-foreground px-2 py-0 h-7"
            >
              Undo
            </Button>
            <span className="text-xs text-border mx-1 select-none">•</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings?tab=trash')}
              className="text-muted-foreground px-2 py-0 h-7"
            >
              Go to Trash
            </Button>
          </div>
        ),
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask, restoreDeletedTask, toast, navigate]);

  const handleCloseDeleteDialog = useCallback(() => {
    setShowDeleteDialog(false);
    setTaskToDelete(null);
  }, []);

  return {
    showDeleteDialog,
    taskToDelete,
    isDeleting,
    handleDeleteClick,
    handleDeleteTask,
    handleCloseDeleteDialog
  };
};
