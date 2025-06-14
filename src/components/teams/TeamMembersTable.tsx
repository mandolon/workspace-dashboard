
import React from 'react';
import TeamMemberRow from './TeamMemberRow';
import { TeamMember } from '@/utils/teamUsers';

interface TeamMembersTableProps {
  members: TeamMember[];
  roles: string[];
  onRoleChange: (memberId: string, newTitleRole: string) => void;
  isMobile?: boolean;
}

const TeamMembersTable = ({ members, roles, onRoleChange, isMobile }: TeamMembersTableProps) => {
  if (isMobile) {
    // Mobile: stack list vertically
    return (
      <div className="flex flex-col gap-2 mb-2">
        {members.map(member => (
          <TeamMemberRow
            key={member.id}
            member={member}
            roles={roles}
            onRoleChange={onRoleChange}
            isMobile={true}
          />
        ))}
      </div>
    );
  }

  // Desktop: Use table header/row layout
  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
        <div className="col-span-3">Name / CRM Role</div>
        <div className="col-span-3">Email</div>
        <div className="col-span-2">Title Role</div>
        <div className="col-span-2">Last Active</div>
        <div className="col-span-2">Status</div>
      </div>
      {members.map((member) => (
        <TeamMemberRow
          key={member.id}
          member={member}
          roles={roles}
          onRoleChange={onRoleChange}
          isMobile={false}
        />
      ))}
    </div>
  );
};

export default TeamMembersTable;
