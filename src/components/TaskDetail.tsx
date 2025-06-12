
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
    <div className="h-full bg-background border-l border-border flex flex-col">
      <TaskDetailHeader task={task} onClose={onClose} />

      <div className="flex-1 overflow-auto">
        <TaskDetailForm task={task} />
        <TaskDetailAttachments />
        <TaskDetailActivity />
      </div>
    </div>
  );
};

export default TaskDetail;
