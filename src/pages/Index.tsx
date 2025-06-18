
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
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Top Row */}
            <RecentActivitySection />
            <MyTasksSection />
            
            {/* Bottom Row */}
            <ToDoSection />
            <QuickActionsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
