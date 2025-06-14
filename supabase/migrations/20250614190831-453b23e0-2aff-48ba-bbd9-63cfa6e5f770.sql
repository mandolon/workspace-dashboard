
-- 1. Drop the previous tasks table if it partially succeeded or was created incorrectly
DROP TABLE IF EXISTS public.tasks;

-- 2. Create the correct tasks table with collaborators as a JSONB array (not a Postgres array of JSONB)
CREATE TABLE public.tasks (
  id BIGSERIAL PRIMARY KEY,
  task_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  project_id TEXT NOT NULL,
  project TEXT,
  estimated_completion TEXT,
  date_created TEXT,
  due_date TEXT,
  assignee JSONB,
  has_attachment BOOLEAN DEFAULT FALSE,
  collaborators JSONB DEFAULT '[]'::jsonb, -- This is a JSONB array
  status TEXT,
  archived BOOLEAN DEFAULT FALSE,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  deleted_by TEXT
);

-- 3. Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 4. Admin policy (matches sample admin and fallback for AL/Armando/email)
CREATE POLICY "Tasks admin can do everything"
  ON public.tasks
  FOR ALL
  USING (
    created_by = 'AL' OR created_by = 'Armando Lopez' OR created_by = 'armando@company.com'
    -- Fallback: allow manipulating tasks you created, assigned to, or collaborate on
    OR (assignee->>'name') = current_setting('request.jwt.claims', true)
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(collaborators) AS j
      WHERE (j->>'name') = current_setting('request.jwt.claims', true)
    )
    OR created_by = current_setting('request.jwt.claims', true)
  )
  WITH CHECK (true);

-- 5. Enable real-time on the table
ALTER TABLE public.tasks REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
