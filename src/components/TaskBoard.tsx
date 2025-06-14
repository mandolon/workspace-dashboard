import React, { useMemo, useCallback } from 'react';
import TaskDialog from './TaskDialog';
import TaskBoardContent from './TaskBoardContent';
import { useTaskContext } from '@/contexts/TaskContext';
import { useTaskNavigation } from '@/hooks/useTaskNavigation';
import { TaskGroup } from '@/types/task';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';

const TaskBoard = React.memo(() => {
  const {
    getTasksByStatus,
    refreshTrigger,
    createTask,
    archiveTask,
    triggerRefresh
  } = useTaskContext();
  const { navigateToTaskDetail } = useTaskNavigation();
  const { addAttachments } = useTaskAttachmentContext();

  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);
  const [showQuickAdd, setShowQuickAdd] = React.useState<string | null>(null);

  // Memoize taskGroups to prevent unnecessary recomputation
  const taskGroups = React.useMemo((): TaskGroup[] => {
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

  // After creating task, find the new task by its unique data, then save attachments
  const handleQuickAddSave = useCallback((taskData: any) => {
    console.log('Quick add task data:', taskData);

    // Keep strong uniqueness on title + projectId + date
    const uniqueTitle = taskData.title;
    const uniqueProjectId = taskData.projectId || 'unknown-project';
    const creationDateStr = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });

    // 1. Actually create the task
    createTask({
      title: uniqueTitle,
      projectId: uniqueProjectId,
      project: taskData.project || 'No Project',
      status: taskData.status,
      assignee: taskData.assignee,
      dueDate: taskData.dueDate || '—',
      dateCreated: creationDateStr,
      estimatedCompletion: '—',
      hasAttachment: taskData.hasAttachment ?? (
        Array.isArray(taskData.attachments) && taskData.attachments.length > 0
      ),
      attachments: taskData.attachments ?? [],
      collaborators: [],
      useCustomTasks: false
    });

    // 2. If there are files, try to find the just-created task by status, title, projectId, dateCreated
    if (taskData.attachments && taskData.attachments.length > 0) {
      // A. Get latest list of tasks of correct status
      const statusList = getTasksByStatus(taskData.status);

      // B. Find the latest task with all unique fields matching
      const foundTask = statusList.find(t =>
        t.title === uniqueTitle &&
        t.projectId === uniqueProjectId &&
        t.dateCreated === creationDateStr
      );

      if (foundTask && foundTask.taskId) {
        addAttachments(foundTask.taskId, taskData.attachments, "ME");
      } else {
        console.warn("Could not find created task to add attachments.");
      }
    }
    setShowQuickAdd(null);
  }, [createTask, getTasksByStatus, addAttachments]);

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
        onTaskClick={navigateToTaskDetail}
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
