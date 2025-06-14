
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskDetail from '@/components/TaskDetail';
import { getTaskById, getTaskByTaskId } from '@/data/taskData';
import { getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task';

const TaskDetailPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshTrigger, customTasks } = useTaskContext();

  const { returnTo, returnToName, returnToTab } = location.state || {};

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    // Find most up-to-date version from customTasks or fallback to backend data
    let fetchedTask: Task | null = null;
    if (taskId) {
      // Try to find in customTasks context first (these are most up-to-date)
      const taskFromCustom = customTasks.find(
        t => t.taskId === taskId || t.id === Number(taskId)
      );
      if (taskFromCustom) {
        fetchedTask = taskFromCustom;
      } else if (taskId.startsWith('T')) {
        fetchedTask = getTaskByTaskId(taskId) || null;
      } else {
        const numericId = parseInt(taskId, 10);
        if (!isNaN(numericId)) {
          fetchedTask = getTaskById(numericId) || null;
        }
      }
    }
    setCurrentTask(fetchedTask);
  }, [taskId, refreshTrigger, customTasks]);

  const handleBack = () => {
    if (returnTo) {
      navigate(returnTo, {
        state: {
          returnToTab: returnToTab
        }
      });
    } else {
      navigate('/tasks');
    }
  };

  const handleProjectClick = () => {
    if (currentTask?.project) {
      const projectId = getProjectIdFromDisplayName(currentTask.project);
      if (projectId) {
        navigate(`/project/${projectId}`);
      }
    }
  };

  if (!currentTask) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Loading task...</h2>
            <p className="text-muted-foreground">If this persists, the task may not exist.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 pl-4 pr-4">
          <TaskDetail 
            isOpen={true} 
            onClose={handleBack}
            onProjectClick={handleProjectClick}
            task={currentTask}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;
