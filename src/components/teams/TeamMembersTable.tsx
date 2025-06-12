
import React from 'react';
import TeamMemberRow from './TeamMemberRow';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface TeamMembersTableProps {
  members: TeamMember[];
  roles: string[];
  onRoleChange: (memberId: string, newRole: string) => void;
}

const TeamMembersTable = ({ members, roles, onRoleChange }: TeamMembersTableProps) => {
  return (
    <div className="space-y-0.5">
      {/* Header Row */}
      <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Email</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">Last Active</div>
        <div className="col-span-2">Status</div>
      </div>
      
      {/* Member Rows */}
      {members.map((member) => (
        <TeamMemberRow
          key={member.id}
          member={member}
          roles={roles}
          onRoleChange={onRoleChange}
        />
      ))}
    </div>
  );
};

export default TeamMembersTable;
