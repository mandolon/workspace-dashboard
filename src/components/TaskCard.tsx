
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
  const getRandomColor = (id: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    // Use a hash of the name to consistently assign the same color
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

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
            <Paperclip className="w-3 h-3 text-orange-600" strokeWidth="2" />
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
            getRandomColor(task.assignee.name)
          )}>
            {task.assignee.name}
          </div>
          {task.collaborators?.map((collaborator, index) => (
            <div
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background",
                getRandomColor(collaborator.name)
              )}
            >
              {collaborator.name}
            </div>
          ))}
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" strokeWidth="2" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
