
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import QuickActionsHeader from '@/components/home/QuickActionsHeader';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import MyTasksSection from '@/components/home/MyTasksSection';
import ToDoSection from '@/components/home/ToDoSection';
import CalendarSection from '@/components/home/CalendarSection';

const Index = () => {
  return (
    <AppLayout showHeader={true}>
      <div className="flex flex-col h-full">
        <PageSectionHeader 
          title="Home" 
          rightContent={<QuickActionsHeader />}
        />
        <div className="flex-1 p-2 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 h-full">
            {/* Top Row - Swapped positions */}
            <div className="lg:col-span-6">
              <MyTasksSection />
            </div>
            <div className="lg:col-span-6">
              <RecentActivitySection />
            </div>
            
            {/* Bottom Row */}
            <div className="lg:col-span-7">
              <CalendarSection />
            </div>
            <div className="lg:col-span-5">
              <ToDoSection />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
