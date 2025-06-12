
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectTabs from '@/components/project/ProjectTabs';
import { getProjectDisplayName } from '@/data/projectClientData';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const projectName = getProjectDisplayName(projectId);

  const handleDataRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <AppLayout>
      <div className="flex-1 bg-background p-4">
        <div className="h-full flex flex-col max-w-6xl mx-auto">
          <ProjectHeader refreshTrigger={refreshKey} />
          <ProjectTabs projectName={projectName} onDataChange={handleDataRefresh} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectPage;
