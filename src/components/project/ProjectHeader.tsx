
import React from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDisplayName } from '@/data/projectClientData';

interface ProjectHeaderProps {
  projectName: string;
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
  const { projectId } = useParams();

  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">{getProjectDisplayName(projectId)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
