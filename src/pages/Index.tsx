
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TaskBoard from '@/components/TaskBoard';
import PageHeader from '@/components/shared/PageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={sidebarCollapsed ? 4 : 15} 
          minSize={4} 
          maxSize={sidebarCollapsed ? 4 : 35}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={sidebarCollapsed ? 96 : 85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            <PageHeader 
              onToggleSidebar={handleToggleSidebar}
            />
            <div className="flex-1 overflow-hidden">
              <TaskBoard />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster />
    </div>
  );
};

export default Index;
