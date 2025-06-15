
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { Email } from "@/types/email";
import { useState, useCallback } from "react";

export function useSupabaseInbox() {
  const { currentUser } = useUser();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Email["status"]>("inbox");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch emails for user (either sent or received)
  const { data, isLoading, error } = useQuery({
    queryKey: ["emails", { uid: currentUser?.id, activeTab, searchQuery, page: currentPage }],
    queryFn: async () => {
      if (!currentUser) return [];
      let q = supabase
        .from("emails")
        .select("*")
        .order("time", { ascending: false })
        .range((currentPage - 1) * perPage, currentPage * perPage - 1);

      if (activeTab === "sent") {
        q = q.eq("sender_id", currentUser.id).eq("status", "sent");
      } else if (activeTab === "drafts") {
        q = q.eq("sender_id", currentUser.id).eq("status", "drafts");
      } else if (activeTab === "archive") {
        q = q.or(
          `recipient_id.eq.${currentUser.id},to_emails.cs.{${currentUser.id}}`
        ).eq("status", "archive");
      } else if (activeTab === "trash") {
        q = q.or(
          `recipient_id.eq.${currentUser.id},to_emails.cs.{${currentUser.id}}`
        ).eq("status", "trash");
      } else {
        // inbox: received, not trash/archive/sent/drafts
        q = q
          .or(
            `recipient_id.eq.${currentUser.id},to_emails.cs.{${currentUser.id}}`
          )
          .eq("status", "inbox");
      }

      if (searchQuery) {
        // For demo: search by subject, sender, preview
        q = q.or(
          [
            `subject.ilike.%${searchQuery}%`,
            `sender_name.ilike.%${searchQuery}%`,
            `preview.ilike.%${searchQuery}%`
          ].join(",")
        );
      }
      const { data, error } = await q;
      if (error) throw error;
      return (data as Email[]) || [];
    },
    enabled: !!currentUser,
    staleTime: 60 * 1000,
  });

  // Unread count: refetches for each tab
  const { data: unreadCount } = useQuery({
    queryKey: ["emails-unread", { uid: currentUser?.id }],
    queryFn: async () => {
      if (!currentUser) return 0;
      let q = supabase
        .from("emails")
        .select("id", { count: "exact", head: true })
        .or(
          `recipient_id.eq.${currentUser.id},to_emails.cs.{${currentUser.id}}`
        )
        .eq("is_read", false)
        .eq("status", "inbox");
      const { count, error } = await q;
      if (error) return 0;
      return count || 0;
    },
    enabled: !!currentUser,
    staleTime: 30 * 1000,
  });

  // Compose/send/save draft
  const sendEmail = useMutation({
    mutationFn: async (email: Partial<Email> & { content: string }) => {
      if (!currentUser) throw new Error("Not logged in");
      const { to_emails, subject, content, status = "sent", ...rest } = email;
      const preview =
        content.replace(/<[^>]+>/g, "").slice(0, 80) + (content.length > 80 ? "..." : "");
      const { error, data } = await supabase.from("emails").insert([
        {
          sender_id: currentUser.id,
          sender_name: currentUser.name,
          sender_email: currentUser.email,
          to_emails,
          subject,
          content,
          preview,
          status,
          ...rest,
        },
      ]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      queryClient.invalidateQueries({ queryKey: ["emails-unread"] });
    },
  });

  const markRead = useMutation({
    mutationFn: async (email_id: string) => {
      if (!currentUser) throw new Error("Not logged in");
      const { error } = await supabase
        .from("emails")
        .update({ is_read: true })
        .eq("id", email_id);
      if (error) throw error;
      return email_id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      queryClient.invalidateQueries({ queryKey: ["emails-unread"] });
    },
  });

  // For selecting in UI
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

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

  // Paging (Supabase returns all results for now, mock 5 pages)
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
    unreadCount: unreadCount ?? 0,
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
