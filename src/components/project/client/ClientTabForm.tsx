import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientData, updateClientData } from '@/data/projectClientData';
import { useToast } from '@/hooks/use-toast';
import InformationSection from './InformationSection';

interface ClientTabFormProps {
  onSave: () => void;
}

const ClientTabForm = ({ onSave }: ClientTabFormProps) => {
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
      projectId: clientData.projectId,
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
      projectId: clientData.projectId,
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
      projectId: formData.projectId,
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

    onSave();
  };

  const clientInformationFields = [
    {
      label: 'Project ID',
      value: formData.projectId,
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

  return {
    formData,
    handleSave,
    handleInputChange,
    clientInformationFields,
    projectAddressFields,
    billingAddressFields,
    projectInformationFields,
    sections: (
      <>
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
      </>
    )
  };
};

export default ClientTabForm;
