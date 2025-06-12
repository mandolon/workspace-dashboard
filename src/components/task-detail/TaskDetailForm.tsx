import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TaskDetailFormProps {
  task: {
    project: string;
    title: string;
  };
}

const TaskDetailForm = ({ task }: TaskDetailFormProps) => {
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

      {/* Form Fields */}
      <div className="grid grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground flex items-center gap-1">
            <span>👤</span>
            Created by
          </label>
          <select className="w-full border border-border rounded px-2 py-1 text-xs bg-background">
            <option>Select User</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground flex items-center gap-1">
            <span>📅</span>
            Date Created
          </label>
          <input 
            type="text" 
            value="Jan 6, 4 Weeks"
            className="w-full border border-border rounded px-2 py-1 text-xs bg-background" 
            readOnly
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground flex items-center gap-1">
            <span>👥</span>
            Assigned to
          </label>
          <select className="w-full border border-border rounded px-2 py-1 text-xs bg-background">
            <option>Select User</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground flex items-center gap-1">
            <span>✅</span>
            Marked Complete
          </label>
          <input 
            type="date" 
            className="w-full border border-border rounded px-2 py-1 text-xs bg-background" 
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailForm;
