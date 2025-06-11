
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDialog from './TaskDialog';
import TaskBoardHeader from './TaskBoardHeader';
import TaskBoardFilters from './TaskBoardFilters';
import TaskGroupSection from './TaskGroupSection';
import { ScrollArea } from '@/components/ui/scroll-area';

const TaskBoard = () => {
  const navigate = useNavigate();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [customTasks, setCustomTasks] = useState<any[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);

  const defaultTaskGroups = [
    {
      title: "TASK/ REDLINE",
      count: 1,
      color: "bg-red-500",
      status: "redline",
      tasks: [
        {
          id: 1,
          title: "Planning set finalized, set up CD's",
          project: "Piner Haus Garage",
          estimatedCompletion: "—",
          dateCreated: "8/10/22",
          dueDate: "—",
          assignee: { name: "MH", avatar: "bg-purple-500" },
          hasAttachment: true,
          status: "redline"
        }
      ]
    },
    {
      title: "PROGRESS/ UPDATE",
      count: 3,
      color: "bg-blue-500",
      status: "progress",
      tasks: [
        {
          id: 2,
          title: "Update - 12.27.23",
          project: "Rathbun - USFS Cabin",
          estimatedCompletion: "—",
          dateCreated: "12/27/23",
          dueDate: "—",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: true,
          collaborators: [{ name: "MP", avatar: "bg-green-500" }],
          status: "progress"
        },
        {
          id: 3,
          title: "Update 12.9.23",
          project: "Ogden - Thew - 2709 T Street",
          estimatedCompletion: "—",
          dateCreated: "12/9/23",
          dueDate: "—",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: true,
          status: "progress"
        },
        {
          id: 4,
          title: "Alternate Cabin Design",
          project: "Rathbun - USFS Cabin",
          estimatedCompletion: "—",
          dateCreated: "9/13/23",
          dueDate: "9/22/23, 5...",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: false,
          status: "progress"
        }
      ]
    }
  ];

  // Combine default tasks with custom tasks and group by status
  const getTaskGroups = () => {
    const allTasks = [...defaultTaskGroups.flatMap(group => group.tasks), ...customTasks];
    
    const groupedTasks = {
      redline: allTasks.filter(task => task.status === 'redline'),
      progress: allTasks.filter(task => task.status === 'progress'),
      completed: allTasks.filter(task => task.status === 'completed')
    };

    const taskGroups = [];

    if (groupedTasks.redline.length > 0) {
      taskGroups.push({
        title: "TASK/ REDLINE",
        count: groupedTasks.redline.length,
        color: "bg-red-500",
        status: "redline",
        tasks: groupedTasks.redline
      });
    }

    if (groupedTasks.progress.length > 0) {
      taskGroups.push({
        title: "PROGRESS/ UPDATE",
        count: groupedTasks.progress.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: groupedTasks.progress
      });
    }

    if (groupedTasks.completed.length > 0) {
      taskGroups.push({
        title: "COMPLETED",
        count: groupedTasks.completed.length,
        color: "bg-green-500",
        status: "completed",
        tasks: groupedTasks.completed
      });
    }

    return taskGroups;
  };

  const handleCreateTask = (taskData: any) => {
    console.log('Creating task:', taskData);
    setCustomTasks(prev => [taskData, ...prev]);
  };

  const handleQuickAddSave = (taskData: any) => {
    handleCreateTask(taskData);
    setShowQuickAdd(null);
  };

  const handleTaskClick = (task: any) => {
    navigate(`/task/${task.id}`);
  };

  const taskGroups = getTaskGroups();

  return (
    <div className="flex-1 bg-background pl-2">
      <div className="h-full flex flex-col">
        <TaskBoardHeader />
        <TaskBoardFilters onAddTask={() => setIsTaskDialogOpen(true)} />

        {/* Task Groups with ScrollArea */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {taskGroups.map((group, groupIndex) => (
              <TaskGroupSection
                key={groupIndex}
                group={group}
                showQuickAdd={showQuickAdd}
                onSetShowQuickAdd={setShowQuickAdd}
                onQuickAddSave={handleQuickAddSave}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default TaskBoard;
