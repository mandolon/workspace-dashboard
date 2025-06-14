
import React, { useMemo, useCallback } from 'react';
import TaskDialog from './TaskDialog';
import TaskBoardContent from './TaskBoardContent';
import { useTaskContext } from '@/contexts/TaskContext';
import { TaskGroup } from '@/types/task';

const TaskBoard = React.memo(() => {
  const {
    getTasksByStatus,
    refreshTrigger,
    createTask,
    navigateToTask,
    archiveTask,
    triggerRefresh
  } = useTaskContext();

  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);
  const [showQuickAdd, setShowQuickAdd] = React.useState<string | null>(null);

  const taskGroups = useMemo((): TaskGroup[] => {
    const redlineTasks = getTasksByStatus('redline');
    const progressTasks = getTasksByStatus('progress');
    const completedTasks = getTasksByStatus('completed');

    const groups: TaskGroup[] = [];

    if (redlineTasks.length > 0) {
      groups.push({
        title: "TASK/ REDLINE",
        count: redlineTasks.length,
        color: "bg-red-500",
        status: "redline",
        tasks: redlineTasks
      });
    }

    if (progressTasks.length > 0) {
      groups.push({
        title: "PROGRESS/ UPDATE",
        count: progressTasks.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: progressTasks
      });
    }

    if (completedTasks.length > 0) {
      groups.push({
        title: "COMPLETED",
        count: completedTasks.length,
        color: "bg-green-500",
        status: "completed",
        tasks: completedTasks
      });
    }

    return groups;
  }, [getTasksByStatus, refreshTrigger]);

  const handleCreateTask = useCallback((newTask: any) => {
    console.log('Creating task via dialog:', newTask);
    createTask({ ...newTask, useCustomTasks: true });
  }, [createTask]);

  const handleQuickAddSave = useCallback((taskData: any) => {
    console.log('Quick add task data:', taskData);
    createTask({
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
      useCustomTasks: false
    });
    setShowQuickAdd(null);
  }, [createTask]);

  const handleOpenTaskDialog = useCallback(() => {
    setIsTaskDialogOpen(true);
  }, []);

  const handleCloseTaskDialog = useCallback(() => {
    setIsTaskDialogOpen(false);
  }, []);

  return (
    <>
      <TaskBoardContent
        taskGroups={taskGroups}
        showQuickAdd={showQuickAdd}
        refreshTrigger={refreshTrigger}
        onSetShowQuickAdd={setShowQuickAdd}
        onQuickAddSave={handleQuickAddSave}
        onTaskClick={navigateToTask}
        onTaskArchive={archiveTask}
        onTaskDeleted={triggerRefresh}
        onAddTask={handleOpenTaskDialog}
      />

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={handleCloseTaskDialog}
        onCreateTask={handleCreateTask}
      />
    </>
  );
});

TaskBoard.displayName = "TaskBoard";

export default TaskBoard;
