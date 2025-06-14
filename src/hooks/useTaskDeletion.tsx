
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task';
import { Undo, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const useTaskDeletion = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteTask, restoreDeletedTask } = useTaskContext();
  const { toast, dismiss } = useToast();
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

      // Show designed notification
      const toastId = toast({
        title: (
          <div className="flex items-center gap-2 w-full">
            <span className="font-semibold">Task</span>
            <span>moved to</span>
            <button
              type="button"
              className="underline decoration-dotted underline-offset-4 text-blue-700 hover:text-blue-600 transition-colors"
              tabIndex={0}
              onClick={() => {
                navigate('/settings?tab=trash');
                dismiss();
              }}
              style={{ fontWeight: 500 }}
            >
              trash
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="pl-1 pr-2 py-0.5 h-7 flex items-center gap-1 group"
              onClick={(e) => {
                e.stopPropagation();
                restoreDeletedTask(taskToDelete.id);
                dismiss();
              }}
            >
              <Undo className="w-4 h-4 mr-1 text-muted-foreground group-hover:text-foreground" strokeWidth={2.2}/>
              Undo
            </Button>
            {/* Separator line */}
            <span className="mx-2 h-5 border-l border-border inline-block self-center" />
            <button
              type="button"
              onClick={dismiss}
              className="text-muted-foreground hover:text-foreground focus:outline-none p-1 ml-1 rounded"
              aria-label="Close"
              style={{ lineHeight: 0 }}
              tabIndex={0}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        duration: 5000,
        className: "p-3 pr-2 w-auto min-w-[340px]",
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
  }, [taskToDelete, deleteTask, restoreDeletedTask, toast, navigate, dismiss]);

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
