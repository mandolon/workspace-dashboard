
export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment?: boolean;
  status: 'inbox' | 'drafts' | 'sent' | 'archive' | 'trash';
  avatar?: string;
  content?: string;
  senderEmail?: string;
  recipient?: string;

  // These properties are required for Supabase integration:
  to_emails?: string[];         // supports multiple recipients for CC/BCC
  sender_id?: string;           // user ID from auth.users
  sender_name?: string;
  recipient_id?: string;        // used for direct recipient lookups
  // Also included in table for better type compatibility
  created_at?: string;
  updated_at?: string;
}
