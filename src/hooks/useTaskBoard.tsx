
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskGroup } from '@/types/task';
import { useUser } from '@/contexts/UserContext';
import { useRealtimeTasks } from './useRealtimeTasks';
import { insertTask, updateTaskSupabase, deleteTaskSupabase } from '@/data/taskSupabase';

export const useTaskBoard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { tasks, setTasks } = useRealtimeTasks();
  const showQuickAdd = null;
  const setShowQuickAdd = () => {};
  const refreshTrigger = 0;
  const setRefreshTrigger = () => {};

  // Task grouping (by status)
  const getTaskGroups = (): TaskGroup[] => {
    const centralizedRedline = tasks.filter(task => task.status === 'redline' && !task.archived && !task.deletedAt);
    const centralizedProgress = tasks.filter(task => task.status === 'progress' && !task.archived && !task.deletedAt);
    const centralizedCompleted = tasks.filter(task => task.status === 'completed' && !task.archived && !task.deletedAt);

    const taskGroups: TaskGroup[] = [];
    if (centralizedRedline.length > 0) {
      taskGroups.push({
        title: "TASK/ REDLINE",
        count: centralizedRedline.length,
        color: "bg-red-500",
        status: "redline",
        tasks: centralizedRedline
      });
    }
    if (centralizedProgress.length > 0) {
      taskGroups.push({
        title: "PROGRESS/ UPDATE",
        count: centralizedProgress.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: centralizedProgress
      });
    }
    if (centralizedCompleted.length > 0) {
      taskGroups.push({
        title: "COMPLETED",
        count: centralizedCompleted.length,
        color: "bg-green-500",
        status: "completed",
        tasks: centralizedCompleted
      });
    }
    return taskGroups;
  };

  const handleCreateTask = useCallback(async (newTask: Task) => {
    await insertTask({
      ...newTask,
      createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
    });
  }, [currentUser]);

  const handleQuickAddSave = useCallback(async (taskData: any) => {
    await insertTask({
      ...taskData,
      createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
    });
    setShowQuickAdd(null);
  }, [currentUser]);

  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.taskId}`);
  };

  const handleTaskArchive = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await updateTaskSupabase(task.taskId, { archived: true });
    }
  };

  const handleTaskDeleted = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await deleteTaskSupabase(task.taskId);
    }
  };

  return {
    isTaskDialogOpen: false,
    setIsTaskDialogOpen: () => {},
    showQuickAdd,
    setShowQuickAdd,
    refreshTrigger,
    getTaskGroups,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    handleTaskDeleted,
  };
};
