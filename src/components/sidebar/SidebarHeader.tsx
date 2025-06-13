
import React from 'react';
import { Circle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  const { currentUser } = useUser();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'busy': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  if (isCollapsed) {
    return (
      <div className="px-4 py-3 border-b border-sidebar-border flex justify-center">
        <div className="relative">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {currentUser.avatar}
          </div>
          <Circle className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${getStatusColor(currentUser.status)} fill-current`} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-sidebar-border">
      <div className="inline-flex flex-col">
        <div className="text-sm font-medium">{currentUser.name}</div>
        <div className="text-xs text-muted-foreground self-end">{currentUser.role}</div>
      </div>
    </div>
  );
};

export default SidebarHeader;
