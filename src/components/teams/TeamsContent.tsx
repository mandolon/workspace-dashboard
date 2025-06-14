import React, { useState } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';
import { TEAM_USERS, TeamMember } from '@/utils/teamUsers';
import { ArchitectureRole } from '@/types/roles';

// Helper for last active/ status for demo purposes
const memberStatus: Record<string, { lastActive: string; status: 'Active' | 'Inactive' | 'Pending' }> = {
  'AL': { lastActive: 'Jun 2, 2025', status: 'Active' },
  'MP': { lastActive: 'Jun 3, 2025', status: 'Active' },
  'SS': { lastActive: 'May 28, 2025', status: 'Active' },
  'JJ': { lastActive: 'Jun 1, 2025', status: 'Inactive' },
  'RH': { lastActive: 'May 30, 2025', status: 'Pending' },
  'JH': { lastActive: 'May 29, 2025', status: 'Active' }
};

interface TeamsContentProps {
  tab: "admin" | "team";
  selectedUserId?: string;
}

// We will map CRM role to filter for tab
const getCrmRoleForTab = (tab: "admin" | "team") => {
  if (tab === "admin") return ["Admin"];
  if (tab === "team") return ["Team"];
  return [];
};

const TeamsContent = ({ tab, selectedUserId }: TeamsContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Store team members as local state so we can update titleRole
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    TEAM_USERS.map(user => ({
      ...user,
      lastActive: memberStatus[user.name]?.lastActive || '—',
      status: memberStatus[user.name]?.status || 'Active'
    }))
  );

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
