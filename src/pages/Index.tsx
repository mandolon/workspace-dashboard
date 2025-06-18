
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import MyTasksSection from '@/components/home/MyTasksSection';
import ToDoSection from '@/components/home/ToDoSection';
import QuickActionsSection from '@/components/home/QuickActionsSection';
import CalendarSection from '@/components/home/CalendarSection';

const Index = () => {
  return (
    <AppLayout showHeader={true}>
      <div className="flex flex-col h-full">
        <PageSectionHeader title="Home" />
        <div className="flex-1 p-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
            {/* Top Row */}
            <div className="lg:col-span-5">
              <RecentActivitySection />
            </div>
            <div className="lg:col-span-4">
              <MyTasksSection />
            </div>
            <div className="lg:col-span-3">
              <CalendarSection />
            </div>
            
            {/* Bottom Row */}
            <div className="lg:col-span-6">
              <ToDoSection />
            </div>
            <div className="lg:col-span-6">
              <QuickActionsSection />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
