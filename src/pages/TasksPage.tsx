
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskBoardNew from '@/components/TaskBoardNew';

const TasksPage = React.memo(() => {
  return (
    <AppLayout>
      <div className="h-full flex flex-col overflow-hidden">
        <TaskBoardNew />
      </div>
    </AppLayout>
  );
});

TasksPage.displayName = "TasksPage";
export default TasksPage;

