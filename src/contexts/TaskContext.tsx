
import React, { createContext, useContext } from 'react';
import { Task } from '@/types/task';
import { useTaskBoard } from '@/hooks/useTaskBoard';

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
  changeTaskStatus: (taskId: number, newStatus: "redline" | "progress" | "completed") => void;
  
  // Assignment operations
  assignPerson: (taskId: string, person: { name: string; avatar: string; fullName?: string }) => void;
  removeAssignee: (taskId: string) => void;
  addCollaborator: (taskId: string, person: { name: string; avatar: string; fullName?: string }) => void;
  removeCollaborator: (taskId: string, collaboratorIndex: number) => void;
  
  // Navigation
  navigateToTask: (task: Task) => void;
  
  // Data getters
  getTasksByStatus: (status: string) => Task[];
  getAllTasks: () => Task[];
  
  // Refresh trigger
  triggerRefresh: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

console.log('TaskContext created');

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
  // Use the new Supabase-powered task board
  const {
    handleCreateTask,
    handleTaskClick,
    handleTaskArchive,
    toggleTaskStatus,
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    supabaseTasks,
  } = useTaskBoard();

  // Mock implementations for legacy compatibility
  const mockEditingState = {
    editingTaskId: null,
    editingValue: "",
    startEditingTask: (task: Task) => {
      console.log('[TaskContext] Legacy editing not implemented for:', task.taskId);
    },
    saveTaskEdit: (taskId: number) => {
      console.log('[TaskContext] Legacy save edit not implemented for:', taskId);
    },
    cancelTaskEdit: () => {
      console.log('[TaskContext] Legacy cancel edit not implemented');
    },
    setEditingValue: (value: string) => {
      console.log('[TaskContext] Legacy set editing value not implemented:', value);
    },
  };

  const mockLegacyOperations = {
    updateTaskById: (taskId: number, updates: Partial<Task>) => {
      console.log('[TaskContext] Legacy updateTaskById not implemented:', taskId, updates);
    },
    deleteTask: async (taskId: number) => {
      console.log('[TaskContext] Legacy deleteTask not implemented:', taskId);
    },
    restoreDeletedTask: (taskId: number) => {
      console.log('[TaskContext] Legacy restoreDeletedTask not implemented:', taskId);
    },
    changeTaskStatus: (taskId: number, newStatus: "redline" | "progress" | "completed") => {
      console.log('[TaskContext] Legacy changeTaskStatus not implemented:', taskId, newStatus);
    },
    navigateToTask: (task: Task) => {
      handleTaskClick(task);
    },
    triggerRefresh: () => {
      console.log('[TaskContext] Legacy triggerRefresh not implemented');
    },
  };

  const value = React.useMemo((): TaskContextType => ({
    // Task state - use Supabase tasks
    customTasks: supabaseTasks || [],
    archivedTasks: [], // Archived tasks are included in supabaseTasks when needed
    refreshTrigger: 0, // Not needed with real-time updates
    
    // Edit operations (legacy compatibility)
    ...mockEditingState,
    
    // Task operations - bridge to new system
    createTask: handleCreateTask,
    archiveTask: (taskId: number) => handleTaskArchive(taskId),
    toggleTaskStatus: toggleTaskStatus,
    
    // Legacy operations (mock implementations)
    ...mockLegacyOperations,
    
    // Assignment operations - bridge to new system
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    
    // Data getters
    getTasksByStatus: (status: string) => {
      return (supabaseTasks || []).filter(task => task.status === status);
    },
    getAllTasks: () => supabaseTasks || [],
  }), [
    supabaseTasks,
    handleCreateTask,
    handleTaskClick,
    handleTaskArchive,
    toggleTaskStatus,
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
  ]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
