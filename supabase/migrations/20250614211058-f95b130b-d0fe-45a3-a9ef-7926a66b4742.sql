
-- 1. Create the task_messages table for chat messages on tasks
CREATE TABLE public.task_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Basic index for improved fetch performance
CREATE INDEX idx_task_messages_task_id ON public.task_messages (task_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.task_messages ENABLE ROW LEVEL SECURITY;

-- 4. Allow only users who have access to the referenced task the ability to read/insert
-- (For demo: reference tasks table and re-use same logic for select/insert)
CREATE POLICY "Can view messages if can view task"
  ON public.task_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tasks t
      WHERE t.task_id = task_messages.task_id
    )
  );

CREATE POLICY "Can insert if can view task"
  ON public.task_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tasks t
      WHERE t.task_id = task_messages.task_id
    )
  );

-- 5. Allow updating/deleting only by message sender (user_id)
CREATE POLICY "User can update own message"
  ON public.task_messages
  FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims', true));

CREATE POLICY "User can delete own message"
  ON public.task_messages
  FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true));

-- 6. Enable real-time for chat
ALTER TABLE public.task_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.task_messages;
