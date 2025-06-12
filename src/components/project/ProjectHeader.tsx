
import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, MapPin } from 'lucide-react';
import { getProjectDisplayName, getClientData } from '@/data/projectClientData';

interface ProjectHeaderProps {
  projectName: string;
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
  const { projectId } = useParams();
  const clientData = getClientData(projectId);

  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="pb-3 mb-3">
            <h1 className="text-lg font-semibold text-foreground">
              {getProjectDisplayName(projectId)}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{clientData.projectAddress}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="text-xs">Agents</span>
            <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">2</span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
          <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
          <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
