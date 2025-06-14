
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskGroup } from '@/types/task';
import { useUser } from '@/contexts/UserContext';
import { useRealtimeTasks } from './useRealtimeTasks';
import { insertTask, updateTaskSupabase, deleteTaskSupabase } from '@/data/taskSupabase';
import { nanoid } from "nanoid";

export const useTaskBoard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { tasks, setTasks } = useRealtimeTasks();

  // Fix: Store dialog and quick add state locally
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  // showQuickAdd can be null or a group status string ("redline", "progress", "completed")
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Task grouping (by status)
  const getTaskGroups = (): TaskGroup[] => {
    const centralizedRedline = tasks.filter(task => task.status === 'redline' && !task.archived && !task.deletedAt);
    const centralizedProgress = tasks.filter(task => task.status === 'progress' && !task.archived && !task.deletedAt);
    const centralizedCompleted = tasks.filter(task => task.status === 'completed' && !task.archived && !task.deletedAt);

    // Always show all groups, even if they have zero tasks
    const taskGroups: TaskGroup[] = [
      {
        title: "TASK/ REDLINE",
        count: centralizedRedline.length,
        color: "bg-red-500",
        status: "redline",
        tasks: centralizedRedline
      },
      {
        title: "PROGRESS/ UPDATE",
        count: centralizedProgress.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: centralizedProgress
      },
      {
        title: "COMPLETED",
        count: centralizedCompleted.length,
        color: "bg-green-500",
        status: "completed",
        tasks: centralizedCompleted
      }
    ];
    return taskGroups;
  };

  // Generate a new taskId for every task insert
  const generateTaskId = () => "T" + Math.floor(Math.random() * 100000).toString().padStart(4, "0");

  const handleCreateTask = useCallback(
    async (newTask: any) => {
      const taskId = newTask.taskId ?? generateTaskId();
      await insertTask({
        ...newTask,
        taskId,
        createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
      });
      setIsTaskDialogOpen(false); // Close dialog after creating a task
    },
    [currentUser]
  );

  const handleQuickAddSave = useCallback(
    async (taskData: any) => {
      const taskId = taskData.taskId ?? generateTaskId();
      await insertTask({
        ...taskData,
        taskId,
        createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
      });
      setShowQuickAdd(null); // Close quick add after save
    },
    [currentUser]
  );

  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.taskId}`);
  };

  const handleTaskArchive = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await updateTaskSupabase(task.taskId, { archived: true });
    }
  };

  // Fix: find by .taskId (string), not .id (number)
  const handleTaskDeleted = async (taskId: string) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      await deleteTaskSupabase(task.taskId);
    }
  };

  return {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
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
