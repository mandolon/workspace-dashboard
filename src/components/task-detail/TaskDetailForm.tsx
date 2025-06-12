
import React from 'react';

interface TaskDetailFormProps {
  task: {
    project: string;
    title: string;
  };
}

const TaskDetailForm = ({ task }: TaskDetailFormProps) => {
  return (
    <div className="space-y-6">
      {/* Project and Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">📊 {task.project}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">2717 58th Street</span>
        </div>
        <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
          REDLINE / TO DO
        </div>
      </div>

      {/* Task Title */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Task Name</h1>
        <div className="text-lg text-muted-foreground mb-6">{task.title}</div>
      </div>

      {/* Add Description */}
      <div className="flex items-center gap-2 mb-8">
        <input type="checkbox" className="w-4 h-4" />
        <span className="text-sm text-muted-foreground">Add description</span>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <span>👤</span>
            Created by
          </label>
          <select className="w-full border border-border rounded px-3 py-2 text-sm bg-background">
            <option>Select User</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <span>📅</span>
            Date Created
          </label>
          <input 
            type="text" 
            value="Jan 6, 4 Weeks"
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background" 
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <span>👥</span>
            Assigned to
          </label>
          <select className="w-full border border-border rounded px-3 py-2 text-sm bg-background">
            <option>Select User</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <span>✅</span>
            Marked Complete
          </label>
          <input 
            type="date" 
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background" 
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailForm;
