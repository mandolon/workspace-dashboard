
import React from 'react';
import TaskDialog from './TaskDialog';
import TaskBoardContent from './TaskBoardContent';
import { useTaskContext } from '@/contexts/TaskContext';
import { TaskGroup } from '@/types/task';

const TaskBoard = () => {
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

  const getTaskGroups = (): TaskGroup[] => {
    const redlineTasks = getTasksByStatus('redline');
    const progressTasks = getTasksByStatus('progress');
    const completedTasks = getTasksByStatus('completed');

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

  const handleCreateTask = (newTask: any) => {
    console.log('Creating task via dialog:', newTask);
    createTask({ ...newTask, useCustomTasks: true });
  };

  const handleQuickAddSave = (taskData: any) => {
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
  };

  const taskGroups = getTaskGroups();

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
        onAddTask={() => setIsTaskDialogOpen(true)}
      />

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </>
  );
};

export default TaskBoard;
