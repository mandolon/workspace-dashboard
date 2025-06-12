
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Dashboard = () => {
  console.log('🔥 Dashboard component rendering');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log('🔥 Dashboard useEffect running - component mounted');
    console.log('🔥 Current URL:', window.location.href);
    console.log('🔥 Current pathname:', window.location.pathname);
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
            {/* Top Bar */}
            <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0">
              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <Menu className="w-4 h-4" />
              </button>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="relative max-w-md w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
                  New
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
                  Upgrade
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
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
