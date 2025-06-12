
import React from 'react';
import InformationSection from './InformationSection';
import ProjectStatusCard from './ProjectStatusCard';
import { FormField } from './ClientFormFields';

interface ClientFormSectionsProps {
  formData: any;
  onStatusChange: (status: string) => void;
  clientInformationFields: FormField[];
  projectAddressFields: FormField[];
  billingAddressFields: FormField[];
  projectInformationFields: FormField[];
}

const ClientFormSections = ({
  formData,
  onStatusChange,
  clientInformationFields,
  projectAddressFields,
  billingAddressFields,
  projectInformationFields
}: ClientFormSectionsProps) => {
  return (
    <div className="space-y-6">
      {/* Project Status Card */}
      <ProjectStatusCard
        projectAddress={formData.projectAddress}
        startDate={formData.startDate}
        duration={formData.duration}
        status={formData.status}
        onStatusChange={onStatusChange}
      />

      {/* Client Information */}
      <InformationSection
        title="Client Information"
        fields={clientInformationFields}
      />

      {/* Address Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InformationSection
          title="Project Address"
          fields={projectAddressFields}
        />
        <InformationSection
          title="Billing Address"
          fields={billingAddressFields}
        />
      </div>

      {/* Project Information */}
      <InformationSection
        title="Project Information"
        fields={projectInformationFields}
      />
    </div>
  );
};

export default ClientFormSections;
