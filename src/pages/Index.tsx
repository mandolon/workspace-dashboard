
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import QuickActionsHeader from '@/components/home/QuickActionsHeader';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import MyTasksSection from '@/components/home/MyTasksSection';
import ToDoSection from '@/components/home/ToDoSection';
import CalendarSection from '@/components/home/CalendarSection';
import InvoicesSection from '@/components/home/InvoicesSection';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { key: "tasks", label: "My Tasks" },
    { key: "todo", label: "To Do" },
    { key: "calendar", label: "Calendar" },
    { key: "invoices", label: "Invoices" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <MyTasksSection />;
      case 'todo':
        return <ToDoSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'invoices':
        return <InvoicesSection />;
      default:
        return <MyTasksSection />;
    }
  };

  return (
    <AppLayout showHeader={true}>
      <div className="flex flex-col h-full bg-background">
        <PageSectionHeader 
          title="Home" 
        />
        <div className="flex-1 p-2 px-6 min-h-0">
          <div className="flex flex-col gap-6 h-full">
            {/* Top row - Tabs and Quick Actions side by side */}
            <div className="flex gap-6">
              {/* Tabs card */}
              <div className="flex-1 flex flex-col h-80">
                {/* Tabs */}
                <div className="flex w-full border-b border-border mb-4 px-4 pt-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.key}
                      className={`py-2 px-4 -mb-px border-b-2 text-sm font-medium focus:outline-none transition-colors ${
                        activeTab === tab.key 
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Tab Content with ScrollArea */}
                <div className="flex-1 min-h-0 px-4 pb-4">
                  <ScrollArea className="h-full">
                    {renderTabContent()}
                  </ScrollArea>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="border border-border rounded-lg p-4 w-fit h-fit bg-card">
                <QuickActionsHeader />
              </div>
            </div>
            
            {/* Bottom row - Recent Activity full width */}
            <div className="flex-1 border border-border rounded-lg min-h-0 bg-card">
              <RecentActivitySection />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
