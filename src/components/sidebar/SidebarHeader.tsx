import React from 'react';
import { ChevronDown, Circle, Bell, BellOff, Settings, Keyboard, Download, HelpCircle, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  const navigate = useNavigate();
  const { currentUser, updateUserStatus, toggleNotifications } = useUser();
  
  // Debug logging
  console.log('SidebarHeader - currentUser:', currentUser);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'busy': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'busy': return 'Busy';
      default: return 'Offline';
    }
  };

  if (isCollapsed) {
    return (
      <div className="px-4 py-3 border-b border-sidebar-border flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center hover:bg-accent rounded-md transition-colors">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {currentUser.avatar}
              </div>
              <Circle className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${getStatusColor(currentUser.status)} fill-current`} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {/* User Info Section */}
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                    {currentUser.avatar}
                  </div>
                  <Circle className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${getStatusColor(currentUser.status)} fill-current`} />
                </div>
                <div>
                  <div className="font-semibold">{currentUser.name}</div>
                  <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            {/* Status Controls */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Circle className={`w-4 h-4 mr-2 ${getStatusColor(currentUser.status)} fill-current`} />
                Set status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => updateUserStatus('online')}>
                  <Circle className="w-4 h-4 mr-2 text-green-500 fill-current" />
                  Online
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateUserStatus('away')}>
                  <Circle className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                  Away
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateUserStatus('busy')}>
                  <Circle className="w-4 h-4 mr-2 text-red-500 fill-current" />
                  Busy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateUserStatus('offline')}>
                  <Circle className="w-4 h-4 mr-2 text-gray-400 fill-current" />
                  Offline
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuItem onClick={toggleNotifications}>
              {currentUser.notificationsMuted ? (
                <Bell className="w-4 h-4 mr-2" />
              ) : (
                <BellOff className="w-4 h-4 mr-2" />
              )}
              {currentUser.notificationsMuted ? 'Unmute notifications' : 'Mute notifications'}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* Navigation */}
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="w-4 h-4 mr-2" /> {/* Spacer for themes icon */}
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
              <div className="w-4 h-4 mr-2" /> {/* Spacer for referrals icon */}
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
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-sidebar-border">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-accent px-2 py-1 rounded-md transition-colors w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="text-left flex-1">
              <div className="text-sm font-medium">{currentUser.name}</div>
              <div className="text-xs text-muted-foreground text-right">{currentUser.role}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {/* User Info Section */}
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                  {currentUser.avatar}
                </div>
                <Circle className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${getStatusColor(currentUser.status)} fill-current`} />
              </div>
              <div>
                <div className="font-semibold">{currentUser.name}</div>
                <div className="text-sm text-muted-foreground">{currentUser.email}</div>
              </div>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {/* Status Controls */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Circle className={`w-4 h-4 mr-2 ${getStatusColor(currentUser.status)} fill-current`} />
              Set status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => updateUserStatus('online')}>
                <Circle className="w-4 h-4 mr-2 text-green-500 fill-current" />
                Online
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateUserStatus('away')}>
                <Circle className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                Away
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateUserStatus('busy')}>
                <Circle className="w-4 h-4 mr-2 text-red-500 fill-current" />
                Busy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateUserStatus('offline')}>
                <Circle className="w-4 h-4 mr-2 text-gray-400 fill-current" />
                Offline
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuItem onClick={toggleNotifications}>
            {currentUser.notificationsMuted ? (
              <Bell className="w-4 h-4 mr-2" />
            ) : (
              <BellOff className="w-4 h-4 mr-2" />
            )}
            {currentUser.notificationsMuted ? 'Unmute notifications' : 'Mute notifications'}
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
      </DropdownMenu>
    </div>
  );
};

export default SidebarHeader;
