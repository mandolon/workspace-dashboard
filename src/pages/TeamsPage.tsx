
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TeamsHeader from '@/components/teams/TeamsHeader';
import TeamsContent from '@/components/teams/TeamsContent';

const TeamsPage = () => {
  console.log('TeamsPage component is rendering');

  return (
    <AppLayout>
      <div className="flex-1 bg-background p-4">
        <div className="h-full flex flex-col max-w-6xl mx-auto">
          <TeamsHeader />
          <TeamsContent />
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamsPage;
