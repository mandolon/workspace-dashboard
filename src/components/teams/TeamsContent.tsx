
import React, { useState } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const TeamsContent = () => {
  console.log('TeamsContent component is rendering');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Stephanie Sharkey',
      email: 'steph56@gmail.com',
      role: 'Architect',
      lastActive: 'Jul 31, 2024',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Joshua Jones',
      email: 'jjones@aol.com',
      role: 'Engineer',
      lastActive: 'Aug 17, 2024',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Rhonda Rhodes',
      email: 'rhodes@outlook.com',
      role: 'Consultant',
      lastActive: 'Aug 11, 2024',
      status: 'Active'
    },
    {
      id: '4',
      name: 'James Hall',
      email: 'j.hall367@outlook.com',
      role: 'Designer',
      lastActive: 'Aug 2, 2024',
      status: 'Inactive'
    },
    {
      id: '5',
      name: 'Corina McCoy',
      email: 'mc.coy@aol.com',
      role: 'Designer',
      lastActive: 'Jul 23, 2024',
      status: 'Pending'
    }
  ]);

  const roles = ['Architect', 'Engineer', 'Designer', 'Consultant', 'Manager', 'Admin'];

  const handleRoleChange = (memberId: string, newRole: string) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleAddMember = () => {
    // In a real app, this would open a modal or navigate to an add member form
    console.log('Add member clicked');
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
