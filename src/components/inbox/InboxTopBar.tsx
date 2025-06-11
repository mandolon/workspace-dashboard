
import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InboxTopBarProps {
  onToggleSidebar: () => void;
}

const InboxTopBar = ({ onToggleSidebar }: InboxTopBarProps) => {
  return (
    <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-accent rounded-md transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search mail"
            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
          Compose
        </Button>
      </div>
    </div>
  );
};

export default InboxTopBar;
