
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import InboxTopBar from "@/components/inbox/InboxTopBar";
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
    searchQuery,
    handleSearchChange,
    isLoading,
    error,
  } = useSupabaseInbox();

  // Dummy toggle sidebar handler (customize if you have a sidebar)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <InboxTopBar
          onToggleSidebar={handleToggleSidebar}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
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

