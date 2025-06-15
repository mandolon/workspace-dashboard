
import React from 'react';
import { Circle } from 'lucide-react';
import { User } from '@/types/user';
import Avatar from "@/components/common/Avatar";

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md';
  showStatus?: boolean;
}

const UserAvatar = ({ user, size = 'md', showStatus = true }: UserAvatarProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'busy': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const sizeMap = { sm: 36, md: 48 };
  const px = sizeMap[size];

  return (
    <div className="relative">
      <Avatar initials={user.initials} avatarUrl={user.avatarUrl} color={user.avatarColor || "bg-blue-500"} size={px} />
      {showStatus && (
        <Circle className={`absolute -bottom-0.5 -right-0.5 ${getStatusColor(user.status)} fill-current`} size={px / 4} />
      )}
    </div>
  );
};

export default UserAvatar;
