
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskBoard from '@/components/TaskBoard';

const TasksPage = React.memo(() => {
  return (
    <AppLayout>
      <TaskBoard />
    </AppLayout>
  );
});

TasksPage.displayName = "TasksPage";
export default TasksPage;
