
import React from 'react';
import { Inbox } from 'lucide-react';
import InboxTabs from './InboxTabs';

interface InboxHeaderProps {
  unreadCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const InboxHeader = ({ 
  unreadCount, 
  activeTab, 
  onTabChange, 
  currentPage, 
  totalPages, 
  onPageChange 
}: InboxHeaderProps) => {
  return (
    <div className="border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Inbox className="w-4 h-4 text-muted-foreground" />
          <h1 className="text-sm font-medium">Inbox</h1>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground">({unreadCount} unread)</span>
          )}
        </div>
      </div>
      <InboxTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default InboxHeader;
