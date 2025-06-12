
import React from 'react';

export interface FormField {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: 'input' | 'textarea';
  readOnly?: boolean;
  placeholder?: string;
  span?: 'full' | 'half';
}

interface ClientFormFieldsProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export const useClientFormFields = ({ formData, onInputChange }: ClientFormFieldsProps) => {
  const clientInformationFields: FormField[] = [
    {
      label: 'Project ID',
      value: formData.projectId,
      readOnly: true,
      span: 'full' as const
    },
    {
      label: 'Primary First Name',
      value: formData.firstName,
      onChange: (value: string) => onInputChange('firstName', value),
      span: 'half' as const
    },
    {
      label: 'Secondary First Name',
      value: formData.secondaryFirstName,
      onChange: (value: string) => onInputChange('secondaryFirstName', value),
      placeholder: 'Optional',
      span: 'half' as const
    },
    {
      label: 'Primary Last Name',
      value: formData.lastName,
      onChange: (value: string) => onInputChange('lastName', value),
      span: 'half' as const
    },
    {
      label: 'Secondary Last Name',
      value: formData.secondaryLastName,
      onChange: (value: string) => onInputChange('secondaryLastName', value),
      placeholder: 'Optional',
      span: 'half' as const
    }
  ];

  const projectAddressFields: FormField[] = [
    {
      label: 'Address',
      value: formData.projectAddress,
      onChange: (value: string) => onInputChange('projectAddress', value)
    },
    {
      label: 'City',
      value: formData.city,
      onChange: (value: string) => onInputChange('city', value)
    },
    {
      label: 'State',
      value: formData.state,
      onChange: (value: string) => onInputChange('state', value)
    }
  ];

  const billingAddressFields: FormField[] = [
    {
      label: 'Address',
      value: formData.billingAddress,
      onChange: (value: string) => onInputChange('billingAddress', value)
    },
    {
      label: 'City',
      value: formData.billingCity,
      onChange: (value: string) => onInputChange('billingCity', value)
    },
    {
      label: 'State',
      value: formData.billingState,
      onChange: (value: string) => onInputChange('billingState', value)
    }
  ];

  const projectInformationFields: FormField[] = [
    {
      label: 'Project Name',
      value: formData.projectName,
      onChange: (value: string) => onInputChange('projectName', value),
      type: 'textarea' as const,
      placeholder: 'Enter project name...'
    },
    {
      label: 'Project Scope',
      value: formData.projectScope,
      onChange: (value: string) => onInputChange('projectScope', value),
      type: 'textarea' as const,
      placeholder: 'Describe the project scope...'
    },
    {
      label: 'Project Notes',
      value: formData.projectNotes,
      onChange: (value: string) => onInputChange('projectNotes', value),
      type: 'textarea' as const,
      placeholder: 'Add any additional project notes...'
    }
  ];

  return {
    clientInformationFields,
    projectAddressFields,
    billingAddressFields,
    projectInformationFields
  };
};
