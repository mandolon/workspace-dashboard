
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TaskGroup } from '@/types/task';
import AddTaskButton from './AddTaskButton';

interface TaskGroupHeaderProps {
  group: TaskGroup;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'redline':
      return 'TASK/ REDLINE';
    case 'progress':
      return 'PROGRESS/ UPDATE';
    case 'completed':
      return 'COMPLETED';
    default:
      return status.toUpperCase();
  }
};

const TaskGroupHeader = ({
  group,
  isCollapsed,
  onToggleCollapse,
  showQuickAdd,
  onSetShowQuickAdd,
  onQuickAddSave,
}: TaskGroupHeaderProps) => {
  const statusLabel = getStatusLabel(group.status);

  return (
    <div className="flex items-center justify-between py-2 px-1">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-accent rounded transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        <div className={`px-2 py-1 rounded text-white text-xs font-medium ${group.color}`}>
          {statusLabel}
        </div>
        <span className="text-sm text-muted-foreground">
          {group.count}
        </span>
      </div>
      <AddTaskButton
        status={group.status}
        showQuickAdd={showQuickAdd}
        onSetShowQuickAdd={onSetShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
      />
    </div>
  );
};

export default TaskGroupHeader;
