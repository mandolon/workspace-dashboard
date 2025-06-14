
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { getTasksByStatus, addTask, updateTask, softDeleteTask, restoreTask } from '@/data/taskData';

interface TaskContextType {
  // Task state
  customTasks: Task[];
  archivedTasks: Task[];
  editingTaskId: number | null;
  editingValue: string;
  refreshTrigger: number;
  
  // Task operations
  createTask: (taskData: any) => void;
  updateTaskById: (taskId: number, updates: Partial<Task>) => void;
  deleteTask: (taskId: number) => Promise<void>;
  restoreDeletedTask: (taskId: number) => void;
  archiveTask: (taskId: number) => void;
  
  // Edit operations
  startEditingTask: (task: Task) => void;
  saveTaskEdit: (taskId: number) => void;
  cancelTaskEdit: () => void;
  setEditingValue: (value: string) => void;
  
  // Status operations
  toggleTaskStatus: (taskId: number) => void;
  
  // Assignment operations
  assignPerson: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  removeAssignee: (taskId: number) => void;
  addCollaborator: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  removeCollaborator: (taskId: number, collaboratorIndex: number) => void;
  
  // Navigation
  navigateToTask: (task: Task) => void;
  
  // Data getters
  getTasksByStatus: (status: string) => Task[];
  getAllTasks: () => Task[];
  
  // Refresh trigger
  triggerRefresh: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
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
          title: "Task deleted",
          description: `"${taskTitle}" has been deleted.`,
          action: (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => restoreDeletedTask(taskId)}
            >
              Undo
            </Button>
          ),
          duration: 5000,
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
  }, [toast, triggerRefresh]);

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

  const startEditingTask = useCallback((task: Task) => {
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  }, []);

  const saveTaskEdit = useCallback((taskId: number) => {
    if (editingValue.trim() === '') {
      console.warn('Cannot save empty task title');
      setEditingTaskId(null);
      setEditingValue('');
      return;
    }

    updateTaskById(taskId, { title: editingValue.trim() });
    setEditingTaskId(null);
    setEditingValue('');
  }, [editingValue, updateTaskById]);

  const cancelTaskEdit = useCallback(() => {
    setEditingTaskId(null);
    setEditingValue('');
  }, []);

  const toggleTaskStatus = useCallback((taskId: number) => {
    // Get the task from centralized data or custom tasks
    const centralizedTask = getTasksByStatus('redline').concat(getTasksByStatus('progress')).concat(getTasksByStatus('completed')).find(t => t.id === taskId);
    const customTask = customTasks.find(t => t.id === taskId);
    const task = centralizedTask || customTask;
    
    if (task && task.status !== 'completed') {
      const previousStatus = task.status;
      
      updateTaskById(taskId, { status: 'completed', archived: true });
      archiveTask(taskId);
      
      toast({
        title: "Task completed",
        description: `"${task.title}" has been marked as completed.`,
        action: (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => updateTaskById(taskId, { status: previousStatus, archived: false })}
          >
            Undo
          </Button>
        ),
        duration: 5000,
      });
      
      console.log(`Completed and archived task ${taskId}`);
    } else if (task && task.status === 'completed') {
      updateTaskById(taskId, { status: 'progress', archived: false });
      console.log(`Unarchived task ${taskId}`);
    }
  }, [customTasks, updateTaskById, archiveTask, toast]);

  const assignPerson = useCallback((taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    updateTaskById(taskId, { assignee: person });
    console.log(`Assigned ${person.fullName || person.name} to task ${taskId}`);
  }, [updateTaskById]);

  const removeAssignee = useCallback((taskId: number) => {
    updateTaskById(taskId, { assignee: null });
    console.log(`Removed assignee from task ${taskId}`);
  }, [updateTaskById]);

  const addCollaborator = useCallback((taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    const centralizedTask = getTasksByStatus('redline').concat(getTasksByStatus('progress')).concat(getTasksByStatus('completed')).find(t => t.id === taskId);
    const customTask = customTasks.find(t => t.id === taskId);
    const currentTask = centralizedTask || customTask;
    
    if (currentTask) {
      const updatedCollaborators = [...(currentTask.collaborators || []), person];
      updateTaskById(taskId, { collaborators: updatedCollaborators });
    }
    console.log(`Added ${person.fullName || person.name} as collaborator to task ${taskId}`);
  }, [customTasks, updateTaskById]);

  const removeCollaborator = useCallback((taskId: number, collaboratorIndex: number) => {
    const centralizedTask = getTasksByStatus('redline').concat(getTasksByStatus('progress')).concat(getTasksByStatus('completed')).find(t => t.id === taskId);
    const customTask = customTasks.find(t => t.id === taskId);
    const currentTask = centralizedTask || customTask;
    
    if (currentTask) {
      const updatedCollaborators = currentTask.collaborators?.filter((_, index) => index !== collaboratorIndex) || [];
      updateTaskById(taskId, { collaborators: updatedCollaborators });
    }
    console.log(`Removed collaborator ${collaboratorIndex} from task ${taskId}`);
  }, [customTasks, updateTaskById]);

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

  const value: TaskContextType = {
    // Task state
    customTasks,
    archivedTasks,
    editingTaskId,
    editingValue,
    refreshTrigger,
    
    // Task operations
    createTask,
    updateTaskById,
    deleteTask,
    restoreDeletedTask,
    archiveTask,
    
    // Edit operations
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit,
    setEditingValue,
    
    // Status operations
    toggleTaskStatus,
    
    // Assignment operations
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    
    // Navigation
    navigateToTask,
    
    // Data getters
    getTasksByStatus: getTasksByStatusFromContext,
    getAllTasks,
    
    // Refresh trigger
    triggerRefresh
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
