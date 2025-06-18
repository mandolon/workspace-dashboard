
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import QuickActionsHeader from '@/components/home/QuickActionsHeader';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import MyTasksSection from '@/components/home/MyTasksSection';
import ToDoSection from '@/components/home/ToDoSection';
import CalendarSection from '@/components/home/CalendarSection';
import InvoicesSection from '@/components/home/InvoicesSection';

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
      <div className="flex flex-col h-full bg-white">
        <PageSectionHeader 
          title="Home" 
        />
        <div className="flex-1 p-2 px-6 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left side - Tabbed content and Recent Activity */}
            <div className="lg:col-span-6 flex flex-col min-h-0 gap-4">
              <div className="flex flex-col h-1/2 border border-border rounded-lg">
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
                
                {/* Tab Content */}
                <div className="flex-1 min-h-0">
                  {renderTabContent()}
                </div>
              </div>
              
              {/* Recent Activity below tabs */}
              <div className="flex-1 border border-border rounded-lg">
                <RecentActivitySection />
              </div>
            </div>
            
            {/* Right side - Quick Actions only */}
            <div className="lg:col-span-6 flex flex-col min-h-0">
              <div className="border border-border rounded-lg p-4 flex justify-start">
                <QuickActionsHeader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
