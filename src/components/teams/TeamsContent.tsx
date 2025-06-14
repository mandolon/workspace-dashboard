
import React, { useState } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';
import { TEAM_USERS, TeamMember } from '@/utils/teamUsers';
import { ArchitectureRole } from '@/types/roles';

interface TeamsContentProps {
  tab: "admin" | "team" | "client";
  selectedUserId?: string;
}

// We will map CRM role to filter for tab
const getCrmRoleForTab = (tab: "admin" | "team" | "client") => {
  if (tab === "admin") return ["Admin"];
  if (tab === "team") return ["Team"];
  if (tab === "client") return ["Client"];
  return [];
};

const TeamsContent = ({ tab, selectedUserId }: TeamsContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Store team members as local state so we can update titleRole
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_USERS);

  const roles: ArchitectureRole[] = [
    'Architect',
    'Engineer',
    'CAD Tech',
    'Designer',
    'Interior Designer',
    'Consultant',
    'Project Manager',
    'Admin',
    'Developer',
    'QA Tester',
    'Team Lead',
    'Marketing Manager',
    'Customer Support',
    'Operations',
    'Jr Designer',
    'Contractor',
    'Client'
  ];

  const handleRoleChange = (memberId: string, newTitleRole: ArchitectureRole) => {
    setTeamMembers(prev =>
      prev.map(m =>
        m.id === memberId ? { ...m, titleRole: newTitleRole } : m
      )
    );
  };

  const handleAddMember = () => {
    console.log('Add member clicked');
  };

  // Filter by CRM role for the current tab
  let filteredMembers: TeamMember[] = teamMembers.filter(
    m => getCrmRoleForTab(tab).includes(m.crmRole)
  );

  // Apply search filter
  let displayedMembers = filteredMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by selected user if any
  if (selectedUserId) {
    displayedMembers = displayedMembers.filter(m => m.id === selectedUserId);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <TeamsSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddMember={handleAddMember}
      />
      <TeamMembersTable
        members={displayedMembers}
        roles={roles}
        onRoleChange={handleRoleChange}
      />
      <TeamMembersSummary
        filteredMembers={displayedMembers}
        totalMembers={filteredMembers.length}
      />
    </div>
  );
};

export default TeamsContent;
