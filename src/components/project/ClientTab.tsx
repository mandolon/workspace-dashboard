import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getClientData, getProjectDisplayName } from '@/data/projectClientData';
import ClientTabHeader from './client/ClientTabHeader';
import InformationSection from './client/InformationSection';

const ClientTab = () => {
  const { projectId } = useParams();

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

  const primaryClientFields = [
    {
      label: 'Client ID',
      value: formData.clientId,
      readOnly: true
    },
    {
      label: 'First Name',
      value: formData.firstName,
      onChange: (value: string) => handleInputChange('firstName', value)
    },
    {
      label: 'Last Name',
      value: formData.lastName,
      onChange: (value: string) => handleInputChange('lastName', value)
    }
  ];

  const secondaryClientFields = [
    {
      label: 'First Name',
      value: formData.secondaryFirstName,
      onChange: (value: string) => handleInputChange('secondaryFirstName', value),
      placeholder: 'Optional secondary client first name'
    },
    {
      label: 'Last Name',
      value: formData.secondaryLastName,
      onChange: (value: string) => handleInputChange('secondaryLastName', value),
      placeholder: 'Optional secondary client last name'
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
    <div className="flex-1 overflow-y-auto p-3 mt-0">
      <ClientTabHeader
        projectDisplayName={getProjectDisplayName(projectId)}
        projectAddress={formData.projectAddress}
        startDate={formData.startDate}
        duration={formData.duration}
        status={formData.status}
        onStatusChange={(value) => handleInputChange('status', value)}
      />

      {/* Information Sections */}
      <div className="space-y-3">
        <InformationSection
          title="Primary Client Information"
          fields={primaryClientFields}
        />

        <InformationSection
          title="Secondary Client Information"
          fields={secondaryClientFields}
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

        {/* Save Button */}
        <div className="flex justify-end pt-3">
          <Button size="sm" className="text-xs">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ClientTab;
