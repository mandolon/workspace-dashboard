
import React, { useMemo, useCallback, useState } from 'react';
import TaskDialog from './TaskDialog';
import TaskBoardContent from './TaskBoardContent';
import { useTaskContext } from '@/contexts/TaskContext';
import { useTaskNavigation } from '@/hooks/useTaskNavigation';
import { Task, TaskGroup as TaskGroupType } from '@/types/task'; // Renamed to avoid conflict
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


const TaskBoard = React.memo(() => {
  const {
    getTasksByStatus,
    refreshTrigger,
    createTask,
    archiveTask,
    triggerRefresh,
    updateTaskById, // For D&D
    getAllTasks, // For finding active drag task
  } = useTaskContext();

  const { navigateToTaskDetail } = useTaskNavigation();

  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);
  const [showQuickAdd, setShowQuickAdd] = React.useState<string | null>(null);
  const [activeDragTask, setActiveDragTask] = useState<Task | null>(null);

  // Local state for task groups to manage optimistic updates for D&D
  // This is tricky because the source of truth is in TaskContext / taskData.ts
  // For smooth D&D, optimistic updates are good, but need to sync back.
  // For now, we will rely on re-fetching from context after D&D.
  const taskGroups = useMemo((): TaskGroupType[] => {
    const redlineTasks = getTasksByStatus('redline');
    const progressTasks = getTasksByStatus('progress');
    const completedTasks = getTasksByStatus('completed');

    const groups: TaskGroupType[] = [];

    // Only add groups if they have tasks or if we want to show empty groups as drop targets
    // For now, ClickUp style, only show groups with tasks or that are default.
    // We should ensure all possible statuses can be drop targets even if empty.
    // Let's define all potential statuses to ensure drop targets exist
    const allStatuses = ["redline", "progress", "completed", "todo"]; // Assuming 'todo' is a valid status

    const taskMap = {
      redline: redlineTasks,
      progress: progressTasks,
      completed: completedTasks,
      todo: getTasksByStatus('todo') || [] // Add 'todo' or any other status
    };
    
    const groupMeta: Record<string, {title: string, color: string}> = {
        redline: { title: "TASK/ REDLINE", color: "bg-red-500" },
        progress: { title: "PROGRESS/ UPDATE", color: "bg-blue-500" },
        completed: { title: "COMPLETED", color: "bg-green-500" },
        todo: { title: "TO DO", color: "bg-gray-400" }, // Example for 'todo'
    };

    // Ensure consistent order of groups
    const orderedStatuses = ["redline", "progress", "completed"]; // Customize as needed

    orderedStatuses.forEach(statusKey => {
      const tasks = taskMap[statusKey as keyof typeof taskMap] || [];
      // Only add group if it has tasks, or always add for D&D drop target
      // if (tasks.length > 0) { 
        groups.push({
          title: groupMeta[statusKey].title,
          count: tasks.length,
          color: groupMeta[statusKey].color,
          status: statusKey,
          tasks: tasks
        });
      // }
    });
    
    return groups;
  }, [getTasksByStatus, refreshTrigger]);


  const handleCreateTask = useCallback((newTaskData: any) => {
    createTask({ ...newTaskData, useCustomTasks: true }); // Assuming useCustomTasks differentiates source
    triggerRefresh();
  }, [createTask, triggerRefresh]);

  const handleQuickAddSave = useCallback((taskData: any) => {
    createTask({
      title: taskData.title,
      projectId: taskData.projectId || 'unknown-project', // Ensure projectId is passed
      project: taskData.project || 'No Project',
      status: taskData.status,
      assignee: taskData.assignee,
      dueDate: taskData.dueDate || '—',
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
      estimatedCompletion: '—',
      hasAttachment: false,
      collaborators: [],
      // useCustomTasks: false // This flag might not be needed if createTask handles it
    });
    setShowQuickAdd(null);
    triggerRefresh();
  }, [createTask, triggerRefresh]);

  const handleOpenTaskDialog = useCallback(() => setIsTaskDialogOpen(true), []);
  const handleCloseTaskDialog = useCallback(() => setIsTaskDialogOpen(false), []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const allTasks = getAllTasks(); // Get all tasks from context
    const task = allTasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveDragTask(task);
    }
  }, [getAllTasks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragTask(null);
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const taskId = Number(active.id);
      const newStatus = String(over.id); // over.id is the group.status

      // Find the task and its current group
      const allSystemTasks = getAllTasks();
      const taskToMove = allSystemTasks.find(t => t.id === taskId);
      
      if (taskToMove && taskToMove.status !== newStatus) {
         // Check if newStatus is a valid status for a TaskGroup
        const targetGroupExists = taskGroups.some(group => group.status === newStatus);
        if (targetGroupExists) {
          console.log(`Moving task ${taskId} from ${taskToMove.status} to ${newStatus}`);
          updateTaskById(taskId, { status: newStatus });
          triggerRefresh(); // Re-fetch and re-render
        } else {
          console.warn(`Drop target ${newStatus} is not a valid task group status.`);
        }
      } else if (taskToMove && taskToMove.status === newStatus) {
        // Task dropped in the same column, potentially for reordering
        // This part requires more complex logic for intra-list sorting
        // For now, if dropped in same column, do nothing or triggerRefresh if order might matter
        // Optimistic update for reordering within a list is complex with current setup.
        console.log(`Task ${taskId} reordered within ${newStatus} (or dropped on itself). Reordering not fully implemented yet.`);
        // Potentially:
        // const oldIndex = taskGroups.find(g => g.status === newStatus)?.tasks.findIndex(t => t.id === taskId);
        // const newIndex = ??? (need to get this from DND-kit if items are sortable within the column)
        // if (oldIndex !== undefined && newIndex !== undefined) {
        //    const updatedTasks = arrayMove(taskGroups.find(g => g.status === newStatus)!.tasks, oldIndex, newIndex);
        //    // Then update the entire list of tasks for that status in context/backend
        // }
        triggerRefresh(); // Refresh to ensure consistency if any reordering logic is partially there
      }
    }
  }, [updateTaskById, triggerRefresh, getAllTasks, taskGroups]);

  return (
    <>
      <TaskBoardContent
        taskGroups={taskGroups}
        showQuickAdd={showQuickAdd}
        refreshTrigger={refreshTrigger}
        activeDragTask={activeDragTask}
        onSetShowQuickAdd={setShowQuickAdd}
        onQuickAddSave={handleQuickAddSave}
        onTaskClick={navigateToTaskDetail}
        onTaskArchive={archiveTask} // This might interact weirdly with DND, needs testing
        onTaskDeleted={triggerRefresh} // Ensure DND state is consistent
        onAddTask={handleOpenTaskDialog}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
