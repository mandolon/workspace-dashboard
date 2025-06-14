
import React from 'react';

const TasksTabHeader = () => {
  return (
    <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-1.5 border-b">
      <div className="col-span-6">Name</div>
      <div className="col-span-2 text-center">Files</div>
      <div className="col-span-2 text-center">Date Created</div>
      <div className="col-span-2 text-center">Assigned to</div>
    </div>
  );
};

export default TasksTabHeader;
