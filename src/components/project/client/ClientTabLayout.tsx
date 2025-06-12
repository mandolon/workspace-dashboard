
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
    <div className="h-full flex flex-col bg-background">
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

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="p-4 pb-0">
            <div className="space-y-4 max-w-4xl mx-auto">
              {children}
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      {/* Fixed Save Button - Always Visible */}
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
