import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasksByStatus, addTask } from '@/data/taskData';
import { Task, TaskGroup } from '@/types/task';
import { useUser } from '@/contexts/UserContext';

export const useTaskBoard = () => {
  const navigate = useNavigate();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { currentUser } = useUser();

  // Get task groups using centralized data
  const getTaskGroups = (): TaskGroup[] => {
    // Get centralized tasks and combine with custom tasks, filtering out deleted ones
    const centralizedRedline = getTasksByStatus('redline').filter(task => !task.deletedAt);
    const centralizedProgress = getTasksByStatus('progress').filter(task => !task.deletedAt); 
    const centralizedCompleted = getTasksByStatus('completed').filter(task => !task.deletedAt);
    
    const customRedline = customTasks.filter(task => task.status === 'redline' && !task.archived && !task.deletedAt);
    const customProgress = customTasks.filter(task => task.status === 'progress' && !task.archived && !task.deletedAt);
    const customCompleted = customTasks.filter(task => task.status === 'completed' && !task.archived && !task.deletedAt);

    const redlineTasks = [...centralizedRedline, ...customRedline];
    const progressTasks = [...centralizedProgress, ...customProgress];
    const completedTasks = [...centralizedCompleted, ...customCompleted];

    const taskGroups: TaskGroup[] = [];

    if (redlineTasks.length > 0) {
      taskGroups.push({
        title: "TASK/ REDLINE",
        count: redlineTasks.length,
        color: "bg-red-500",
        status: "redline",
        tasks: redlineTasks
      });
    }

    if (progressTasks.length > 0) {
      taskGroups.push({
        title: "PROGRESS/ UPDATE",
        count: progressTasks.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: progressTasks
      });
    }

    if (completedTasks.length > 0) {
      taskGroups.push({
        title: "COMPLETED",
        count: completedTasks.length,
        color: "bg-green-500",
        status: "completed",
        tasks: completedTasks
      });
    }

    return taskGroups;
  };

  const handleCreateTask = (newTask: Task) => {
    console.log('Creating task via dialog:', newTask);
    // For tasks created via dialog, add to custom tasks only
    setCustomTasks(prev => [newTask, ...prev]);
  };

  const handleQuickAddSave = (taskData: any) => {
    console.log('Quick add task data:', taskData);
    // For quick add, use the centralized addTask function and trigger refresh
    const newTask = addTask({
      title: taskData.title,
      projectId: taskData.projectId || 'unknown-project',
      project: taskData.project || 'No Project',
      status: taskData.status,
      assignee: taskData.assignee,
      dueDate: taskData.dueDate || '—',
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
      estimatedCompletion: '—',
      hasAttachment: false,
      collaborators: [],
      createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
    });
    
    console.log('Quick add created task:', newTask);
    // Trigger a refresh to ensure the new task appears
    setRefreshTrigger(prev => prev + 1);
    setShowQuickAdd(null);
  };

  const handleTaskClick = (task: Task) => {
    // Use TaskID for navigation
    navigate(`/task/${task.taskId}`);
  };

  const handleTaskArchive = (taskId: number) => {
    // Find the task in custom tasks
    const taskToArchive = customTasks.find(task => task.id === taskId);
    
    if (taskToArchive) {
      // Add to archived tasks
      setArchivedTasks(prev => [...prev, { ...taskToArchive, archived: true }]);
      
      // Remove from custom tasks
      setCustomTasks(prev => prev.filter(task => task.id !== taskId));
      
      console.log(`Task ${taskId} archived and moved to project folder`);
    }
  };

  const handleTaskDeleted = () => {
    // Trigger refresh to update the UI after deletion/restoration
    setRefreshTrigger(prev => prev + 1);
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
    handleTaskDeleted
  };
};
