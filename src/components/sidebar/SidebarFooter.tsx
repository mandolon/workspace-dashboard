
import React from 'react';
import { UserPlus, HelpCircle } from 'lucide-react';

const SidebarFooter = () => {
  return (
    <div className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground">
          <UserPlus className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Invite</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground">
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Help</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;
