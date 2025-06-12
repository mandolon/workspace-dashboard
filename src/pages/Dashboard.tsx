
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardContent from '@/components/dashboard/DashboardContent';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
  };
  
  return (
    <AppLayout>
      <div className="flex-1 bg-background p-4">
        <div className="h-full flex flex-col max-w-6xl mx-auto">
          <DashboardPageHeader activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="flex-1 pt-4 overflow-y-auto">
            <DashboardContent />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
