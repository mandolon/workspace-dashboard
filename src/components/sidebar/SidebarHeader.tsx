
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  if (isCollapsed) {
    return (
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-center">
          <span className="font-medium text-sidebar-foreground text-sm">AL</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-sidebar-border">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sidebar-foreground text-sm truncate">Armando Lopez</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
      </div>
    </div>
  );
};

export default SidebarHeader;
