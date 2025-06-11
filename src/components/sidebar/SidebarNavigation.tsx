
import React from 'react';
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
  ChevronRight
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

const mainNavItems = [
  { icon: Home, label: 'Home', active: false },
  { icon: Inbox, label: 'Inbox', active: false },
  { icon: MessageSquare, label: 'Chat', active: false },
  { icon: Users, label: 'Teams', active: false },
  { icon: FileText, label: 'Docs', active: false },
  { icon: FileImage, label: 'Whiteboards', active: false },
  { icon: ClipboardList, label: 'Forms', active: false },
  { icon: Clock, label: 'Timesheets', active: false },
];

const SidebarNavigation = ({ isCollapsed, isOpen, onToggle }: SidebarNavigationProps) => {
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
