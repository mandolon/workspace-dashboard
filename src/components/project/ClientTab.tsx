
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getClientData, getProjectDisplayName, updateClientData } from '@/data/projectClientData';
import { useToast } from '@/hooks/use-toast';
import ClientTabHeader from './client/ClientTabHeader';
import InformationSection from './client/InformationSection';

const ClientTab = () => {
  const { projectId } = useParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState(() => {
    const clientData = getClientData(projectId);
    return {
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      secondaryFirstName: clientData.secondaryFirstName || '',
      secondaryLastName: clientData.secondaryLastName || '',
      projectAddress: clientData.projectAddress,
      city: clientData.city,
      state: clientData.state,
      clientId: clientData.clientId,
      billingAddress: clientData.projectAddress,
      billingCity: clientData.city,
      billingState: clientData.state,
      projectName: '',
      projectScope: '',
      projectNotes: '',
      status: 'in-progress',
      startDate: '5/8/23',
      duration: '5 Weeks'
    };
  });

  // Update form data when project changes
  useEffect(() => {
    const clientData = getClientData(projectId);
    setFormData(prev => ({
      ...prev,
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      secondaryFirstName: clientData.secondaryFirstName || '',
      secondaryLastName: clientData.secondaryLastName || '',
      projectAddress: clientData.projectAddress,
      city: clientData.city,
      state: clientData.state,
      clientId: clientData.clientId,
      billingAddress: clientData.projectAddress,
      billingCity: clientData.city,
      billingState: clientData.state,
    }));
  }, [projectId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!projectId) return;
    
    const updatedClientData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      secondaryFirstName: formData.secondaryFirstName,
      secondaryLastName: formData.secondaryLastName,
      projectAddress: formData.projectAddress,
      city: formData.city,
      state: formData.state,
      clientId: formData.clientId,
    };
    
    updateClientData(projectId, updatedClientData);
    
    // Update billing address to match project address
    setFormData(prev => ({
      ...prev,
      billingAddress: formData.projectAddress,
      billingCity: formData.city,
      billingState: formData.state,
    }));
    
    toast({
      title: "Changes saved",
      description: "Client information has been updated successfully.",
    });
  };

  const clientInformationFields = [
    {
      label: 'Client ID',
      value: formData.clientId,
      readOnly: true,
      span: 'full' as const
    },
    {
      label: 'Primary First Name',
      value: formData.firstName,
      onChange: (value: string) => handleInputChange('firstName', value),
      span: 'half' as const
    },
    {
      label: 'Secondary First Name',
      value: formData.secondaryFirstName,
      onChange: (value: string) => handleInputChange('secondaryFirstName', value),
      placeholder: 'Optional',
      span: 'half' as const
    },
    {
      label: 'Primary Last Name',
      value: formData.lastName,
      onChange: (value: string) => handleInputChange('lastName', value),
      span: 'half' as const
    },
    {
      label: 'Secondary Last Name',
      value: formData.secondaryLastName,
      onChange: (value: string) => handleInputChange('secondaryLastName', value),
      placeholder: 'Optional',
      span: 'half' as const
    }
  ];

  const projectAddressFields = [
    {
      label: 'Address',
      value: formData.projectAddress,
      onChange: (value: string) => handleInputChange('projectAddress', value)
    },
    {
      label: 'City',
      value: formData.city,
      onChange: (value: string) => handleInputChange('city', value)
    },
    {
      label: 'State',
      value: formData.state,
      onChange: (value: string) => handleInputChange('state', value)
    }
  ];

  const billingAddressFields = [
    {
      label: 'Address',
      value: formData.billingAddress,
      onChange: (value: string) => handleInputChange('billingAddress', value)
    },
    {
      label: 'City',
      value: formData.billingCity,
      onChange: (value: string) => handleInputChange('billingCity', value)
    },
    {
      label: 'State',
      value: formData.billingState,
      onChange: (value: string) => handleInputChange('billingState', value)
    }
  ];

  const projectInformationFields = [
    {
      label: 'Project Name',
      value: formData.projectName,
      onChange: (value: string) => handleInputChange('projectName', value),
      type: 'textarea' as const,
      placeholder: 'Enter project name...'
    },
    {
      label: 'Project Scope',
      value: formData.projectScope,
      onChange: (value: string) => handleInputChange('projectScope', value),
      type: 'textarea' as const,
      placeholder: 'Describe the project scope...'
    },
    {
      label: 'Project Notes',
      value: formData.projectNotes,
      onChange: (value: string) => handleInputChange('projectNotes', value),
      type: 'textarea' as const,
      placeholder: 'Add any additional project notes...'
    }
  ];

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
          onStatusChange={(value) => handleInputChange('status', value)}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4 pb-0">
            <div className="space-y-4 max-w-4xl mx-auto">
              <InformationSection
                title="Client Information"
                fields={clientInformationFields}
              />

              <InformationSection
                title="Project Address"
                fields={projectAddressFields}
              />

              <InformationSection
                title="Billing Address"
                fields={billingAddressFields}
              />

              <InformationSection
                title="Project Information"
                fields={projectInformationFields}
              />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Save Button - Always Visible */}
      <div className="flex-shrink-0 p-4 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button onClick={handleSave} className="px-6 py-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientTab;
