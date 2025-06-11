
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarProjects from './sidebar/SidebarProjects';
import SidebarFooter from './sidebar/SidebarFooter';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const [openSections, setOpenSections] = useState({
    mainNav: true,
    projects: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col min-w-0">
      <SidebarHeader isCollapsed={isCollapsed} />

      {isCollapsed ? (
        <SidebarNavigation 
          isCollapsed={true}
          isOpen={openSections.mainNav}
          onToggle={() => toggleSection('mainNav')}
        />
      ) : (
        <ScrollArea className="flex-1">
          <div className="py-2">
            <SidebarNavigation 
              isCollapsed={false}
              isOpen={openSections.mainNav}
              onToggle={() => toggleSection('mainNav')}
            />
            
            <SidebarProjects 
              isOpen={openSections.projects}
              onToggle={() => toggleSection('projects')}
            />
          </div>
        </ScrollArea>
      )}

      {!isCollapsed && <SidebarFooter />}
    </div>
  );
};

export default Sidebar;
