import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { getTasksByStatus, addTask, updateTask, softDeleteTask, restoreTask } from '@/data/taskData';
import { Undo, X } from 'lucide-react';

export const useTaskOperations = () => {
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();
  
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const createTask = useCallback((taskData: any) => {
    console.log('Creating task via context:', taskData);
    if (taskData.useCustomTasks) {
      // For tasks created via dialog, add to custom tasks only
      setCustomTasks(prev => [taskData, ...prev]);
    } else {
      // For quick add, use the centralized addTask function
      const newTask = addTask(taskData);
      console.log('Quick add created task:', newTask);
      triggerRefresh();
    }
  }, [triggerRefresh]);

  const updateTaskById = useCallback((taskId: number, updates: Partial<Task>) => {
    // Update centralized data
    const updatedTask = updateTask(taskId, updates);
    
    if (updatedTask) {
      // Update custom tasks if it exists there
      setCustomTasks(prev => 
        prev.map(task => task.id === taskId ? { ...task, ...updates } : task)
      );
      triggerRefresh();
    }
  }, [triggerRefresh]);

  const deleteTask = useCallback(async (taskId: number) => {
    try {
      const deletedTask = softDeleteTask(taskId, "AL"); // Current user
      
      if (deletedTask) {
        const taskTitle = deletedTask.title;
        
        toast({
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
                  restoreDeletedTask(taskId);
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
          className: 'p-3 pr-2 w-auto min-w-[340px]',
        });

        triggerRefresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast, triggerRefresh, navigate, dismiss]);

  const restoreDeletedTask = useCallback((taskId: number) => {
    const restoredTask = restoreTask(taskId);
    if (restoredTask) {
      toast({
        title: "Task restored",
        description: "Task has been restored successfully.",
        duration: 3000,
      });
      triggerRefresh();
    }
  }, [toast, triggerRefresh]);

  const archiveTask = useCallback((taskId: number) => {
    const taskToArchive = customTasks.find(task => task.id === taskId);
    
    if (taskToArchive) {
      setArchivedTasks(prev => [...prev, { ...taskToArchive, archived: true }]);
      setCustomTasks(prev => prev.filter(task => task.id !== taskId));
      console.log(`Task ${taskId} archived and moved to project folder`);
    }
  }, [customTasks]);

  const navigateToTask = useCallback((task: Task) => {
    navigate(`/task/${task.taskId}`);
  }, [navigate]);

  const getTasksByStatusFromContext = useCallback((status: string) => {
    // Get centralized tasks and combine with custom tasks, filtering out deleted ones
    const centralizedTasks = getTasksByStatus(status).filter(task => !task.deletedAt);
    const customTasksFiltered = customTasks.filter(task => task.status === status && !task.archived && !task.deletedAt);
    
    return [...centralizedTasks, ...customTasksFiltered];
  }, [customTasks]);

  const getAllTasks = useCallback(() => {
    const allCentralizedTasks = getTasksByStatus('redline')
      .concat(getTasksByStatus('progress'))
      .concat(getTasksByStatus('completed'))
      .filter(task => !task.deletedAt);
    
    const allCustomTasks = customTasks.filter(task => !task.archived && !task.deletedAt);
    
    return [...allCentralizedTasks, ...allCustomTasks];
  }, [customTasks]);

  return {
    customTasks,
    archivedTasks,
    refreshTrigger,
    createTask,
    updateTaskById,
    deleteTask,
    restoreDeletedTask,
    archiveTask,
    navigateToTask,
    getTasksByStatus: getTasksByStatusFromContext,
    getAllTasks,
    triggerRefresh
  };
};
