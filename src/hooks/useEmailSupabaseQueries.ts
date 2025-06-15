
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Email } from "@/types/email";
import { useUser } from "@/contexts/UserContext";

// Helper to check for valid UUID (very strict, expects canonical format)
function isValidUUID(uuid: string | undefined | null): boolean {
  return !!uuid && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);
}

export function useFetchEmails(activeTab: Email["status"], searchQuery: string, currentPage: number) {
  const { currentUser } = useUser();
  const perPage = 20;

  // Check for invalid user ID before starting any query
  const skipQuery = !currentUser || !isValidUUID(currentUser.id);

  return useQuery({
    queryKey: ["emails", { uid: currentUser?.id, activeTab, searchQuery, page: currentPage }],
    queryFn: async () => {
      if (!currentUser || !isValidUUID(currentUser.id)) {
        throw new Error(
          "Your user ID is not a real Supabase UUID, so email querying is not enabled. Please add real users via Supabase Auth for full functionality."
        );
      }
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
        q = q.or([
          `subject.ilike.%${searchQuery}%`,
          `sender_name.ilike.%${searchQuery}%`,
          `preview.ilike.%${searchQuery}%`
        ].join(","));
      }

      const { data, error } = await q;
      if (error) {
        console.error("Supabase error loading emails:", error);
        throw error;
      }
      return (data as Email[]) || [];
    },
    enabled: !skipQuery,
    staleTime: 60 * 1000,
  });
}

export function useUnreadCount() {
  const { currentUser } = useUser();

  const skipQuery = !currentUser || !isValidUUID(currentUser.id);

  return useQuery({
    queryKey: ["emails-unread", { uid: currentUser?.id }],
    queryFn: async () => {
      if (!currentUser || !isValidUUID(currentUser.id)) return 0;
      let q = supabase
        .from("emails")
        .select("id", { count: "exact", head: true })
        .or(
          `recipient_id.eq.${currentUser.id},to_emails.cs.{${currentUser.id}}`
        )
        .eq("is_read", false)
        .eq("status", "inbox");
      const { count, error } = await q;
      if (error) {
        console.error("Supabase error loading unread count:", error);
        return 0;
      }
      return count || 0;
    },
    enabled: !skipQuery,
    staleTime: 30 * 1000,
  });
}

export function useSendEmail() {
  const queryClient = useQueryClient();
  const { currentUser } = useUser();
  return useMutation({
    mutationFn: async (email: Partial<Email> & { content: string }) => {
      if (!currentUser || !isValidUUID(currentUser.id)) throw new Error("Not logged in or user id is invalid.");
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
      if (error) {
        console.error("Supabase error sending email:", error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      queryClient.invalidateQueries({ queryKey: ["emails-unread"] });
    },
  });
}

export function useMarkRead() {
  const queryClient = useQueryClient();
  const { currentUser } = useUser();
  return useMutation({
    mutationFn: async (email_id: string) => {
      if (!currentUser || !isValidUUID(currentUser.id)) throw new Error("Not logged in or user id is invalid.");
      const { error } = await supabase
        .from("emails")
        .update({ is_read: true })
        .eq("id", email_id);
      if (error) {
        console.error("Supabase error marking email as read:", error);
        throw error;
      }
      return email_id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      queryClient.invalidateQueries({ queryKey: ["emails-unread"] });
    },
  });
}
