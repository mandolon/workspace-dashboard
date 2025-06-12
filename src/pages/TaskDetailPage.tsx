
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskDetail from '@/components/TaskDetail';
import { getTaskById } from '@/data/taskData';
import { getProjectDisplayName } from '@/data/projectClientData';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('TaskDetailPage - taskId from URL:', taskId);

  // Get navigation state passed from previous page
  const { returnTo, returnToName, returnToTab } = location.state || {};

  // Get task data using the proper data structure
  const taskData = getTaskById(parseInt(taskId || "1", 10));
  
  if (!taskData) {
    console.error('Task not found for ID:', taskId);
    navigate('/tasks');
    return null;
  }

  // Build the proper task object with project display name
  const task = {
    ...taskData,
    project: getProjectDisplayName(taskData.projectId)
  };

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
