
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectTabs from '@/components/project/ProjectTabs';
import { getProjectDisplayName } from '@/data/projectClientData';

const ProjectPage = () => {
  const { projectId } = useParams();
  const projectName = getProjectDisplayName(projectId);

  return (
    <AppLayout>
      <div className="flex-1 bg-background p-4">
        <div className="h-full flex flex-col max-w-6xl mx-auto">
          <ProjectHeader />
          <ProjectTabs projectName={projectName} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectPage;
