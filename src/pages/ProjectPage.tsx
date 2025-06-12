
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectTabs from '@/components/project/ProjectTabs';

const ProjectPage = () => {
  const { projectId } = useParams();

  // Convert URL-friendly projectId back to display name
  const getProjectName = (id: string | undefined) => {
    const projectMap: Record<string, string> = {
      'ogden-thew-2709-t-street': 'Ogden - Thew - 2709 T Street',
      'adams-1063-40th-street': 'Adams - 1063 40th Street',
      'tiverton': '1524 Tiverton',
      'i-street': '2015 10th Street',
    };
    return projectMap[id || ''] || 'Unknown Project';
  };

  const projectName = getProjectName(projectId);

  return (
    <AppLayout>
      <div className="flex-1 bg-background p-4">
        <div className="h-full flex flex-col max-w-6xl mx-auto">
          <ProjectHeader projectName={projectName} />
          <ProjectTabs projectName={projectName} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectPage;
