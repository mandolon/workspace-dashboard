
import React from 'react';
import { Menu } from 'lucide-react';

interface DashboardHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const DashboardHeader = ({ sidebarCollapsed, setSidebarCollapsed }: DashboardHeaderProps) => {
  return (
    <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0">
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="p-2 hover:bg-accent rounded-md transition-colors"
      >
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
  );
};

export default DashboardHeader;
