
import React from 'react';
import ClientTabForm from './client/ClientTabForm';
import ClientTabLayout from './client/ClientTabLayout';

const ClientTab = () => {
  const form = ClientTabForm({ onSave: () => {} });

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
