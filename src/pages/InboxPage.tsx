
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import InboxHeader from "@/components/inbox/InboxHeader";
import InboxContent from "@/components/inbox/InboxContent";
import { useSupabaseInbox } from "@/hooks/useSupabaseInbox";
import { Button } from "@/components/ui/button";
import ComposeDialog from "@/components/inbox/ComposeDialog";

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

  // Floating Compose dialog state
  const [showComposeDialog, setShowComposeDialog] = useState(false);

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
        {/* Floating Compose Button */}
        <Button
          size="lg"
          className="fixed z-50 bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 shadow-xl animate-scale-in"
          onClick={() => setShowComposeDialog(true)}
        >
          Compose
        </Button>
        {/* Compose Dialog */}
        <ComposeDialog
          isOpen={showComposeDialog}
          onClose={() => setShowComposeDialog(false)}
        />
      </div>
    </AppLayout>
  );
};

export default InboxPage;

