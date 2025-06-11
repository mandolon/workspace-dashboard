import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskGroup from './TaskGroup';
import TaskDialog from './TaskDialog';
import TaskDetail from './TaskDetail';

const TaskBoard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const mockTasks = [
    {
      id: '1',
      name: 'Update - 12.27.23',
      project: 'Piner Haus Garage',
      status: 'redline',
      assignedTo: 'MH',
      dueDate: '2023-12-27',
      hasAttachment: true,
    },
    {
      id: '2',
      name: 'Update - 12.27.23',
      project: 'Rathbun - USFS Cabin',
      status: 'progress',
      assignedTo: 'AL',
      dueDate: '2023-12-27',
      hasAttachment: false,
    },
    {
      id: '3',
      name: 'Update - 12.27.23',
      project: 'Ogden - Thew - 2709 T Street',
      status: 'completed',
      assignedTo: 'MP',
      dueDate: '2023-12-27',
      hasAttachment: true,
    },
    {
      id: '4',
      name: 'Update - 12.27.23',
      project: 'Adams - 1063 40th Street',
      status: 'redline',
      assignedTo: 'MH',
      dueDate: '2023-12-27',
      hasAttachment: false,
    },
    {
      id: '5',
      name: 'Update - 12.27.23',
      project: 'Piner Haus Garage',
      status: 'progress',
      assignedTo: 'AL',
      dueDate: '2023-12-27',
      hasAttachment: true,
    },
    {
      id: '6',
      name: 'Update - 12.27.23',
      project: 'Rathbun - USFS Cabin',
      status: 'completed',
      assignedTo: 'MP',
      dueDate: '2023-12-27',
      hasAttachment: false,
    },
    {
      id: '7',
      name: 'Update - 12.27.23',
      project: 'Ogden - Thew - 2709 T Street',
      status: 'redline',
      assignedTo: 'MH',
      dueDate: '2023-12-27',
      hasAttachment: true,
    },
    {
      id: '8',
      name: 'Update - 12.27.23',
      project: 'Adams - 1063 40th Street',
      status: 'progress',
      assignedTo: 'AL',
      dueDate: '2023-12-27',
      hasAttachment: false,
    },
    {
      id: '9',
      name: 'Update - 12.27.23',
      project: 'Piner Haus Garage',
      status: 'completed',
      assignedTo: 'MP',
      dueDate: '2023-12-27',
      hasAttachment: true,
    },
  ];

  const groupedTasks = mockTasks.reduce((acc, task) => {
    (acc[task.status] = acc[task.status] || []).push(task);
    return acc;
  }, {});

  const handleCreateTask = (taskData: any) => {
    console.log('Creating task:', taskData);
    // Handle task creation logic here
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const handleBackToBoard = () => {
    setSelectedTask(null);
  };

  if (selectedTask) {
    return <TaskDetail task={selectedTask} onBack={handleBackToBoard} />;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Task Board</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Task
        </button>
      </div>

      {/* Task Groups */}
      <div className="flex gap-6 overflow-x-auto">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <TaskGroup
            key={status}
            title={status}
            tasks={tasks}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default TaskBoard;
