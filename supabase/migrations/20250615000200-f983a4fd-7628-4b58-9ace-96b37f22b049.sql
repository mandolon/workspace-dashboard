
-- 1. Create table "emails" for storing all user emails
CREATE TABLE public.emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL, -- user ID from auth.users
  sender_name text NOT NULL,
  sender_email text,
  recipient_id uuid,             -- null if not "to" a single user (for CC/BCC support, see below)
  recipient text,                -- fallback for human-readable recipient display
  to_emails text[],              -- supports multiple recipients for CC/BCC
  subject text NOT NULL,
  preview text,
  content text,
  time timestamptz DEFAULT now(),
  is_read boolean DEFAULT false,
  is_starred boolean DEFAULT false,
  has_attachment boolean DEFAULT false,
  status text NOT NULL, -- 'inbox' | 'drafts' | 'sent' | 'archive' | 'trash'
  avatar text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Allow users to see emails only if they are the sender or among the recipients
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

-- SELECT: Sender can see all their sent and draft emails; recipients can see received emails
CREATE POLICY "Users can read their emails"
  ON public.emails
  FOR SELECT
  USING (
    sender_id = auth.uid()
    OR recipient_id = auth.uid()
    OR (to_emails IS NOT NULL AND auth.uid()::text = ANY(to_emails))
  );

-- INSERT: Sender can insert only as themselves
CREATE POLICY "User can send/create emails"
  ON public.emails
  FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
  );

-- UPDATE: Sender can update their sent/drafts, recipient can mark as read/starred in their own inbox
CREATE POLICY "User can update own sent/drafts, or mark as read/starred"
  ON public.emails
  FOR UPDATE
  USING (
    sender_id = auth.uid()
    OR recipient_id = auth.uid()
    OR (to_emails IS NOT NULL AND auth.uid()::text = ANY(to_emails))
  );

-- DELETE: Allow sender or recipient to delete (move to trash)
CREATE POLICY "User can delete their emails"
  ON public.emails
  FOR DELETE
  USING (
    sender_id = auth.uid()
    OR recipient_id = auth.uid()
    OR (to_emails IS NOT NULL AND auth.uid()::text = ANY(to_emails))
  );
