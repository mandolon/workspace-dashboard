
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TaskDetail from '@/components/TaskDetail';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('TaskDetailPage - taskId from URL:', taskId);

  // Get navigation state passed from previous page
  const { returnTo, returnToName } = location.state || {};

  // Mock task data - in a real app this would come from an API or context
  const task = {
    id: taskId || "1",
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
      // Navigate back to the specific page we came from
      navigate(returnTo);
    } else {
      // Fallback to tasks page if no return path is specified
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={15} minSize={15} maxSize={35}>
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={false} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85}>
          <div className="h-screen overflow-hidden flex flex-col">
            {/* Top Bar */}
            <div className="border-b border-border p-4 flex items-center gap-2">
              <button 
                onClick={handleBack}
                className="p-1 hover:bg-accent rounded flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">
                  {returnToName || 'Back to Tasks'}
                </span>
              </button>
            </div>

            {/* Task Detail Content */}
            <div className="flex-1 overflow-hidden">
              <TaskDetail 
                isOpen={true} 
                onClose={handleBack}
                task={task} 
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TaskDetailPage;
