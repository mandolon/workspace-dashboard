
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import DeleteTaskDialog from '../DeleteTaskDialog';
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

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    // Use a hash of the name to consistently assign the same color
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month} ${day}, ${year}`;
    } catch {
      return dateString; // fallback to original string if parsing fails
    }
  };

  // Get tasks for the current project, filtering out deleted ones
  const projectTasks = getTasksByProjectId(projectId).filter(task => !task.deletedAt);

  const renderStatusIcon = (status: string) => {
    const baseClasses = "w-4 h-4 rounded-full border-2 flex items-center justify-center";
    
    switch (status) {
      case 'redline':
        return (
          <div className={`${baseClasses} border-red-500 bg-red-500`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        );
      case 'progress':
        return (
          <div className={`${baseClasses} border-blue-500 bg-blue-500`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        );
      case 'completed':
        return (
          <div className={`${baseClasses} border-green-500 bg-green-500`}>
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20" strokeWidth="2">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} border-gray-300`}></div>
        );
    }
  };

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
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Date Created</div>
          <div className="col-span-3">Assigned to</div>
        </div>
        
        {/* Task Rows */}
        {projectTasks.map((task) => (
          <ContextMenu key={task.id}>
            <ContextMenuTrigger asChild>
              <div 
                className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group"
                onClick={() => handleTaskClick(task)}
              >
                <div className="col-span-6 flex items-center gap-2">
                  {renderStatusIcon(task.status)}
                  <span className="text-blue-600 hover:underline truncate">
                    {task.taskId} - {task.title}
                  </span>
                </div>
                <div className="col-span-3 text-muted-foreground">{formatDate(task.dateCreated)}</div>
                <div className="col-span-3 flex items-center justify-between">
                  <div className="flex items-center -space-x-1">
                    {task.assignee && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRandomColor(task.assignee.name)}`}>
                        {task.assignee.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit action
                      }}
                    >
                      <Edit className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={(e) => handleDeleteClick(task, e)}
                    >
                      <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" strokeWidth="2" />
                    </button>
                  </div>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={(e) => { e.stopPropagation(); /* Handle edit */ }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit task
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem 
                onClick={() => handleDeleteClick(task, {} as React.MouseEvent)} 
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
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
