
import React from 'react';
import ProjectTabForm from './client/ProjectTabForm';
import ClientTabLayout from './client/ClientTabLayout';

const ProjectTab = () => {
  const form = ProjectTabForm({ onSave: () => {} });

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

export default ProjectTab;
