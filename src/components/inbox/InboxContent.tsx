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

const InboxContent = React.memo((props: InboxContentProps) => {
  const {
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
  } = props;

  const emailDetailContent = React.useMemo(() => {
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

  // Improved error handling and user guidance for non-UUID login flow
  if (error) {
    let extra = null;
    if (
      typeof error.message === "string" &&
      error.message.includes("user ID is not a real Supabase UUID")
    ) {
      extra = (
        <div className="text-xs text-muted-foreground mt-2 max-w-md text-center">
          Your current user ID is not a real Supabase UID, so emails cannot be loaded from the database.<br />
          To see real email data, please set up Supabase Auth and log in as a real user.<br />
          (Demo logins using "t0", "t1", etc. are not UUIDs and will not work with database-secured queries.)
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="text-sm text-red-500">Error loading emails.</span>
        {extra}
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
