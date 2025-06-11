
import React from 'react';
import { Home, MoreHorizontal } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const DashboardPageHeader = () => {
  const tabs = [
    { id: 'overview', label: 'Overview', active: true },
    { id: 'tasks', label: 'Tasks', active: false },
    { id: 'todo', label: 'To do', active: false },
    { id: 'calendar', label: 'Calendar', active: false },
  ];

  return (
    <div className="border-b border-border">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-sm">Home</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-semibold text-sm">Overview</span>
            </div>
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
              className={`text-xs font-medium ${
                tab.active 
                  ? 'text-foreground' 
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
