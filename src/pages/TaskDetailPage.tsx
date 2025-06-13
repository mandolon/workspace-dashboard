
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskDetail from '@/components/TaskDetail';
import { getTaskById, getTaskByTaskId } from '@/data/taskData';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('TaskDetailPage - taskId from URL:', taskId);

  // Get navigation state passed from previous page
  const { returnTo, returnToName, returnToTab } = location.state || {};

  // Get task from centralized data store - support both numeric IDs and TaskIDs
  let task = null;
  if (taskId) {
    // Check if it's a TaskID format (starts with T)
    if (taskId.startsWith('T')) {
      task = getTaskByTaskId(taskId);
    } else {
      // Fallback to numeric ID for backward compatibility
      task = getTaskById(parseInt(taskId, 10));
    }
  }

  console.log('TaskDetailPage - selected task:', task);

  const handleBack = () => {
    if (returnTo) {
      // Navigate back to the specific page we came from, preserving the tab state
      navigate(returnTo, {
        state: {
          returnToTab: returnToTab
        }
      });
    } else {
      // Fallback to tasks page if no return path is specified
      navigate('/tasks');
    }
  };

  if (!task) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Task not found</h2>
            <p className="text-muted-foreground">The task you're looking for doesn't exist.</p>
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
            task={task} 
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;
