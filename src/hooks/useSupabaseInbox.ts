
import { useState, useCallback } from "react";
import { Email } from "@/types/email";
import {
  useFetchEmails,
  useUnreadCount,
  useSendEmail,
  useMarkRead,
} from "./useEmailSupabaseQueries";

// State and view management for Inbox, separated from Supabase query logic
export function useSupabaseInbox() {
  const [activeTab, setActiveTab] = useState<Email["status"]>("inbox");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  // Data fetch via split-out hooks:
  const { data, isLoading, error } = useFetchEmails(activeTab, searchQuery, currentPage);
  const { data: unreadCount = 0 } = useUnreadCount();
  const sendEmail = useSendEmail();
  const markRead = useMarkRead();

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId) ? prev.filter((id) => id !== emailId) : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    if (!data) return;
    setSelectedEmails(
      selectedEmails.length === data.length ? [] : data.map((e) => e.id)
    );
  };

  const handleEmailClick = (emailId: string) => {
    setSelectedEmailId(emailId);
    markRead.mutateAsync(emailId);
  };

  const handleBackToList = () => {
    setSelectedEmailId(null);
  };

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as Email["status"]);
    setCurrentPage(1);
    setSelectedEmailId(null);
    setSelectedEmails([]);
  }, []);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
    setSelectedEmails([]);
    setSelectedEmailId(null);
  };

  // Supabase paginates, mock totalPages for demo
  const totalPages = 5;
  const currentEmail =
    selectedEmailId && data
      ? data.find((e) => e.id === selectedEmailId) || null
      : null;

  return {
    selectedEmails,
    selectedEmail: selectedEmailId,
    activeTab,
    currentPage,
    searchQuery,
    filteredEmails: data || [],
    currentEmail,
    unreadCount,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
    handleSelectEmail,
    handleSelectAll,
    handleEmailClick,
    handleBackToList,
    handleTabChange,
    handleSearchChange,
    sendEmail, // mutation to send or save draft
  };
}
