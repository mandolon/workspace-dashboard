
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getClientData, updateClientData } from '@/data/projectClientData';
import InformationSection from './InformationSection';

interface ProjectTabFormProps {
  onSave: () => void;
}

const ProjectTabForm = ({ onSave }: ProjectTabFormProps) => {
  const { toast } = useToast();
  const { projectId } = useParams();
  const clientData = getClientData(projectId);

  const [formData, setFormData] = useState({
    projectAddress: clientData.projectAddress,
    city: clientData.city,
    state: clientData.state,
    projectName: '',
    projectScope: '',
    projectNotes: '',
    status: 'in-progress',
    startDate: '5/8/23',
    duration: '5 Weeks'
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
    // Update address, city, state in projectClientData
    if (projectId) {
      updateClientData(projectId, undefined, formData.projectAddress, formData.city, formData.state);
    }
    toast({
      title: "Changes saved",
      description: "Project information has been updated successfully.",
    });

    onSave();
  };

  // Left Column: Project Address, City, State
  const addressFields = [
    {
      label: 'Project Address',
      value: formData.projectAddress,
      onChange: (value: string) => handleInputChange('projectAddress', value),
      type: 'input' as const,
      placeholder: 'Enter project address...',
      onKeyDown: handleKeyDown,
    },
    {
      label: 'City',
      value: formData.city,
      onChange: (value: string) => handleInputChange('city', value),
      type: 'input' as const,
      placeholder: 'Enter city...',
      onKeyDown: handleKeyDown,
    },
    {
      label: 'State',
      value: formData.state,
      onChange: (value: string) => handleInputChange('state', value),
      type: 'input' as const,
      placeholder: 'Enter state...',
      onKeyDown: handleKeyDown,
    },
  ];

  // Right Column: Project Name, Scope, Notes
  const projectDetailFields = [
    {
      label: 'Project Name',
      value: formData.projectName,
      onChange: (value: string) => handleInputChange('projectName', value),
      type: 'textarea' as const,
      placeholder: 'Enter project name...',
      onKeyDown: handleKeyDown,
    },
    {
      label: 'Project Scope',
      value: formData.projectScope,
      onChange: (value: string) => handleInputChange('projectScope', value),
      type: 'textarea' as const,
      placeholder: 'Describe the project scope...',
      onKeyDown: handleKeyDown,
    },
    {
      label: 'Project Notes',
      value: formData.projectNotes,
      onChange: (value: string) => handleInputChange('projectNotes', value),
      type: 'textarea' as const,
      placeholder: 'Add any additional project notes...',
      onKeyDown: handleKeyDown,
    },
  ];

  return {
    formData,
    handleSave,
    handleInputChange,
    projectInformationFields: [...addressFields, ...projectDetailFields], // (legacy - unused in UI, left for compatibility)
    sections: (
      <div>
        <h3 className="text-xs font-medium text-gray-900 mb-3">Project Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column: Address info */}
          <div className="space-y-4">
            {addressFields.map((field, idx) => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  value={field.value}
                  onChange={e => field.onChange?.(e.target.value)}
                  placeholder={field.placeholder}
                  onKeyDown={field.onKeyDown}
                  className="h-8 text-xs px-2 border rounded w-full"
                  type="text"
                />
              </div>
            ))}
          </div>
          {/* Right column: Project detail fields */}
          <div className="space-y-4">
            {projectDetailFields.map((field, idx) => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <textarea
                  value={field.value}
                  onChange={e => field.onChange?.(e.target.value)}
                  placeholder={field.placeholder}
                  onKeyDown={field.onKeyDown}
                  className="min-h-[38px] text-xs px-2 border rounded w-full py-1"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  };
};

export default ProjectTabForm;
