
import React from 'react';

const TasksTabHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
      <div className="col-span-6">Name</div>
      <div className="col-span-2">Date Created</div>
      <div className="col-span-2">Assigned to</div>
      <div className="col-span-2"></div>
    </div>
  );
};

export default TasksTabHeader;
