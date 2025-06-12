
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getProjectDisplayName } from '@/data/projectClientData';
import ClientTabHeader from './ClientTabHeader';

interface ClientTabLayoutProps {
  formData: {
    projectAddress: string;
    startDate: string;
    duration: string;
    status: string;
  };
  onStatusChange: (status: string) => void;
  onSave: () => void;
  children: React.ReactNode;
}

const ClientTabLayout = ({ formData, onStatusChange, onSave, children }: ClientTabLayoutProps) => {
  const { projectId } = useParams();

  return (
    <div className="min-h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <ClientTabHeader
          projectDisplayName={getProjectDisplayName(projectId)}
          projectAddress={formData.projectAddress}
          startDate={formData.startDate}
          duration={formData.duration}
          status={formData.status}
          onStatusChange={onStatusChange}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="p-4 space-y-4 max-w-4xl mx-auto">
          {children}
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="flex-shrink-0 p-4 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button onClick={onSave} className="px-6 py-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientTabLayout;
