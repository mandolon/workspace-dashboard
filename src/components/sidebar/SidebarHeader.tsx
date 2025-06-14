
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserDropdownMenu from './UserDropdownMenu';
// Removed: import UserAvatar from './UserAvatar';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  const { currentUser, updateUserStatus, toggleNotifications } = useUser();

  // Debug logging
  console.log('SidebarHeader - currentUser:', currentUser);

  if (isCollapsed) {
    return (
      <div className="px-4 py-3 border-b border-sidebar-border flex flex-col items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 hover:bg-accent rounded-md transition-colors">
            {/* Only show chevron arrow in collapsed mode */}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <UserDropdownMenu
            user={currentUser}
            onStatusChange={updateUserStatus}
            onToggleNotifications={toggleNotifications}
          />
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-sidebar-border">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-accent px-2 py-1 rounded-md transition-colors w-full">
          <div className="flex items-center gap-2 flex-grow">
            {/* Avatar hidden in expanded mode */}
            <div className="text-left">
              <div className="text-sm font-medium">{currentUser.name}</div>
              <div className="text-xs text-muted-foreground">{currentUser.company}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
          </div>
        </DropdownMenuTrigger>
        <UserDropdownMenu
          user={currentUser}
          onStatusChange={updateUserStatus}
          onToggleNotifications={toggleNotifications}
        />
      </DropdownMenu>
    </div>
  );
};

export default SidebarHeader;
