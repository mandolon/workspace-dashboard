
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import QuickActionsHeader from '@/components/home/QuickActionsHeader';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import MyTasksSection from '@/components/home/MyTasksSection';
import ToDoSection from '@/components/home/ToDoSection';
import CalendarSection from '@/components/home/CalendarSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <AppLayout showHeader={true}>
      <div className="flex flex-col h-full bg-white">
        <PageSectionHeader 
          title="Home" 
          rightContent={<QuickActionsHeader />}
        />
        <div className="flex-1 p-2 px-6 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left side - Tabbed content */}
            <div className="lg:col-span-8 flex flex-col min-h-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="tasks">My Tasks</TabsTrigger>
                  <TabsTrigger value="todo">To Do</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="flex-1 min-h-0">
                  <MyTasksSection />
                </TabsContent>
                
                <TabsContent value="todo" className="flex-1 min-h-0">
                  <ToDoSection />
                </TabsContent>
                
                <TabsContent value="calendar" className="flex-1 min-h-0">
                  <CalendarSection />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right side - Fixed Recent Activity */}
            <div className="lg:col-span-4 flex flex-col min-h-0">
              <RecentActivitySection />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
