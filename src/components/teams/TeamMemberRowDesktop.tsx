
import React from 'react';
import { MoreHorizontal, Mail, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TeamMemberContextMenu from './TeamMemberContextMenu';
import { TeamMember } from '@/utils/teamUsers';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Avatar from "@/components/common/Avatar";

interface TeamMemberRowDesktopProps {
  member: TeamMember;
  roles: string[];
  onRoleChange: (memberId: string, newTitleRole: string) => void;
  projectId: string;
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

const TeamMemberRowDesktop: React.FC<TeamMemberRowDesktopProps> = ({
  member,
  roles,
  onRoleChange,
  projectId,
}) => {
  const navigate = useNavigate();
  const { impersonateAs, isImpersonating, impersonatedUser, currentUser } = useUser();

  const handleViewAsUser = () => {
    if (!isImpersonating || (impersonatedUser && impersonatedUser.id !== member.id)) {
      impersonateAs(member.id);
    }
  };

  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (member.crmRole === 'Client') {
      navigate(`/project/${projectId}`, { state: { returnToTab: "client" } });
    }
  };

  return (
    <TeamMemberContextMenu
      onViewAsUser={handleViewAsUser}
      onEditUser={() => {}}
      onRemoveUser={() => {}}
      onSendMessage={() => {}}
    >
      <div
        className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group"
        onClick={handleRowClick}
        role="button"
        tabIndex={0}
      >
        <div className="col-span-3">
          <div className="flex items-center gap-2">
            <Avatar
              initials={member.initials}
              avatarUrl={member.avatarUrl}
              color={member.avatarColor || "bg-blue-500"}
              size={32}
            />
            <span className="font-medium">{member.fullName ?? member.name}</span>
          </div>
        </div>
        <div className="col-span-3 flex items-center gap-1 text-muted-foreground">
          <Mail className="w-3 h-3" />
          <span className="text-blue-600 hover:underline">{member.email}</span>
        </div>
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
        <div className={member.crmRole === 'Client' ? "col-span-3 flex items-center text-muted-foreground" : "col-span-2 flex items-center text-muted-foreground"}>
          <span>{member.lastActive}</span>
        </div>
        <div className="col-span-2 flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status as any)}`}>
            {member.status}
          </span>
          {(member.crmRole !== 'Client') ? (
            <button
              className="opacity-80 hover:opacity-100 transition-opacity p-1 rounded"
              title="View as user"
              onClick={e => {
                e.stopPropagation();
                handleViewAsUser();
              }}
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
            </button>
          ) : (
            <span className="w-3 h-3" />
          )}
        </div>
      </div>
    </TeamMemberContextMenu>
  );
};

export default TeamMemberRowDesktop;
