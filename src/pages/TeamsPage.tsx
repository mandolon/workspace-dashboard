
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PageSectionHeader from '@/components/shared/PageSectionHeader';
import RoleSwitcher from '@/components/teams/RoleSwitcher';
import TeamsContent from '@/components/teams/TeamsContent';

const tabs = [
  { key: "admin", label: "Admin" },
  { key: "team", label: "Team" },
  { key: "client", label: "Client" }
];

const TeamsPage = () => {
  // For demo: let user switch role
  const [role, setRole] = useState<"admin" | "team" | "client">("admin");
  const [activeTab, setActiveTab] = useState<"admin" | "team" | "client">("admin");

  return (
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
              onClick={() => setActiveTab(tab.key as "admin" | "team" | "client")}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
          {activeTab === "admin" && (
            // Admin gets full team CRM
            <TeamsContent />
          )}
          {activeTab === "team" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4 text-lg font-medium">Team View</div>
              <p className="text-muted-foreground mb-4">
                This view is for internal team members. You can only see your own group and basic profile information.
              </p>
              {/* You could filter the TeamsContent props to render team members, for demo just text */}
            </div>
          )}
          {activeTab === "client" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4 text-lg font-medium">Client View</div>
              <p className="text-muted-foreground mb-4">
                This is what a client sees in the CRM. They can only see their own info and their account manager.
              </p>
              {/* Could list account manager or welcome here */}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamsPage;
