
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
    <div className="flex items-center gap-2 mb-1">
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
      <div className={`px-2 py-0.5 rounded text-white text-xs font-medium ${group.color} flex items-center gap-1`}>
        <span>{group.title}</span>
        <span className="bg-white/20 px-1 rounded text-xs">{group.count}</span>
      </div>
    </div>
  );
};

export default TaskGroupHeader;
