
import React from 'react';
import TaskDetailHeader from './task-detail/TaskDetailHeader';
import TaskDetailForm from './task-detail/TaskDetailForm';
import TaskDetailAttachments from './task-detail/TaskDetailAttachments';
import TaskDetailActivity from './task-detail/TaskDetailActivity';

interface TaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: number;
    title: string;
    project: string;
    estimatedCompletion: string;
    dateCreated: string;
    dueDate: string;
    assignee: {
      name: string;
      avatar: string;
    };
    hasAttachment: boolean;
    collaborators?: Array<{
      name: string;
      avatar: string;
    }>;
  } | null;
}

const TaskDetail = ({ isOpen, onClose, task }: TaskDetailProps) => {
  if (!task || !isOpen) return null;

  return (
    <div className="h-full bg-background flex flex-col max-w-none">
      <TaskDetailHeader task={task} onClose={onClose} />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            <TaskDetailForm task={task} />
            <TaskDetailAttachments />
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="w-80 border-l border-border flex-shrink-0">
          <TaskDetailActivity />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
