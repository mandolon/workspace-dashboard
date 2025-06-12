
import React from 'react';
import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClientTabHeaderProps {
  projectDisplayName: string;
  projectAddress: string;
  startDate: string;
  duration: string;
  status: string;
  onStatusChange: (status: string) => void;
}

const ClientTabHeader = ({
  projectDisplayName,
  projectAddress,
  startDate,
  duration,
  status,
  onStatusChange
}: ClientTabHeaderProps) => {
  return (
    <>
      {/* Status and Date Info */}
      <div className="flex justify-end items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{startDate}, {duration}</span>
        </div>
        <Select value={status} onValueChange={onStatusChange}>
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
    </>
  );
};

export default ClientTabHeader;
