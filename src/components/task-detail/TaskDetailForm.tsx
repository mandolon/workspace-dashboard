
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useUser } from '@/contexts/UserContext';

interface TaskDetailFormProps {
  task: {
    project: string;
    title: string;
    createdBy: string;
    createdAt: string;
  };
}

const TaskDetailForm = ({ task }: TaskDetailFormProps) => {
  const { currentUser } = useUser();

  // Debug log to force component refresh
  console.log('TaskDetailForm rendering with task:', task.title);

  const formatCreatedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const getCreatedByName = (createdBy: string) => {
    // Map initials to full name using current user context
    if (createdBy === "AL" || createdBy === currentUser.name) {
      return currentUser.name;
    }
    // Fallback to showing the initials if no mapping found
    return createdBy;
  };

  return (
    <div className="space-y-3">
      {/* Task Title with Status Badge - centered alignment */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{task.title}</h1>
        <div className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">
          REDLINE / TO DO
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Description</label>
        <Textarea 
          placeholder="Add description..."
          className="min-h-[80px] text-xs"
        />
      </div>

      {/* Form Fields - Plain text values without containers */}
      <div className="grid grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Created by
          </label>
          <div className="text-xs">
            {getCreatedByName(task.createdBy)}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Date Created
          </label>
          <div className="text-xs">
            {formatCreatedDate(task.createdAt)}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Assigned to
          </label>
          <div className="text-xs text-muted-foreground">
            Select User
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Marked Complete
          </label>
          <div className="text-xs text-muted-foreground">
            —
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailForm;
