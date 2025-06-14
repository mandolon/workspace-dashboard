
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import InboxHeader from "@/components/inbox/InboxHeader";
import InboxContent from "@/components/inbox/InboxContent";
import { useInboxState } from "@/hooks/useInboxState";

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
      <div className="w-full max-w-5xl mx-auto py-6 px-4 h-full flex flex-col">
        <InboxHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          unreadCount={unreadCount}
        />
        <div className="flex-1 flex flex-col">
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

