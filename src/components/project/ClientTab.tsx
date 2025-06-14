
import React from 'react';
import ClientTabForm from './client/ClientTabForm';
import ClientTabLayout from './client/ClientTabLayout';

interface ClientTabProps {
  onDataChange?: () => void;
}

const ClientTab = ({ onDataChange }: ClientTabProps) => {
  const form = ClientTabForm({ 
    onSave: () => {
      if (onDataChange) {
        onDataChange();
      }
    }
  });

  return (
    <ClientTabLayout
      formData={form.formData}
      onStatusChange={(value) => form.handleInputChange('status', value)}
      onSave={form.handleSave}
    >
      {form.sections}
    </ClientTabLayout>
  );
};

export default ClientTab;

