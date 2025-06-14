
import React from 'react';
import { MoreHorizontal, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getInitials } from '@/utils/taskUtils';
import { getAvatarColor } from '@/utils/avatarColors';
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";
import TeamMemberContextMenu from './TeamMemberContextMenu';

// Updated TeamMember with crmRole + titleRole
interface TeamMember {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  crmRole: 'Admin' | 'Team' | 'Client';
  titleRole: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
}

interface TeamMemberRowProps {
  member: TeamMember;
  roles: string[];
  onRoleChange: (memberId: string, newTitleRole: string) => void;
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

const TeamMemberRow = ({ member, roles, onRoleChange }: TeamMemberRowProps) => {
  const getColor = (member: any) => getAvatarColor(member);

  // Placeholder handlers for demo (replace with real actions as needed)
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
          <div className="mt-0.5 pl-10 text-[11px] text-gray-500">
            CRM: <span className="font-semibold">{member.crmRole}</span>
          </div>
        </div>
        <div className="col-span-3 flex items-center gap-1 text-muted-foreground">
          <Mail className="w-3 h-3" />
          <span className="text-blue-600 hover:underline">{member.email}</span>
        </div>
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
          <div className="text-[11px] text-gray-400 pt-0.5">Title Role</div>
        </div>
        <div className="col-span-2 flex items-center text-muted-foreground">
          <span>{member.lastActive}</span>
        </div>
        <div className="col-span-2 flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
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
