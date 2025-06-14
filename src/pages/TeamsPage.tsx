
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TeamsHeader from '@/components/teams/TeamsHeader';
import TeamsContent from '@/components/teams/TeamsContent';
import PageSectionHeader from '@/components/shared/PageSectionHeader';

const TeamsPage = () => {
  console.log('TeamsPage component is rendering');

  return (
    <AppLayout>
      <div className="flex-1 bg-background flex flex-col">
        <PageSectionHeader title="Teams" />
        <div className="h-full flex flex-col max-w-6xl mx-auto flex-1">
          {/* Remove TeamsHeader here to avoid duplicate header */}
          <TeamsContent />
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamsPage;
