
import React, { useState } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';
import { TEAM_USERS } from '@/utils/teamUsers';
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

export type TeamMember = {
  id: string;
  name: string;
  fullName: string;
  email: string;
  role: ArchitectureRole;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
};

interface TeamsContentProps {
  tab: "admin" | "team";
}

const ADMIN_NAME = 'Armando Lopez';

const TeamsContent = ({ tab }: TeamsContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Map TEAM_USERS into full table records for the CRM
  const teamMembers: TeamMember[] = TEAM_USERS.map(user => ({
    id: user.id,
    name: user.name,
    fullName: user.fullName,
    email: `${user.fullName.replace(/ /g, '.').toLowerCase()}@example.com`,
    role: user.role,
    lastActive: memberStatus[user.name]?.lastActive || '—',
    status: memberStatus[user.name]?.status || 'Active',
    avatar: user.avatar
  }));

  const roles = [
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

  const handleRoleChange = (memberId: string, newRole: string) => {
    console.log(`Role change requested for ${memberId}: ${newRole}`);
  };

  const handleAddMember = () => {
    console.log('Add member clicked');
  };

  // Filter based on tab: show only admin for Admin tab, only non-admins for Team tab
  let filteredMembers: TeamMember[];
  if (tab === "admin") {
    filteredMembers = teamMembers.filter(m => m.fullName === ADMIN_NAME);
  } else {
    filteredMembers = teamMembers.filter(m => m.fullName !== ADMIN_NAME);
  }

  // Apply search filter
  const displayedMembers = filteredMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
