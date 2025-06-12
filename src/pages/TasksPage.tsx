
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskBoard from '@/components/TaskBoard';

const TasksPage = () => {
  return (
    <AppLayout>
      <TaskBoard />
    </AppLayout>
  );
};

export default TasksPage;
