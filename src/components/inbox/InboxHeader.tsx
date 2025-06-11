
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
          <Inbox className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Inbox</h1>
          <span className="text-sm text-muted-foreground">({unreadCount} unread)</span>
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;
