
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TaskDetail from '@/components/TaskDetail';
import PageHeader from '@/components/shared/PageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          key={sidebarCollapsed ? 'collapsed' : 'expanded'}
          defaultSize={sidebarCollapsed ? 4 : 15} 
          minSize={sidebarCollapsed ? 4 : 15} 
          maxSize={sidebarCollapsed ? 4 : 35}
          className="min-h-screen"
          collapsible={true}
          onCollapse={() => setSidebarCollapsed(true)}
          onExpand={() => setSidebarCollapsed(false)}
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={sidebarCollapsed ? 96 : 85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            <PageHeader 
              onToggleSidebar={handleToggleSidebar}
            />

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
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TaskDetailPage;
