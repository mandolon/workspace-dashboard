
import React from 'react';
import { Home, CheckSquare, FileText, Calendar } from 'lucide-react';

interface DashboardPageHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardPageHeader = ({ activeTab, onTabChange }: DashboardPageHeaderProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'tasks', label: 'To Do', icon: CheckSquare },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="border-b border-border">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Home</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
            <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
            <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <div className="flex items-center gap-4">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`text-xs flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <IconComponent className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPageHeader;
