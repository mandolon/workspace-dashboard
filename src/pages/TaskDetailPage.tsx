
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskBoard from '@/components/TaskBoard';
import TaskDetail from '@/components/TaskDetail';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('TaskDetailPage - taskId from URL:', taskId);

  // Get navigation state passed from previous page
  const { returnTo, returnToName, returnToTab } = location.state || {};

  // Mock task data - in a real app this would come from an API or context
  const task = {
    id: parseInt(taskId || "1", 10),
    title: "Planning set finalized, set up CD's",
    project: "Piner Haus Garage",
    estimatedCompletion: "—",
    dateCreated: "Jan 12, 2023",
    dueDate: "June 15",
    assignee: { name: "MP", avatar: "bg-blue-500" },
    hasAttachment: true,
    status: "REDLINE / TO DO"
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
      <div className="h-full flex">
        {/* Main content area - TaskBoard */}
        <div className="flex-1 min-w-0">
          <TaskBoard />
        </div>
        
        {/* Task detail panel on the right */}
        <div className="w-96 flex-shrink-0">
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
