
import React, { useState, createContext, useContext } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import RoleSwitcher from '@/components/teams/RoleSwitcher';
import TeamsContent from '@/components/teams/TeamsContent';

// Provide CRM role through context
export type CRMRoles = "admin" | "team" | "client";
export const CRMRoleContext = createContext<CRMRoles>('admin');
export const useCRMRole = () => useContext(CRMRoleContext);

const tabs = [
  { key: "admin", label: "Admin" },
  { key: "team", label: "Team" },
  { key: "client", label: "Client" }
];

const TeamsPage = () => {
  const [role, setRole] = useState<CRMRoles>("admin");
  const [activeTab, setActiveTab] = useState<CRMRoles>("admin");

  return (
    <CRMRoleContext.Provider value={role}>
      <AppLayout>
        <div className="flex flex-col h-full">
          <PageSectionHeader title="Teams CRM">
            <RoleSwitcher role={role} setRole={(newRole) => { setRole(newRole); setActiveTab(newRole); }} />
          </PageSectionHeader>
          {/* Tabs */}
          <div className="flex w-full border-b border-border mb-2 px-6">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`py-2 px-4 -mb-px border-b-2 text-sm font-medium focus:outline-none transition-colors ${
                  activeTab === tab.key 
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab.key as CRMRoles)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
            {activeTab === "admin" && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
                <div className="text-lg font-medium mb-2">Admin CRM</div>
                <p className="text-muted-foreground text-center">
                  This section is reserved for admin dashboards, settings, and controls.
                  <br />
                  Team members are now listed in the <span className="font-semibold text-foreground">Team</span> tab.
                </p>
              </div>
            )}
            {activeTab === "team" && (
              <TeamsContent />
            )}
            {activeTab === "client" && (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4 text-lg font-medium">Client View</div>
                <p className="text-muted-foreground mb-4">
                  This is what a client sees in the CRM. They can only see their own info and their account manager.
                </p>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </CRMRoleContext.Provider>
  );
};

export default TeamsPage;
