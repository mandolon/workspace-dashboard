
import React from 'react';
import { MoreHorizontal, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRandomColor } from '@/utils/taskUtils';

interface TeamMember {
  id: string;
  name: string;
  fullName?: string; // Make this optional for legacy compatibility
  email: string;
  role: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface TeamMemberRowProps {
  member: TeamMember;
  roles: string[];
  onRoleChange: (memberId: string, newRole: string) => void;
}

const getInitials = (fullName?: string, name?: string) => {
  if (fullName) {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName[0]?.toUpperCase() ?? '';
  }
  if (name) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() ?? '';
  }
  return '';
};

const TeamMemberRow = ({ member, roles, onRoleChange }: TeamMemberRowProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Inactive':
        return 'text-gray-600 bg-gray-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group">
      <div className="col-span-3">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 ${getRandomColor(member.id)} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
            {getInitials(member.fullName, member.name)}
          </div>
          <span className="font-medium">{member.fullName ?? member.name}</span>
        </div>
      </div>
      <div className="col-span-3 flex items-center gap-1 text-muted-foreground">
        <Mail className="w-3 h-3" />
        <span className="text-blue-600 hover:underline">{member.email}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <Select value={member.role} onValueChange={(value) => onRoleChange(member.id, value)}>
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
  );
};

export default TeamMemberRow;

