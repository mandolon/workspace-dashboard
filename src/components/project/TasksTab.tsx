
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import DeleteTaskDialog from '../DeleteTaskDialog';
import TasksTabHeader from './TasksTabHeader';
import TasksTabRow from './TasksTabRow';
import { getTasksByProjectId, softDeleteTask, restoreTask } from '@/data/taskData';

interface TasksTabProps {
  projectName: string;
  projectId: string;
}

const TasksTab = ({ projectName, projectId }: TasksTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  // Get tasks for the current project, filtering out deleted ones
  const projectTasks = getTasksByProjectId(projectId).filter(task => !task.deletedAt);

  const handleTaskClick = (task: any) => {
    // Navigate to task detail using TaskID
    navigate(`/task/${task.taskId}`, {
      state: {
        returnTo: location.pathname,
        returnToName: `${projectName} - Tasks`,
        returnToTab: 'tasks'
      }
    });
  };

  const handleDeleteClick = (task: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setTaskToDelete(task);
    setShowDeleteDialog(true);
  };

  const handleContextMenuDelete = (task: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Context menu delete clicked for task:', task.id);
    setTaskToDelete(task);
    setShowDeleteDialog(true);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    setIsDeleting(true);
    try {
      const deletedTask = softDeleteTask(taskToDelete.id, "AL"); // Current user
      
      if (deletedTask) {
        toast({
          title: "Task deleted",
          description: `"${taskToDelete.title}" has been deleted.`,
          action: (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleUndoDelete(taskToDelete.id)}
            >
              Undo
            </Button>
          ),
          duration: 5000,
        });

        setRefreshTrigger(prev => prev + 1);
      }
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
  };

  const handleUndoDelete = (taskId: number) => {
    const restoredTask = restoreTask(taskId);
    if (restoredTask) {
      toast({
        title: "Task restored",
        description: "Task has been restored successfully.",
        duration: 3000,
      });
      setRefreshTrigger(prev => prev + 1);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 mt-0">
      <div className="space-y-0.5">
        <TasksTabHeader />
        
        {/* Task Rows */}
        {projectTasks.map((task) => (
          <TasksTabRow
            key={task.id}
            task={task}
            onTaskClick={handleTaskClick}
            onDeleteClick={handleDeleteClick}
            onContextMenuDelete={handleContextMenuDelete}
          />
        ))}
      </div>

      <DeleteTaskDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
        taskTitle={taskToDelete?.title || ""}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TasksTab;
