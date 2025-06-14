
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
    <div className="flex items-center gap-2 mb-2">
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
      <div className={`px-2 py-0.5 rounded text-white text-xs font-medium ${group.color}`}>
        {group.title}
      </div>
    </div>
  );
};

export default TaskGroupHeader;
