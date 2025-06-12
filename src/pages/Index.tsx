
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import NotesTab from '@/components/dashboard/NotesTab';
import CalendarTab from '@/components/dashboard/CalendarTab';
import { useState } from 'react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <DashboardPageHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-4">
              <DashboardContent />
            </div>
          )}
          {activeTab === 'tasks' && <div className="p-4">To Do content coming soon</div>}
          {activeTab === 'notes' && <NotesTab />}
          {activeTab === 'calendar' && <CalendarTab />}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
