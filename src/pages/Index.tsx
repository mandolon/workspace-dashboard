
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import MyTasksSection from '@/components/home/MyTasksSection';
import ToDoSection from '@/components/home/ToDoSection';
import QuickActionsSection from '@/components/home/QuickActionsSection';

const Index = () => {
  return (
    <AppLayout showHeader={true}>
      <div className="flex flex-col h-full">
        <PageSectionHeader title="Home" />
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
            {/* Top Row */}
            <div className="lg:col-span-2">
              <RecentActivitySection />
            </div>
            <div className="lg:col-span-2">
              <MyTasksSection />
            </div>
            
            {/* Bottom Row */}
            <div className="lg:col-span-2">
              <ToDoSection />
            </div>
            <div className="lg:col-span-2">
              <QuickActionsSection />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
