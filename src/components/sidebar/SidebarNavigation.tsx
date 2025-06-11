
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Inbox, 
  MessageSquare, 
  Users, 
  FileText, 
  FileImage, 
  ClipboardList, 
  Clock,
  ChevronDown,
  ChevronRight,
  TrendingUp
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

const SidebarNavigation = ({ isCollapsed, isOpen, onToggle }: SidebarNavigationProps) => {
  const navigate = useNavigate();

  const mainNavItems = [
    { icon: Home, label: 'Home', active: false, onClick: () => navigate('/') },
    { icon: TrendingUp, label: 'In Progress', active: false, onClick: () => navigate('/') },
    { icon: Inbox, label: 'Inbox', active: false, onClick: () => {} },
    { icon: MessageSquare, label: 'Chat', active: false, onClick: () => {} },
    { icon: Users, label: 'Teams', active: false, onClick: () => {} },
    { icon: FileText, label: 'Docs', active: false, onClick: () => {} },
    { icon: FileImage, label: 'Whiteboards', active: false, onClick: () => {} },
    { icon: ClipboardList, label: 'Forms', active: false, onClick: () => {} },
    { icon: Clock, label: 'Timesheets', active: false, onClick: () => {} },
  ];

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
                  "flex items-center gap-3 px-3 py-2 rounded text-sm cursor-pointer transition-colors my-0.5",
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
};

export default SidebarNavigation;
