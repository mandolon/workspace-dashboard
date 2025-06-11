
import React from 'react';
import { Users } from 'lucide-react';

interface ProjectHeaderProps {
  projectName: string;
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">PinerWorks</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-base">{projectName}</span>
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
