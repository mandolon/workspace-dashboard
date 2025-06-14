
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { getTasksByStatus, addTask, updateTask, softDeleteTask, restoreTask, getAllTasksRaw } from '@/data/taskData';
import { Undo } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export const useTaskOperations = () => {
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();
  const { currentUser } = useUser();
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Always create in the shared backend, never locally
  const createTask = useCallback((taskData: any) => {
    console.log('Creating task centrally:', taskData);

    const newTask = addTask({
      ...taskData,
      createdBy: (currentUser?.name ?? "Unknown"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log('Created task (central):', newTask);
    triggerRefresh();
  }, [triggerRefresh, currentUser]);

  const updateTaskById = useCallback((taskId: number, updates: Partial<Task>) => {
    const updatedTask = updateTask(taskId, updates);
    if (updatedTask) {
      triggerRefresh();
    }
  }, [triggerRefresh]);

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

  const deleteTask = useCallback(async (taskId: number) => {
    try {
      const deletedTask = softDeleteTask(taskId, "AL");
      if (deletedTask) {
        toast({
          description: (
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
              <span className="ml-6" />
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
              <span className="mx-2 h-5 border-l border-border inline-block self-center" />
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
  }, [toast, triggerRefresh, navigate, dismiss, restoreDeletedTask]);

  // Archive and restore logics only apply to baseTasks now
  const archiveTask = useCallback((taskId: number) => {
    const tasks = getAllTasksRaw().filter(task => !task.deletedAt);
    const taskToArchive = tasks.find(task => task.id === taskId);

    if (taskToArchive) {
      setArchivedTasks(prev => [...prev, { ...taskToArchive, archived: true }]);
      // Hard-archive: update the centralized backend (add archived: true)
      updateTask(taskId, { archived: true });
      triggerRefresh();
      console.log(`Task ${taskId} archived and moved to project folder`);
    }
  }, [triggerRefresh]);

  const navigateToTask = useCallback((task: Task) => {
    navigate(`/task/${task.taskId}`);
  }, [navigate]);

  // FILTERING: Only Armando Lopez sees all, everyone else only their assigned/created/collab tasks
  function filterTasksForUser(tasks: Task[]) {
    if (!currentUser) {
      // If user is not logged in or hasn't loaded yet, return empty.
      return [];
    }

    if (
      currentUser.name === "Armando Lopez"
      || currentUser.name === "AL"
      || currentUser.email === "armando@company.com"
    ) {
      return tasks;
    }

    // Support both fullName and name for matching
    const myNames = [currentUser.name, (currentUser as any).fullName].filter(Boolean);
    return tasks.filter(
      t =>
        // Match on assignee's name or fullName
        (t.assignee && (
          myNames.includes(t.assignee?.fullName) ||
          myNames.includes(t.assignee?.name)
        ))
        // Or if a collaborator matches
        || (t.collaborators && t.collaborators.some(
          c => myNames.includes(c.fullName) || myNames.includes(c.name)
        ))
        // Or createdBy matches
        || myNames.includes(t.createdBy)
        || t.createdBy === currentUser.email // fallback just in case
    );
  }

  // Get centralized tasks only, filter for user
  const getTasksByStatusFromContext = useCallback((status: string) => {
    const centralizedTasks = getTasksByStatus(status).filter(task => !task.deletedAt);
    return filterTasksForUser(centralizedTasks);
  }, [currentUser]);

  // All tasks (from the shared backend array)
  const getAllTasks = useCallback(() => {
    if (!currentUser) return [];
    const allCentralizedTasks = getAllTasksRaw().filter(task => !task.deletedAt && !task.archived);
    return filterTasksForUser(allCentralizedTasks);
  }, [refreshTrigger, currentUser]);

  return {
    customTasks: [], // No longer used, provided for backward compatibility
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
