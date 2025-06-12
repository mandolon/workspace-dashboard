
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TaskBoard from '@/components/TaskBoard';
import PageHeader from '@/components/shared/PageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={15} 
          minSize={15} 
          maxSize={35}
          collapsedSize={4}
          collapsible={true}
          onCollapse={() => setSidebarCollapsed(true)}
          onExpand={() => setSidebarCollapsed(false)}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            <PageHeader 
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
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
