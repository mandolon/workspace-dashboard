
import React from 'react';
import { Bell, BellOff, Settings, Keyboard, Download, HelpCircle, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/user';
import UserAvatar from './UserAvatar';
import UserStatusMenu from './UserStatusMenu';

interface UserDropdownMenuProps {
  user: User;
  onStatusChange: (status: User['status']) => void;
  onToggleNotifications: () => void;
}

const UserDropdownMenu = ({ user, onStatusChange, onToggleNotifications }: UserDropdownMenuProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenuContent align="end" className="w-64">
      {/* User Info Section */}
      <DropdownMenuLabel>
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="md" />
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </DropdownMenuLabel>
      
      <DropdownMenuSeparator />
      
      {/* Status Controls */}
      <UserStatusMenu currentStatus={user.status} onStatusChange={onStatusChange} />
      
      <DropdownMenuItem onClick={onToggleNotifications}>
        {user.notificationsMuted ? (
          <Bell className="w-4 h-4 mr-2" />
        ) : (
          <BellOff className="w-4 h-4 mr-2" />
        )}
        {user.notificationsMuted ? 'Unmute notifications' : 'Mute notifications'}
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      {/* Navigation */}
      <DropdownMenuItem onClick={() => navigate('/settings')}>
        <Settings className="w-4 h-4 mr-2" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div className="w-4 h-4 mr-2" />
        Themes
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate('/settings')}>
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate('/settings/notifications')}>
        <Bell className="w-4 h-4 mr-2" />
        Notification settings
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      {/* Utilities */}
      <DropdownMenuItem>
        <Keyboard className="w-4 h-4 mr-2" />
        Keyboard shortcuts
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div className="w-4 h-4 mr-2" />
        Referrals
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Download className="w-4 h-4 mr-2" />
        Download apps
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      {/* Help */}
      <DropdownMenuItem>
        <HelpCircle className="w-4 h-4 mr-2" />
        Help
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      {/* Important Actions */}
      <DropdownMenuItem onClick={() => navigate('/settings?tab=trash')}>
        <Trash2 className="w-4 h-4 mr-2" />
        Trash
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-600">
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UserDropdownMenu;
