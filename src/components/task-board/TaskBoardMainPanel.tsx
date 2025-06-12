
import React from 'react';
import TaskBoardHeader from '../TaskBoardHeader';
import TaskBoardFilters from '../TaskBoardFilters';
import TaskBoardContent from './TaskBoardContent';

interface TaskBoardMainPanelProps {
  selectedTask: any;
  taskGroups: any[];
  showQuickAdd: string | null;
  onAddTask: () => void;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: any) => void;
  onTaskArchive: (taskId: number) => void;
}

const TaskBoardMainPanel = ({
  selectedTask,
  taskGroups,
  showQuickAdd,
  onAddTask,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive
}: TaskBoardMainPanelProps) => {
  return (
    <div className={`${selectedTask ? 'flex-1' : 'w-full'} flex flex-col`}>
      <TaskBoardHeader />
      <TaskBoardFilters onAddTask={onAddTask} />
      <TaskBoardContent
        taskGroups={taskGroups}
        showQuickAdd={showQuickAdd}
        onSetShowQuickAdd={onSetShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
        onTaskClick={onTaskClick}
        onTaskArchive={onTaskArchive}
      />
    </div>
  );
};

export default TaskBoardMainPanel;
