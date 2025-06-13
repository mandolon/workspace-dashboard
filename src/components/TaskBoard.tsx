
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDialog from './TaskDialog';
import TaskBoardHeader from './TaskBoardHeader';
import TaskBoardFilters from './TaskBoardFilters';
import TaskGroupSection from './TaskGroupSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTasksByStatus, addTask } from '@/data/taskData';
import { Task, TaskGroup } from '@/types/task';

const TaskBoard = () => {
  const navigate = useNavigate();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);

  // Get task groups using centralized data
  const getTaskGroups = (): TaskGroup[] => {
    const redlineTasks = [...getTasksByStatus('redline'), ...customTasks.filter(task => task.status === 'redline' && !task.archived)];
    const progressTasks = [...getTasksByStatus('progress'), ...customTasks.filter(task => task.status === 'progress' && !task.archived)];
    const completedTasks = [...getTasksByStatus('completed'), ...customTasks.filter(task => task.status === 'completed' && !task.archived)];

    const taskGroups: TaskGroup[] = [];

    if (redlineTasks.length > 0) {
      taskGroups.push({
        title: "TASK/ REDLINE",
        count: redlineTasks.length,
        color: "bg-red-500",
        status: "redline",
        tasks: redlineTasks
      });
    }

    if (progressTasks.length > 0) {
      taskGroups.push({
        title: "PROGRESS/ UPDATE",
        count: progressTasks.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: progressTasks
      });
    }

    if (completedTasks.length > 0) {
      taskGroups.push({
        title: "COMPLETED",
        count: completedTasks.length,
        color: "bg-green-500",
        status: "completed",
        tasks: completedTasks
      });
    }

    return taskGroups;
  };

  const handleCreateTask = (taskData: any) => {
    console.log('Creating task:', taskData);
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      projectId: taskData.projectId || 'unknown-project',
      project: taskData.project || 'Unknown Project'
    };
    setCustomTasks(prev => [newTask, ...prev]);
  };

  const handleQuickAddSave = (taskData: any) => {
    handleCreateTask(taskData);
    setShowQuickAdd(null);
  };

  const handleTaskClick = (task: Task) => {
    // Use TaskID for navigation
    navigate(`/task/${task.taskId}`);
  };

  const handleTaskArchive = (taskId: number) => {
    // Find the task in custom tasks
    const taskToArchive = customTasks.find(task => task.id === taskId);
    
    if (taskToArchive) {
      // Add to archived tasks
      setArchivedTasks(prev => [...prev, { ...taskToArchive, archived: true }]);
      
      // Remove from custom tasks
      setCustomTasks(prev => prev.filter(task => task.id !== taskId));
      
      console.log(`Task ${taskId} archived and moved to project folder`);
    }
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
                onTaskArchive={handleTaskArchive}
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
