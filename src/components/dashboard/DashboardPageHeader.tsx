
import React from 'react';

interface DashboardPageHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardPageHeader = ({ activeTab, onTabChange }: DashboardPageHeaderProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'To Do' },
    { id: 'notes', label: 'Notes' },
    { id: 'calendar', label: 'Calendar' },
  ];

  return (
    <div className="border-b border-border">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">Home</span>
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`text-xs ${
                activeTab === tab.id 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPageHeader;
