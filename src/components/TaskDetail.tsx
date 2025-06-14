import React from 'react';
import TaskDetailHeader from './task-detail/TaskDetailHeader';
import TaskDetailForm from './task-detail/TaskDetailForm';
import TaskDetailAttachments from './task-detail/TaskDetailAttachments';
import TaskDetailActivity from './task-detail/TaskDetailActivity';
import { Task } from '@/types/task';

interface TaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectClick?: () => void;
  task: Task | null;
}

const TaskDetail = ({ isOpen, onClose, onProjectClick, task }: TaskDetailProps) => {
  if (!task || !isOpen) return null;

  return (
    <div className="h-full bg-background flex flex-col max-w-none">
      <TaskDetailHeader task={task} onClose={onClose} onProjectClick={onProjectClick} />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="max-w-4xl mx-auto p-3 space-y-4">
            <TaskDetailForm task={task} />
            <TaskDetailAttachments />
          </div>
        </div>

        {/* Activity Sidebar - smaller proportionally scaling width */}
        <div className="w-[25vw] min-w-[280px] max-w-[600px] border-l border-border flex-shrink-0">
          <TaskDetailActivity />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
