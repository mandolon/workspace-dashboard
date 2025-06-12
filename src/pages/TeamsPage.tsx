
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PageHeader from '@/components/shared/PageHeader';
import TeamsHeader from '@/components/teams/TeamsHeader';
import TeamsContent from '@/components/teams/TeamsContent';

const TeamsPage = () => {
  console.log('TeamsPage component is rendering');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                <TeamsHeader />
                <TeamsContent />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TeamsPage;
