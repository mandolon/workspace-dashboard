
import React from 'react';
import { Inbox } from 'lucide-react';

interface InboxHeaderProps {
  unreadCount: number;
}

const InboxHeader = ({ unreadCount }: InboxHeaderProps) => {
  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Inbox className="w-4 h-4 text-muted-foreground" />
          <h1 className="text-sm font-medium">Inbox</h1>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground">({unreadCount} unread)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;
