
import React from 'react';

interface TaskDetailFormProps {
  task: {
    project: string;
    title: string;
  };
}

const TaskDetailForm = ({ task }: TaskDetailFormProps) => {
  return (
    <div className="p-4 border-b border-border">
      <div className="text-sm text-muted-foreground mb-1">{task.project}</div>
      <h2 className="text-lg font-semibold mb-4">{task.title}</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" className="w-4 h-4" />
        <span className="text-sm text-muted-foreground">Add description</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="text-muted-foreground">Created by</label>
          <select className="w-full border border-border rounded px-2 py-1 mt-1">
            <option>Select User</option>
          </select>
        </div>
        <div>
          <label className="text-muted-foreground">Date Created</label>
          <input type="date" className="w-full border border-border rounded px-2 py-1 mt-1" />
        </div>
        <div>
          <label className="text-muted-foreground">Assigned to</label>
          <select className="w-full border border-border rounded px-2 py-1 mt-1">
            <option>Select User</option>
          </select>
        </div>
        <div>
          <label className="text-muted-foreground">Mark Complete</label>
          <input type="date" className="w-full border border-border rounded px-2 py-1 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailForm;
