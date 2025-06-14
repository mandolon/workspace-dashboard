
// Ensure header is consistent and only appears using PageSectionHeader

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TeamsContent from '@/components/teams/TeamsContent';
import PageSectionHeader from '@/components/shared/PageSectionHeader';

const TeamsPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageSectionHeader title="Teams" />
        <div className="flex-1 flex flex-col max-w-6xl mx-auto">
          <TeamsContent />
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamsPage;
