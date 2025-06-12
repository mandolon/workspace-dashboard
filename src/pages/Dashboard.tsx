
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Dashboard = () => {
  console.log('🔥 Dashboard component rendering');
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔥 Dashboard useEffect running - component mounted');
    console.log('🔥 Current URL:', window.location.href);
    console.log('🔥 Current pathname:', window.location.pathname);
    console.log('🔥 Location object:', location);
    document.title = 'Dashboard';
    
    // Set up a timer to log every second for debugging
    const debugTimer = setInterval(() => {
      console.log('🔥 Dashboard still alive at:', new Date().toISOString());
      console.log('🔥 Current location at timer:', window.location.pathname);
    }, 1000);
    
    // Listen for any navigation events
    const handlePopState = (event: PopStateEvent) => {
      console.log('🔥 PopState event detected:', event);
      console.log('🔥 New pathname after popstate:', window.location.pathname);
    };
    
    const handleHashChange = () => {
      console.log('🔥 Hash change detected:', window.location.hash);
    };
    
    const handleBeforeUnload = () => {
      console.log('🔥 Page is about to unload');
    };
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup function to detect when component unmounts
    return () => {
      console.log('🔥 Dashboard component is UNMOUNTING - this tells us why it disappears');
      console.log('🔥 Unmounting at URL:', window.location.pathname);
      console.log('🔥 Unmounting at time:', new Date().toISOString());
      clearInterval(debugTimer);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log('🔥 Dashboard activeTab changed to:', activeTab);
  }, [activeTab]);

  useEffect(() => {
    console.log('🔥 Location changed in Dashboard:', location.pathname);
    console.log('🔥 Full location object:', location);
    console.log('🔥 Location change timestamp:', new Date().toISOString());
  }, [location]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
  };

  const handleSearchChange = (value: string) => {
    console.log('🔥 Search input changed:', value);
    console.log('🔥 Current location after search change:', location.pathname);
    console.log('🔥 Window location after search change:', window.location.pathname);
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
                    onChange={(e) => handleSearchChange(e.target.value)}
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
