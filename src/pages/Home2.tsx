
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import PerformanceCard from '@/components/home2/PerformanceCard';
import ActivityChart from '@/components/home2/ActivityChart';
import EngagementMetrics from '@/components/home2/EngagementMetrics';
import TasksActivityFeed from '@/components/home2/TasksActivityFeed';
import UserProfile from '@/components/home2/UserProfile';

const Home2 = () => {
  return (
    <AppLayout showHeader={true}>
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100">
        <PageSectionHeader title="Home 2" />
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-3">
                <UserProfile />
              </div>
              <div className="lg:col-span-5">
                <PerformanceCard />
              </div>
              <div className="lg:col-span-4">
                <ActivityChart />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <EngagementMetrics />
              </div>
              <div className="lg:col-span-4">
                <TasksActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home2;
