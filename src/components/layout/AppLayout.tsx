
import React, { ReactNode } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useSidebarContext } from '@/contexts/SidebarContext';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/shared/PageHeader';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isCollapsed, isHidden, toggleSidebar, setSidebarHidden } = useSidebarContext();

  const handleResize = (sizes: number[]) => {
    const sidebarSize = sizes[0];
    console.log('Sidebar resize:', sidebarSize);
    
    // If sidebar is dragged below 8% of screen width, hide it completely
    if (sidebarSize < 8) {
      console.log('Hiding sidebar due to small size');
      setSidebarHidden(true);
    }
  };

  // If sidebar is hidden, don't render the resizable panels
  if (isHidden) {
    return (
      <div className="min-h-screen w-full bg-background flex">
        {/* Main Content when sidebar is hidden */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <PageHeader onToggleSidebar={toggleSidebar} />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // If sidebar is collapsed (icon mode), don't make it resizable
  if (isCollapsed) {
    return (
      <div className="min-h-screen w-full bg-background flex">
        {/* Sidebar */}
        <div className="w-16 flex-shrink-0 h-screen overflow-hidden bg-sidebar border-r border-sidebar-border">
          <Sidebar isCollapsed={true} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <PageHeader onToggleSidebar={toggleSidebar} />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Resizable layout when sidebar is expanded
  return (
    <div className="min-h-screen w-full bg-background">
      <PanelGroup 
        direction="horizontal" 
        onLayout={handleResize}
        autoSaveId="sidebar-layout"
      >
        {/* Resizable Sidebar Panel */}
        <Panel 
          defaultSize={20} 
          minSize={8}
          maxSize={40}
          className="h-screen overflow-hidden"
          collapsible={true}
          onCollapse={() => {
            console.log('Panel collapsed');
            setSidebarHidden(true);
          }}
        >
          <div className="h-full bg-sidebar border-r border-sidebar-border">
            <Sidebar isCollapsed={false} />
          </div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-sidebar-border hover:bg-blue-500 transition-colors duration-200" />

        {/* Main Content Panel */}
        <Panel minSize={60} className="h-screen overflow-hidden">
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <PageHeader onToggleSidebar={toggleSidebar} />
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default AppLayout;
