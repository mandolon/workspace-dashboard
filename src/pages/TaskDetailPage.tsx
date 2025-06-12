
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskDetail from '@/components/TaskDetail';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('TaskDetailPage - taskId from URL:', taskId);

  // Get navigation state passed from previous page
  const { returnTo, returnToName, returnToTab } = location.state || {};

  // Mock task data with different project names based on task ID
  const getTaskData = (id: number) => {
    const taskProjects = {
      1: "Piner Haus Garage",
      2: "Adams • 1063 40th Street", 
      3: "Ogden-Thew • 2709 T Street",
      4: "Henderson • 1524 Tiverton"
    };

    const taskTitles = {
      1: "Planning set finalized, set up CD's",
      2: "Update - 12.27.23",
      3: "Update 12.9.23", 
      4: "Alternate Cabin Design"
    };

    return {
      id: id,
      title: taskTitles[id as keyof typeof taskTitles] || "Planning set finalized, set up CD's",
      project: taskProjects[id as keyof typeof taskProjects] || "Piner Haus Garage",
      estimatedCompletion: "—",
      dateCreated: "Jan 12, 2023",
      dueDate: "June 15",
      assignee: { name: "MP", avatar: "bg-blue-500" },
      hasAttachment: true,
      status: "REDLINE / TO DO"
    };
  };

  const task = getTaskData(parseInt(taskId || "1", 10));

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
    <AppLayout showHeader={false}>
      <div className="h-full flex flex-col">
        {/* Add proper spacing to align with hamburger menu */}
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
