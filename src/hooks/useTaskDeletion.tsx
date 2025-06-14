
import { useState, useCallback } from 'react';
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => restoreDeletedTask(taskToDelete.id)}
          >
            Undo
          </Button>
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
  }, [taskToDelete, deleteTask, restoreDeletedTask, toast]);

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
