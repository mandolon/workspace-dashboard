
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
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
      <div className="flex-1 bg-background p-4">
        <div className="h-full flex flex-col max-w-6xl mx-auto">
          <div className="mb-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{returnToName || 'Back to Tasks'}</span>
            </button>
          </div>
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
