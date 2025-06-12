
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Dashboard = () => {
  console.log('🔥 Dashboard component is DEFINITELY rendering now!');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log('🔥 Dashboard useEffect running - component mounted');
    document.title = 'Dashboard - SHOULD BE VISIBLE';
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
  };
  
  return (
    <div 
      className="min-h-screen w-full bg-red-600 flex"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'red !important'
      }}
    >
      <div 
        className="bg-yellow-500 p-8 text-black text-2xl font-bold"
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          border: '5px solid black'
        }}
      >
        🚨 DASHBOARD IS RENDERING - YOU SHOULD SEE THIS! 🚨
      </div>
      
      {/* Original content but with extreme visibility */}
      <div className="bg-blue-500 p-4 text-white text-xl">DEBUG: This should be visible as a blue box</div>
      
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={15} 
          minSize={15} 
          maxSize={35}
          collapsedSize={4}
          collapsible={true}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden bg-purple-500">
            <div className="bg-green-500 p-4 text-white">SIDEBAR AREA</div>
            <Sidebar isCollapsed={false} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85} className="min-h-screen">
          <div className="flex flex-col h-screen bg-orange-500">
            <div className="bg-cyan-500 p-4 text-black text-xl">DEBUG: Main content area</div>
            
            {/* Top Bar */}
            <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0 bg-pink-500">
              <button className="p-2 hover:bg-accent rounded-md transition-colors bg-white">
                <Menu className="w-4 h-4" />
              </button>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="relative max-w-md w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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
            <div className="flex-1 overflow-hidden bg-lime-400">
              <div className="h-full flex flex-col">
                <div className="bg-red-300 p-2 text-black">DEBUG: Before DashboardPageHeader</div>
                <DashboardPageHeader activeTab={activeTab} onTabChange={handleTabChange} />
                <div className="bg-yellow-300 p-2 text-black">DEBUG: After DashboardPageHeader</div>
                <div className="flex-1 p-4 overflow-y-auto bg-blue-300">
                  <div className="bg-green-300 p-4 text-black">DEBUG: Before DashboardContent</div>
                  <DashboardContent />
                  <div className="bg-purple-300 p-4 text-black">DEBUG: After DashboardContent</div>
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
