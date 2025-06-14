import React from 'react';
import { MoreHorizontal, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getInitials } from '@/utils/taskUtils';
import { getAvatarColor } from '@/utils/avatarColors';
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";
import TeamMemberContextMenu from './TeamMemberContextMenu';
import { TeamMember } from '@/utils/teamUsers';

interface TeamMemberRowProps {
  member: TeamMember;
  roles: string[];
  onRoleChange: (memberId: string, newTitleRole: string) => void;
  isMobile?: boolean;
}

const getStatusColor = (status: 'Active' | 'Inactive' | 'Pending') => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700';
    case 'Inactive':
      return 'bg-gray-100 text-gray-500';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

const TeamMemberRow = ({ member, roles, onRoleChange, isMobile }: TeamMemberRowProps) => {
  const getColor = (member: any) => getAvatarColor(member);

  // Handlers
  const handleViewAsUser = () => {
    console.log(`View as user: ${member.fullName ?? member.name}`);
  };
  const handleEditUser = () => {
    console.log(`Edit user: ${member.fullName ?? member.name}`);
  };
  const handleRemoveUser = () => {
    console.log(`Remove user from team: ${member.fullName ?? member.name}`);
  };
  const handleSendMessage = () => {
    console.log(`Send message to user: ${member.fullName ?? member.name}`);
  };

  if (isMobile) {
    // Mobile layout: stack fields
    return (
      <TeamMemberContextMenu
        onViewAsUser={handleViewAsUser}
        onEditUser={handleEditUser}
        onRemoveUser={handleRemoveUser}
        onSendMessage={handleSendMessage}
      >
        <div className="rounded border shadow px-3 py-2 bg-card flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${getColor(member)} rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white`}>
              {getInitials(member.fullName ?? member.name)}
            </div>
            <div>
              <div className="font-medium">{member.fullName ?? member.name}</div>
              <div className="text-xs text-muted-foreground">{member.crmRole}</div>
            </div>
            <button className="ml-auto opacity-70">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <Mail className="w-3 h-3" />
            <span className="text-blue-600 break-all">{member.email}</span>
          </div>
          {/* Only show Role selection if NOT a client */}
          {member.crmRole !== 'Client' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Role:</span>
              <Select value={member.titleRole} onValueChange={(value) => onRoleChange(member.id, value)}>
                <SelectTrigger className="h-7 text-xs border border-border bg-accent/30 px-2 py-1 rounded shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role} className="text-xs">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Last Active: </span>
              {member.lastActive}
            </div>
            <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(member.status as any)}`}>
              {member.status}
            </span>
          </div>
        </div>
      </TeamMemberContextMenu>
    );
  }

  // Desktop layout
  return (
    <TeamMemberContextMenu
      onViewAsUser={handleViewAsUser}
      onEditUser={handleEditUser}
      onRemoveUser={handleRemoveUser}
      onSendMessage={handleSendMessage}
    >
      <div className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group">
        <div className="col-span-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${getColor(member)} rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white`}>
              {getInitials(member.fullName ?? member.name)}
            </div>
            <span className="font-medium">{member.fullName ?? member.name}</span>
          </div>
        </div>
        <div className="col-span-3 flex items-center gap-1 text-muted-foreground">
          <Mail className="w-3 h-3" />
          <span className="text-blue-600 hover:underline">{member.email}</span>
        </div>
        {/* Only show Title Role column if member is NOT a client */}
        {member.crmRole !== 'Client' && (
          <div className="col-span-2 flex flex-col">
            <Select value={member.titleRole} onValueChange={(value) => onRoleChange(member.id, value)}>
              <SelectTrigger className="h-6 text-xs border-0 shadow-none focus:ring-0 bg-transparent p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role} className="text-xs">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {/* Adjust the spans to keep the grid lining up */}
        <div className={member.crmRole === 'Client' ? "col-span-3 flex items-center text-muted-foreground" : "col-span-2 flex items-center text-muted-foreground"}>
          <span>{member.lastActive}</span>
        </div>
        <div className="col-span-2 flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status as any)}`}>
            {member.status}
          </span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      </div>
    </TeamMemberContextMenu>
  );
};

export default TeamMemberRow;
