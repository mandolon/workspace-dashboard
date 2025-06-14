
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
  return (
    <div className="flex items-center gap-2 mb-1"> {/* Reduced mb */}
      <button
        onClick={onToggleExpanded}
        className="p-0.5 hover:bg-accent rounded transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> 
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
      {/* Color indicator removed as per ClickUp screenshot */}
      {/* <div className={`w-2 h-2 rounded-sm ${group.color}`}></div> */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-semibold text-sm text-foreground">{group.title}</span>
        <span className="text-xs text-muted-foreground">{group.count}</span>
      </div>
    </div>
  );
};

export default TaskGroupHeader;
