
import { useRealtimeTasks } from './useRealtimeTasks';
import { useTaskGroups } from './useTaskGroups';
import { useTaskOperations } from './useTaskOperations';
import { useTaskAssignmentOperations } from './useTaskAssignmentOperations';

export const useTaskBoard = () => {
  console.log('[useTaskBoard] Hook called');
  
  const { tasks, loading } = useRealtimeTasks();
  console.log('[useTaskBoard] Realtime tasks:', { taskCount: tasks?.length, loading });
  
  const { getTaskGroups } = useTaskGroups(tasks);
  
  const {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    showQuickAdd,
    setShowQuickAdd,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    handleTaskDeleted,
    toggleTaskStatus,
  } = useTaskOperations(tasks);

  const {
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
  } = useTaskAssignmentOperations(tasks);

  console.log('[useTaskBoard] Returning hook data');

  return {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    showQuickAdd,
    setShowQuickAdd,
    getTaskGroups,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    handleTaskDeleted,
    toggleTaskStatus,
    // Assignment handlers for Supabase tasks only:
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    supabaseTasks: tasks, // expose realtime tasks for detail page
    supabaseTasksLoading: loading,
  };
};
