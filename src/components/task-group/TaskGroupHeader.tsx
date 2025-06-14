
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TaskGroup {
  title: string;
  count: number;
  color: string;
  status: string;
}

interface TaskGroupHeaderProps {
  group: TaskGroup;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const TaskGroupHeader = ({ group, isExpanded, onToggleExpanded }: TaskGroupHeaderProps) => {
  // Simplified title display, count moved next to it
  const groupTitleMap: { [key: string]: string } = {
    redline: "TASK/ REDLINE",
    progress: "PROGRESS/ UPDATE",
    completed: "COMPLETED"
  };
  const displayTitle = groupTitleMap[group.status] || group.title;

  return (
    <div className="flex items-center gap-2"> {/* Removed mb-2 for tighter spacing with content below */}
      <button
        onClick={onToggleExpanded}
        className="p-0.5 hover:bg-accent rounded transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
      {/* Group color indicator */}
      <div className={`w-2 h-2 rounded-sm ${group.color}`}></div>
      {/* Group title and count */}
      <div className="text-xs font-medium text-foreground">
        {displayTitle}
      </div>
      <span className="text-xs font-normal text-muted-foreground">{group.count}</span>
    </div>
  );
};

export default TaskGroupHeader;

