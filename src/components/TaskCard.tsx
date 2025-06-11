
import React from 'react';
import { MoreHorizontal, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
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
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-accent/50 rounded-lg transition-colors group">
      {/* Checkbox and Task Info */}
      <div className="col-span-4 flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 rounded border-2" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground truncate">
            {task.title}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {task.project}
          </div>
        </div>
      </div>

      {/* Estimated Completion */}
      <div className="col-span-2 flex items-center text-sm text-muted-foreground">
        {task.estimatedCompletion}
      </div>

      {/* Files */}
      <div className="col-span-1 flex items-center">
        {task.hasAttachment && (
          <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
            <Paperclip className="w-3 h-3 text-orange-600" />
          </div>
        )}
      </div>

      {/* Date Created */}
      <div className="col-span-2 flex items-center text-sm text-muted-foreground">
        {task.dateCreated}
      </div>

      {/* Due Date */}
      <div className="col-span-2 flex items-center text-sm text-muted-foreground">
        {task.dueDate}
      </div>

      {/* Assignee */}
      <div className="col-span-1 flex items-center justify-end gap-1">
        <div className="flex items-center -space-x-1">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium",
            task.assignee.avatar
          )}>
            {task.assignee.name}
          </div>
          {task.collaborators?.map((collaborator, index) => (
            <div
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background",
                collaborator.avatar
              )}
            >
              {collaborator.name}
            </div>
          ))}
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
