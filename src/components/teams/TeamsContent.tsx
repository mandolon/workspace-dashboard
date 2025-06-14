
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

const TeamsContent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Map TEAM_USERS into full table records for the CRM
  const teamMembers: TeamMember[] = TEAM_USERS.map(user => ({
    id: user.id,
    name: user.name,
    fullName: user.fullName,
    // Demo email from full name
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
    // For demo: would update role in state - here just console log for now
    console.log(`Role change requested for ${memberId}: ${newRole}`);
    // You can add state logic here if you want roles to be updated in UI as a demo
  };

  const handleAddMember = () => {
    // In a real app, this would open a modal or navigate to an add member form
    console.log('Add member clicked');
  };

  const filteredMembers = teamMembers.filter(member =>
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
        members={filteredMembers}
        roles={roles}
        onRoleChange={handleRoleChange}
      />
      <TeamMembersSummary
        filteredMembers={filteredMembers}
        totalMembers={teamMembers.length}
      />
    </div>
  );
};

export default TeamsContent;
