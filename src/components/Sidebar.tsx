
import React from 'react';
import { 
  Home, 
  Inbox, 
  MessageSquare, 
  Users, 
  FileText, 
  BarChart3, 
  FileImage, 
  ClipboardList, 
  Target, 
  Clock,
  MoreHorizontal,
  Star,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const mainNavItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Inbox, label: 'Inbox', active: false },
    { icon: MessageSquare, label: 'Chat', active: false },
    { icon: Users, label: 'Teams', active: false },
    { icon: FileText, label: 'Docs', active: false },
    { icon: BarChart3, label: 'Dashboards', active: true },
    { icon: FileImage, label: 'Whiteboards', active: false },
    { icon: ClipboardList, label: 'Forms', active: false },
    { icon: Target, label: 'Goals', active: false },
    { icon: Clock, label: 'Timesheets', active: false },
    { icon: MoreHorizontal, label: 'More', active: false },
  ];

  const workspaces = [
    { name: 'PinerWorks', active: true },
    { name: 'In Progress', active: false },
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">R</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">rehome</span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors",
                item.active 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* Favorites Section */}
        {!isCollapsed && (
          <div className="mt-6 px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Favorites
              </span>
              <Star className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Spaces Section */}
        {!isCollapsed && (
          <div className="mt-6 px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Spaces
              </span>
              <Plus className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>
            <div className="space-y-1">
              {workspaces.map((workspace, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded text-sm cursor-pointer",
                    workspace.active 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-sm flex-shrink-0"></div>
                  <span className="truncate">{workspace.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
