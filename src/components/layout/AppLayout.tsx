
import React, { ReactNode } from 'react';
import { useSidebarContext } from '@/contexts/SidebarContext';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/shared/PageHeader';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isCollapsed, toggleSidebar } = useSidebarContext();

  return (
    <div className="min-h-screen w-full bg-background flex">
      {/* Sidebar */}
      <div className={`
        ${isCollapsed ? 'w-16' : 'w-64'} 
        transition-all duration-300 ease-in-out 
        flex-shrink-0 
        h-screen 
        overflow-hidden
        bg-sidebar 
        border-r 
        border-sidebar-border
      `}>
        <Sidebar isCollapsed={isCollapsed} />
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
};

export default AppLayout;
