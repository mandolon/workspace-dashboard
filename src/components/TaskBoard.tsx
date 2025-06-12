
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDialog from './TaskDialog';
import TaskBoardHeader from './TaskBoardHeader';
import TaskBoardFilters from './TaskBoardFilters';
import TaskGroupSection from './TaskGroupSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { defaultTasks, Task } from '@/data/taskData';
import { getProjectDisplayName } from '@/data/projectClientData';

const TaskBoard = () => {
  const navigate = useNavigate();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);

  // Combine default tasks with custom tasks and group by status, excluding archived tasks
  const getTaskGroups = () => {
    const allTasks = [...defaultTasks, ...customTasks]
      .filter(task => !task.archived)
      .map(task => ({
        ...task,
        project: getProjectDisplayName(task.projectId)
      }));
    
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
    
    // Create new task with proper structure
    const newTask: Task = {
      id: Date.now(),
      title: taskData.title,
      projectId: taskData.projectId || 'unknown',
      estimatedCompletion: taskData.estimatedCompletion || '—',
      dateCreated: taskData.dateCreated,
      dueDate: taskData.dueDate || '—',
      assignee: taskData.assignee,
      hasAttachment: taskData.hasAttachment || false,
      collaborators: taskData.collaborators || [],
      status: taskData.status,
      archived: false
    };
    
    setCustomTasks(prev => [newTask, ...prev]);
  };

  const handleQuickAddSave = (taskData: any) => {
    handleCreateTask(taskData);
    setShowQuickAdd(null);
  };

  const handleTaskClick = (task: any) => {
    navigate(`/task/${task.id}`);
  };

  const handleTaskArchive = (taskId: number) => {
    // Find the task in either default tasks or custom tasks
    const allTasks = [...defaultTasks, ...customTasks];
    const taskToArchive = allTasks.find(task => task.id === taskId);
    
    if (taskToArchive) {
      // Add to archived tasks
      setArchivedTasks(prev => [...prev, { ...taskToArchive, archived: true }]);
      
      // Remove from custom tasks if it exists there
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
