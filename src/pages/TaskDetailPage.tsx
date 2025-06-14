
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskDetail from '@/components/TaskDetail';
import { getTaskById, getTaskByTaskId } from '@/data/taskData';
import { getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { useTaskContext } from '@/contexts/TaskContext'; // Import useTaskContext
import { Task } from '@/types/task'; // Import Task type

const TaskDetailPage = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Ensure taskId is typed
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshTrigger } = useTaskContext(); // Get refreshTrigger from context

  // Get navigation state passed from previous page
  const { returnTo, returnToName, returnToTab } = location.state || {};

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    console.log('TaskDetailPage: useEffect triggered. taskId:', taskId, 'refreshTrigger:', refreshTrigger);
    let fetchedTask: Task | null = null;
    if (taskId) {
      if (taskId.startsWith('T')) {
        fetchedTask = getTaskByTaskId(taskId) || null;
      } else {
        // Fallback to numeric ID for backward compatibility
        const numericId = parseInt(taskId, 10);
        if (!isNaN(numericId)) {
          fetchedTask = getTaskById(numericId) || null;
        }
      }
    }
    setCurrentTask(fetchedTask);
    console.log('TaskDetailPage: fetched and set currentTask:', fetchedTask?.title, fetchedTask);
  }, [taskId, refreshTrigger]); // Re-run effect if taskId or refreshTrigger changes

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
    if (currentTask?.project) { // Use currentTask
      console.log('Navigating to project:', currentTask.project);
      const projectId = getProjectIdFromDisplayName(currentTask.project);
      console.log('Converted to project ID:', projectId);
      if (projectId) {
        navigate(`/project/${projectId}`);
      } else {
        console.warn(`Could not find project ID for display name: ${currentTask.project}`);
      }
    }
  };

  if (!currentTask) {
    // Can show a loading state or a more specific "task not found" after trying to load
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            {/* Optionally distinguish between loading and not found after fetch attempt */}
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
        {/* Content aligned with hamburger menu - pl-4 to align with hamburger position */}
        <div className="flex-1 min-h-0 pl-4 pr-4">
          <TaskDetail 
            isOpen={true} 
            onClose={handleBack}
            onProjectClick={handleProjectClick}
            task={currentTask} // Pass the state-managed currentTask
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;
