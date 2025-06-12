
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientData, updateClientData } from '@/data/projectClientData';
import { useToast } from '@/hooks/use-toast';
import { useClientFormFields } from './ClientFormFields';
import ClientFormSections from './ClientFormSections';

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
      projectId: projectId || '',
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
      projectId: projectId || '',
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

  const formFields = useClientFormFields({ formData, onInputChange });

  return {
    formData,
    handleSave,
    handleInputChange,
    sections: (
      <ClientFormSections
        formData={formData}
        onStatusChange={(value) => handleInputChange('status', value)}
        {...formFields}
      />
    )
  };
};

export default ClientTabForm;
