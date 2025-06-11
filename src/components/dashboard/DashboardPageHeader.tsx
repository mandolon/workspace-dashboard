
import React from 'react';
import { Home, MoreHorizontal } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
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
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-4 h-4 text-muted-foreground" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">Home</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center">
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                tab.active 
                  ? 'text-foreground border-foreground' 
                  : 'text-muted-foreground border-transparent hover:text-foreground'
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
