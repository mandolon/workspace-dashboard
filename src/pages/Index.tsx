
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { useState } from 'react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <DashboardPageHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 p-4">
          {activeTab === 'overview' && <DashboardContent />}
          {activeTab === 'tasks' && <div>To Do content coming soon</div>}
          {activeTab === 'notes' && <div>Notes content coming soon</div>}
          {activeTab === 'calendar' && <div>Calendar content coming soon</div>}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
