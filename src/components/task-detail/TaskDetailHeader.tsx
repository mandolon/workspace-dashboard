
import React from 'react';

interface TaskDetailHeaderProps {
  task: {
    project: string;
  };
  onClose: () => void;
}

const TaskDetailHeader = ({ task, onClose }: TaskDetailHeaderProps) => {
  return (
    <div className="border-b border-border p-4 flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-muted-foreground">{task.project}</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            REDLINE / TO DO
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailHeader;
