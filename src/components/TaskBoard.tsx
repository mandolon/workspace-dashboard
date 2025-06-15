
import React from 'react';
import TaskDialog from './TaskDialog';
import TaskBoardContent from './TaskBoardContent';
import { useTaskBoard } from '@/hooks/useTaskBoard';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';
import { useTaskDeletion } from '@/hooks/useTaskDeletion';
import { Task } from '@/types/task';

const TaskBoard: React.FC = React.memo(() => {
  console.log('[TaskBoard] Starting to render TaskBoard');
  
  // Use Supabase-powered board for state
  const {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    showQuickAdd,
    setShowQuickAdd,
    getTaskGroups,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    toggleTaskStatus,
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    supabaseTasks,
    supabaseTasksLoading,
  } = useTaskBoard();
  
  console.log('[TaskBoard] useTaskBoard data:', { 
    supabaseTasks: supabaseTasks?.length, 
    loading: supabaseTasksLoading,
    isTaskDialogOpen,
    showQuickAdd 
  });

  const { addAttachments } = useTaskAttachmentContext();

  // --- Task Deletion logic from useTaskDeletion
  const {
    handleDeleteTask,
    isDeleting,
  } = useTaskDeletion();

  // Board tasks - use supabaseTasks directly for real-time updates
  const taskGroups = React.useMemo(() => {
    console.log('[TaskBoard] Computing task groups...');
    const groups = getTaskGroups();
    console.log('[TaskBoard] Task groups computed:', groups.map(g => `${g.status}: ${g.count}`));
    return groups;
  }, [getTaskGroups, supabaseTasks]);

  // Quick Add handles attachments as in Supabase system
  const onQuickAddSave = React.useCallback(async (taskData: any) => {
    console.log('[TaskBoard] Quick add save:', taskData);
    await handleQuickAddSave(taskData);

    // If attachments exist, try to find the new task (by title/project/dateCreated) and add them
    if (taskData.attachments && taskData.attachments.length > 0) {
      const latestGroups = getTaskGroups();
      let foundTask = null;
      for (const group of latestGroups) {
        foundTask = group.tasks.find(t =>
          t.title === taskData.title &&
          t.projectId === taskData.projectId &&
          t.dateCreated === taskData.dateCreated
        );
        if (foundTask) break;
      }
      if (foundTask && foundTask.taskId) {
        addAttachments(foundTask.taskId, taskData.attachments, "ME");
      } else {
        console.warn('Could not find created task to add attachments.');
      }
    }
    setShowQuickAdd(null);
  }, [handleQuickAddSave, addAttachments, getTaskGroups, setShowQuickAdd]);

  // Dialog open/close
  const onDialogOpen = React.useCallback(() => setIsTaskDialogOpen(true), [setIsTaskDialogOpen]);
  const onDialogClose = React.useCallback(() => setIsTaskDialogOpen(false), [setIsTaskDialogOpen]);

  // --- Unified delete handler for this board. Accept Task or id as arg.
  const onTaskDeleted = React.useCallback(async (task: Task | string | number) => {
    console.log('[TaskBoard] Task deleted callback:', task);
    let realTask: Task | null = null;
    if (typeof task === "object" && task.taskId) {
      realTask = task;
    } else if (typeof task === "string" || typeof task === "number") {
      // Try to find the task by id/taskId in any group
      const allTasks = taskGroups.flatMap(g => g.tasks);
      realTask =
        allTasks.find(t =>
          t.taskId === task ||
          t.id === task
        ) || null;
    }
    if (!realTask) {
      console.error("Can't resolve task for deletion");
      return;
    }
    // Soft delete via the task deletion hook (will set deletedAt)
    await handleDeleteTask(realTask);
  }, [handleDeleteTask, taskGroups]);

  console.log('[TaskBoard] About to render TaskBoardContent with taskGroups:', taskGroups.length);

  if (supabaseTasksLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TaskBoardContent
        taskGroups={taskGroups}
        showQuickAdd={showQuickAdd}
        refreshTrigger={0}
        onSetShowQuickAdd={setShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
        onTaskClick={handleTaskClick}
        onTaskArchive={handleTaskArchive}
        onTaskDeleted={onTaskDeleted}
        onAddTask={onDialogOpen}
        toggleTaskStatus={toggleTaskStatus}
        assignPerson={assignPerson}
        removeAssignee={removeAssignee}
        addCollaborator={addCollaborator}
        removeCollaborator={removeCollaborator}
      />
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={onDialogClose}
        onCreateTask={handleCreateTask}
      />
    </>
  );
});

TaskBoard.displayName = "TaskBoard";
export default TaskBoard;
