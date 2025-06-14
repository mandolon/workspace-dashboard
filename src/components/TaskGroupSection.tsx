
import React, { useState } from 'react';
import TaskGroupHeader from './task-group/TaskGroupHeader';
import TaskTableSection from './task-group/TaskTableSection';
import { Task, TaskGroup } from '@/types/task';

interface TaskGroupSectionProps {
  group: TaskGroup;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive?: (taskId: number) => void;
  onTaskDeleted?: () => void;
  // Add this prop to determine context mode
  useContext?: boolean;
}

const TaskGroupSection = React.memo(({
  group,
  showQuickAdd,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive,
  onTaskDeleted,
  useContext = true // default to context mode unless told otherwise
}: TaskGroupSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="space-y-1.5">
      <TaskGroupHeader
        group={group}
        isExpanded={isExpanded}
        onToggleExpanded={() => setIsExpanded(prev => !prev)}
      />

      {isExpanded && (
        <TaskTableSection
          group={group}
          showQuickAdd={showQuickAdd}
          onSetShowQuickAdd={onSetShowQuickAdd}
          onQuickAddSave={onQuickAddSave}
          onTaskClick={onTaskClick}
          onTaskDeleted={onTaskDeleted}
          useContext={useContext}
        />
      )}
    </div>
  );
});

TaskGroupSection.displayName = "TaskGroupSection";
export default TaskGroupSection;
