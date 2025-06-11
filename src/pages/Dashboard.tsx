
import React from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardContent from '@/components/dashboard/DashboardContent';
import NotesTab from '@/components/dashboard/NotesTab';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <DashboardStats />
            <DashboardContent />
          </>
        );
      case 'notes':
        return <NotesTab />;
      case 'tasks':
        return (
          <div className="p-4">
            <p className="text-muted-foreground">Tasks tab content coming soon...</p>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-4">
            <p className="text-muted-foreground">Calendar tab content coming soon...</p>
          </div>
        );
      default:
        return (
          <>
            <DashboardStats />
            <DashboardContent />
          </>
        );
    }
  };

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
          <div className="flex flex-col h-screen pl-2">
            <DashboardHeader 
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
            />

            <DashboardPageHeader 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="flex-1 overflow-auto">
              {activeTab === 'overview' ? (
                <div className="p-4 space-y-4">
                  {renderTabContent()}
                </div>
              ) : (
                renderTabContent()
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Dashboard;
