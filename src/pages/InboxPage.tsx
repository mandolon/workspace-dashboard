
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import InboxHeader from "@/components/inbox/InboxHeader";
import InboxContent from "@/components/inbox/InboxContent";
import { useSupabaseInbox } from "@/hooks/useSupabaseInbox";

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
    setCurrentPage,
    handleSelectEmail,
    handleSelectAll,
    handleEmailClick,
    handleBackToList,
    handleTabChange,
    isLoading,
    error,
  } = useSupabaseInbox();

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
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
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default InboxPage;

