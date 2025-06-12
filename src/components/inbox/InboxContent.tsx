
import React from 'react';
import EmailDetail from '@/components/EmailDetail';
import InboxHeader from './InboxHeader';
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
}

const InboxContent = ({
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
}: InboxContentProps) => {
  if (selectedEmail && currentEmail) {
    return <EmailDetail email={currentEmail} onBack={onBackToList} />;
  }

  return (
    <>
      <InboxHeader 
        unreadCount={unreadCount}
        activeTab={activeTab}
        onTabChange={onTabChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <InboxToolbar 
        selectedEmails={selectedEmails}
        totalEmails={filteredEmails.length}
        onSelectAll={onSelectAll}
      />
      <EmailList 
        emails={filteredEmails}
        selectedEmails={selectedEmails}
        onSelectEmail={onSelectEmail}
        onEmailClick={onEmailClick}
      />
    </>
  );
};

export default InboxContent;
