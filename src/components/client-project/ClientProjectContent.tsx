import React, { useState } from 'react';
import ClientProjectHeader from './ClientProjectHeader';
import ClientProjectTabs from './ClientProjectTabs';
import { getProjectDisplayName } from '@/data/projectClientData';
import { useProjectData } from '@/contexts/ProjectDataContext';

const ClientProjectContent = () => {
  const { refreshTrigger, triggerRefresh } = useProjectData();
  // Using a fixed project ID for the sandbox
  const projectId = 'adams-1063-40th-street';
  const projectName = getProjectDisplayName(projectId);

  return (
    <div className="h-full flex flex-col bg-background">
      <ClientProjectHeader projectName={projectName} />
      <div className="flex-1 overflow-hidden">
        <ClientProjectTabs 
          projectName={projectName} 
          projectId={projectId} 
          onDataChange={triggerRefresh} 
        />
      </div>
    </div>
  );
};

export default ClientProjectContent;