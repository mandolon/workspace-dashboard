
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
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
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={false} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            <div className="border-b border-border px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">Dashboard</span>
              </div>
            </div>

            <div className="flex-1 bg-background pl-2">
              <div className="h-full flex flex-col">
                <DashboardPageHeader activeTab={activeTab} onTabChange={handleTabChange} />
                <div className="flex-1 p-4 overflow-y-auto">
                  <DashboardContent />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Dashboard;
