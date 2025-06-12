
import React from 'react';
import TaskDialog from './TaskDialog';
import TaskDetail from './TaskDetail';
import TaskBoardMainPanel from './task-board/TaskBoardMainPanel';
import { useTaskGroups } from '@/hooks/useTaskGroups';
import { useTaskActions } from '@/hooks/useTaskActions';

const TaskBoard = () => {
  const {
    customTasks,
    setCustomTasks,
    archivedTasks,
    setArchivedTasks,
    getTaskGroups
  } = useTaskGroups();

  const {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    selectedTask,
    showQuickAdd,
    setShowQuickAdd,
    handleTaskClick,
    handleCloseTaskDetail
  } = useTaskActions();

  const handleCreateTask = (taskData: any) => {
    console.log('Creating task:', taskData);
    setCustomTasks(prev => [taskData, ...prev]);
  };

  const handleQuickAddSave = (taskData: any) => {
    handleCreateTask(taskData);
    setShowQuickAdd(null);
  };

  const handleTaskArchive = (taskId: number) => {
    // Find the task in either default tasks or custom tasks
    const taskGroups = getTaskGroups();
    const allTasks = taskGroups.flatMap(group => group.tasks);
    const taskToArchive = allTasks.find(task => task.id === taskId);
    
    if (taskToArchive) {
      // Add to archived tasks
      setArchivedTasks(prev => [...prev, { ...taskToArchive, archived: true }]);
      
      // Remove from custom tasks if it exists there
      setCustomTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Close task detail if the archived task was selected
      if (selectedTask?.id === taskId) {
        handleCloseTaskDetail();
      }
      
      console.log(`Task ${taskId} archived and moved to project folder`);
    }
  };

  const taskGroups = getTaskGroups();

  return (
    <div className="flex-1 bg-background pl-2 flex">
      <TaskBoardMainPanel
        selectedTask={selectedTask}
        taskGroups={taskGroups}
        showQuickAdd={showQuickAdd}
        onAddTask={() => setIsTaskDialogOpen(true)}
        onSetShowQuickAdd={setShowQuickAdd}
        onQuickAddSave={handleQuickAddSave}
        onTaskClick={handleTaskClick}
        onTaskArchive={handleTaskArchive}
      />

      {/* Task detail panel */}
      {selectedTask && (
        <div className="w-96 flex-shrink-0">
          <TaskDetail 
            isOpen={true} 
            onClose={handleCloseTaskDetail}
            task={selectedTask} 
          />
        </div>
      )}

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default TaskBoard;
