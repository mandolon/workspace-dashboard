
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PageHeader from '@/components/shared/PageHeader';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectTabs from '@/components/project/ProjectTabs';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Convert URL-friendly projectId back to display name
  const getProjectName = (id: string | undefined) => {
    const projectMap: Record<string, string> = {
      'ogden-thew-2709-t-street': 'Ogden - Thew - 2709 T Street',
      'adams-1063-40th-street': 'Adams - 1063 40th Street',
      'tiverton': '1524 Tiverton',
      'i-street': '2015 10th Street',
    };
    return projectMap[id || ''] || 'Unknown Project';
  };

  const projectName = getProjectName(projectId);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          key={sidebarCollapsed ? 'collapsed' : 'expanded'}
          defaultSize={sidebarCollapsed ? 4 : 15} 
          minSize={4} 
          maxSize={35}
          className="min-h-screen"
          collapsible={true}
          collapsedSize={4}
          onCollapse={() => {
            console.log('Panel auto-collapsed');
            setSidebarCollapsed(true);
          }}
          onExpand={() => {
            console.log('Panel auto-expanded');
            setSidebarCollapsed(false);
          }}
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

            <div className="flex-1 bg-background p-4">
              <div className="h-full flex flex-col max-w-6xl mx-auto">
                <ProjectHeader projectName={projectName} />
                <ProjectTabs projectName={projectName} />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProjectPage;
