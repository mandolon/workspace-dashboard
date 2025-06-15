
import React, { useMemo } from 'react';
import EmailDetail from '@/components/EmailDetail';
import InboxToolbar from './InboxToolbar';
import EmailList from './EmailList';
import { Email } from '@/types/email';

interface InboxContentProps {
  selectedEmails: string[];
  selectedEmail: string | null;
  activeTab: string;
  currentPage: number;
  totalPages: number;
  filteredEmails: Email[];
  currentEmail: Email | null;
  unreadCount: number;
  onSelectEmail: (emailId: string) => void;
  onSelectAll: () => void;
  onEmailClick: (emailId: string) => void;
  onBackToList: () => void;
  onTabChange: (tab: string) => void;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
}

const InboxContent = React.memo(({
  selectedEmails,
  selectedEmail,
  activeTab,
  currentPage,
  totalPages,
  filteredEmails,
  currentEmail,
  unreadCount,
  onSelectEmail,
  onSelectAll,
  onEmailClick,
  onBackToList,
  onTabChange,
  onPageChange,
  isLoading,
  error,
}: InboxContentProps) => {
  const emailDetailContent = useMemo(() => {
    if (selectedEmail && currentEmail) {
      return (
        <div className="h-full">
          <EmailDetail email={currentEmail} onBack={onBackToList} />
        </div>
      );
    }
    return null;
  }, [selectedEmail, currentEmail, onBackToList]);

  if (emailDetailContent) {
    return emailDetailContent;
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></span>
        <span className="mt-2 text-sm text-muted-foreground">Loading messages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="text-sm text-red-500">Error loading emails.</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 flex-1 flex flex-col border-b border-border">
        <InboxToolbar
          selectedEmails={selectedEmails}
          totalEmails={filteredEmails.length}
          onSelectAll={onSelectAll}
          activeTab={activeTab}
        />
        <EmailList
          emails={filteredEmails}
          selectedEmails={selectedEmails}
          onSelectEmail={onSelectEmail}
          onEmailClick={onEmailClick}
        />
      </div>
    </div>
  );
});

InboxContent.displayName = 'InboxContent';

export default InboxContent;

