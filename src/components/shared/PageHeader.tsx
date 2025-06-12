
import React from 'react';
import { Menu, Users } from 'lucide-react';

interface PageHeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  agentCount?: number;
  showAgents?: boolean;
  actions?: React.ReactNode;
}

const PageHeader = ({ 
  onToggleSidebar,
  title = "Task Board",
  agentCount = 2,
  showAgents = true,
  actions
}: PageHeaderProps) => {
  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-accent rounded-md transition-colors lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showAgents && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Agents</span>
              <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">{agentCount}</span>
            </div>
          )}
          {actions || (
            <>
              <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
              <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
              <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
