
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskBoard from '@/components/TaskBoard';
import { TaskProvider } from '@/contexts/TaskContext';

const TasksPage = React.memo(() => {
  return (
    <AppLayout>
      <TaskProvider>
        <TaskBoard />
      </TaskProvider>
    </AppLayout>
  );
});

TasksPage.displayName = "TasksPage";
export default TasksPage;
