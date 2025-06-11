
import React from 'react';
import { Menu } from 'lucide-react';

interface TeamsTopBarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const TeamsTopBar = ({ sidebarCollapsed, setSidebarCollapsed }: TeamsTopBarProps) => {
  return (
    <div className="border-b border-border bg-background px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-accent rounded"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
          <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
          <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default TeamsTopBar;
