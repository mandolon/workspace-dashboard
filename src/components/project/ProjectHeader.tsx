

import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, MapPin, Calendar } from 'lucide-react';
import { getProjectDisplayName, getClientData } from '@/data/projectClientData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectHeaderProps {
  projectName: string;
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
  const { projectId } = useParams();
  const clientData = getClientData(projectId);

  const handleStatusChange = (status: string) => {
    console.log('Status changed to:', status);
  };

  return (
    <div className="px-4 py-2">
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
        <div className="flex items-center gap-3">
          {/* Status and Date Info */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>5/8/23, 5 Weeks</span>
          </div>
          <Select defaultValue="in-progress" onValueChange={handleStatusChange}>
            <SelectTrigger className="w-32 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

