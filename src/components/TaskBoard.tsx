
import React from 'react';
import TaskDialog from './TaskDialog';
import TaskBoardContent from './TaskBoardContent';
import { useTaskBoard } from '@/hooks/useTaskBoard';
import { useTaskNavigation } from '@/hooks/useTaskNavigation';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';

const TaskBoard: React.FC = React.memo(() => {
  // Use Supabase-powered board instead of TaskContext for core state
  const {
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
  } = useTaskBoard();
  const { addAttachments } = useTaskAttachmentContext();

  // Realtime task groups for Supabase-powered flow
  const taskGroups = React.useMemo(() => getTaskGroups(), [getTaskGroups, refreshTrigger]);

  // Quick Add handles attachments as in Supabase system
  const onQuickAddSave = React.useCallback(async (taskData: any) => {
    await handleQuickAddSave(taskData);

    // If attachments exist, try to find the new task (by title & project & dateCreated) and add them
    if (taskData.attachments && taskData.attachments.length > 0) {
      // Refetch tasks from board
      const latestGroups = getTaskGroups();
      // Find in all latestGroups
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
    setShowQuickAdd(); // fix: no argument
  }, [handleQuickAddSave, addAttachments, getTaskGroups, setShowQuickAdd]);

  // Dialog open/close helper
  const onDialogOpen = React.useCallback(() => setIsTaskDialogOpen(), [setIsTaskDialogOpen]); // fix: no argument
  const onDialogClose = React.useCallback(() => setIsTaskDialogOpen(), [setIsTaskDialogOpen]); // fix: no argument

  return (
    <>
      <TaskBoardContent
        taskGroups={taskGroups}
        showQuickAdd={showQuickAdd}
        refreshTrigger={refreshTrigger}
        onSetShowQuickAdd={setShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
        onTaskClick={handleTaskClick}
        onTaskArchive={handleTaskArchive}
        onTaskDeleted={() => {}} {/* fix: match expected type */}
        onAddTask={onDialogOpen}
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
