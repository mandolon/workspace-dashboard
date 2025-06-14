import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Inbox, 
  MessageSquare, 
  Users, 
  Receipt, 
  FileImage, 
  ClipboardList, 
  Clock,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarNavigation = React.memo(({ isCollapsed, isOpen, onToggle }: SidebarNavigationProps) => {
  const navigate = useNavigate();

  const handleNavigateHome = useCallback(() => navigate('/'), [navigate]);
  const handleNavigateTasks = useCallback(() => navigate('/tasks'), [navigate]);
  const handleNavigateInbox = useCallback(() => navigate('/inbox'), [navigate]);
  const handleNavigateChat = useCallback(() => {}, []);
  const handleNavigateTeams = useCallback(() => navigate('/teams'), [navigate]);
  const handleNavigateInvoices = useCallback(() => navigate('/invoices'), [navigate]);
  const handleNavigateWhiteboards = useCallback(() => navigate('/whiteboards'), [navigate]);
  const handleNavigateTimesheets = useCallback(() => navigate('/timesheets'), [navigate]);
  const handleNavigateClientDashboard = useCallback(() => navigate('/client/dashboard'), [navigate]);
  const handleNavigateHelp = useCallback(() => navigate('/help'), [navigate]);

  const mainNavItems = useMemo(() => [
    { icon: Home, label: 'Home', active: false, onClick: handleNavigateHome },
    { icon: ClipboardList, label: 'Tasks', active: false, onClick: handleNavigateTasks },
    { icon: Inbox, label: 'Inbox', active: false, onClick: handleNavigateInbox },
    { icon: MessageSquare, label: 'Chat', active: false, onClick: handleNavigateChat },
    { icon: Users, label: 'Teams', active: false, onClick: handleNavigateTeams },
    { icon: Receipt, label: 'Invoices', active: false, onClick: handleNavigateInvoices },
    { icon: FileImage, label: 'Whiteboards', active: false, onClick: handleNavigateWhiteboards },
    { icon: Clock, label: 'Timesheets', active: false, onClick: handleNavigateTimesheets },
    { icon: LayoutDashboard, label: 'Client Dashboard', active: false, onClick: handleNavigateClientDashboard },
    { icon: HelpCircle, label: 'Help', active: false, onClick: handleNavigateHelp }
  ], [
    handleNavigateHome,
    handleNavigateTasks,
    handleNavigateInbox,
    handleNavigateChat,
    handleNavigateTeams,
    handleNavigateInvoices,
    handleNavigateWhiteboards,
    handleNavigateTimesheets,
    handleNavigateClientDashboard,
    handleNavigateHelp,
  ]);

  if (isCollapsed) {
    return (
      <nav className="flex-1 py-2 px-1 space-y-0">
        {mainNavItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-center p-2 rounded text-sm cursor-pointer transition-colors my-0.5",
              item.active 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
            onClick={item.onClick}
          >
            <item.icon className="w-4 h-4" />
          </div>
        ))}
      </nav>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="px-2 mb-2">
        <CollapsibleTrigger className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-sidebar-accent/50 rounded">
          {isOpen ? (
            <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
            Navigation
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <nav className="space-y-0 mt-2">
            {mainNavItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 px-3 py-1.5 rounded text-sm cursor-pointer transition-colors my-0",
                  item.active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                onClick={item.onClick}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{item.label}</span>
              </div>
            ))}
          </nav>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
});

SidebarNavigation.displayName = 'SidebarNavigation';

export default SidebarNavigation;
