
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getClientData } from '@/data/projectClientData';
import InformationSection from './InformationSection';

interface ProjectTabFormProps {
  onSave: () => void;
}

const ProjectTabForm = ({ onSave }: ProjectTabFormProps) => {
  const { toast } = useToast();
  const { projectId } = useParams();
  const clientData = getClientData(projectId);

  const [formData, setFormData] = useState({
    projectId: clientData.projectId,
    projectName: '',
    projectScope: '',
    projectNotes: '',
    status: 'in-progress',
    startDate: '5/8/23',
    duration: '5 Weeks',
    projectAddress: clientData.projectAddress
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Project information has been updated successfully.",
    });

    onSave();
  };

  const projectInformationFields = [
    {
      label: 'Project ID',
      value: formData.projectId,
      readOnly: true,
      span: 'full' as const,
      onKeyDown: handleKeyDown
    },
    {
      label: 'Project Name',
      value: formData.projectName,
      onChange: (value: string) => handleInputChange('projectName', value),
      type: 'textarea' as const,
      placeholder: 'Enter project name...',
      onKeyDown: handleKeyDown
    },
    {
      label: 'Project Scope',
      value: formData.projectScope,
      onChange: (value: string) => handleInputChange('projectScope', value),
      type: 'textarea' as const,
      placeholder: 'Describe the project scope...',
      onKeyDown: handleKeyDown
    },
    {
      label: 'Project Notes',
      value: formData.projectNotes,
      onChange: (value: string) => handleInputChange('projectNotes', value),
      type: 'textarea' as const,
      placeholder: 'Add any additional project notes...',
      onKeyDown: handleKeyDown
    }
  ];

  return {
    formData,
    handleSave,
    handleInputChange,
    projectInformationFields,
    sections: (
      <>
        <InformationSection
          title="Project Information"
          fields={projectInformationFields}
        />
      </>
    )
  };
};

export default ProjectTabForm;
