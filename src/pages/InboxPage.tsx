
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import InboxContent from '@/components/inbox/InboxContent';
import { useInboxState } from '@/hooks/useInboxState';

const InboxPage = () => {
  const {
    selectedEmails,
    selectedEmail,
    activeTab,
    currentPage,
    totalPages,
    filteredEmails,
    currentEmail,
    unreadCount,
    handleSelectEmail,
    handleSelectAll,
    handleEmailClick,
    handleBackToList,
    handleTabChange,
    setCurrentPage,
  } = useInboxState();

  return (
    <AppLayout>
      <div className="flex-1 bg-background pl-2">
        <div className="h-full flex flex-col">
          <InboxContent
            selectedEmails={selectedEmails}
            selectedEmail={selectedEmail}
            activeTab={activeTab}
            currentPage={currentPage}
            totalPages={totalPages}
            filteredEmails={filteredEmails}
            currentEmail={currentEmail}
            unreadCount={unreadCount}
            onSelectEmail={handleSelectEmail}
            onSelectAll={handleSelectAll}
            onEmailClick={handleEmailClick}
            onBackToList={handleBackToList}
            onTabChange={handleTabChange}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default InboxPage;
