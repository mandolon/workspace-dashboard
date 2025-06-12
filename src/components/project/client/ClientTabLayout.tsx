
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getProjectDisplayName } from '@/data/projectClientData';

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
    <div className="min-h-full flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1">
        <div className="p-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground mb-2">
              {getProjectDisplayName(projectId)}
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage client information and project details
            </p>
          </div>
          
          {children}
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="flex-shrink-0 p-6 border-t border-border bg-background/95 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-5xl mx-auto flex justify-end">
          <Button onClick={onSave} size="lg" className="px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientTabLayout;
