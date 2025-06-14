
import React from 'react';
import { HelpCircle } from 'lucide-react';
import InviteDialog from './InviteDialog';

const SidebarFooter = () => {
  return (
    <div className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <InviteDialog triggerButtonClassName="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground" />
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground">
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Help</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;
