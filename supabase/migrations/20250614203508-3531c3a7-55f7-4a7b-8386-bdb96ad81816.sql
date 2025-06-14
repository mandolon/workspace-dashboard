
-- 1. Enable Row Level Security (RLS) on the tasks table if not already enabled
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 2. Drop permissive "Anyone can read" policy if it exists to tighten security
DROP POLICY IF EXISTS "Anyone can read tasks" ON public.tasks;

-- 3. Allow admin users to see everything (by created_by field)
CREATE POLICY "Admins can access all tasks"
  ON public.tasks
  FOR SELECT USING (
    created_by = 'Armando Lopez' OR created_by = 'AL' OR created_by = 'armando@company.com'
  );

-- 4. Core: Allow users to view tasks if they are the assignee, a collaborator, or the creator (via id, name, or email)
CREATE POLICY "User can view their assigned tasks and collaborations"
  ON public.tasks
  FOR SELECT USING (
    -- Creator by email or name (fallback)
    created_by = current_setting('request.jwt.claims', true)
    OR (assignee->>'email') = current_setting('request.jwt.claims', true) -- Match assignee email
    OR (assignee->>'name') = current_setting('request.jwt.claims', true)  -- Match assignee name
    OR (assignee->>'fullName') = current_setting('request.jwt.claims', true) -- Match assignee fullName
    -- Collaborators by email/name/fullName
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(collaborators) AS c
      WHERE
        c->>'email' = current_setting('request.jwt.claims', true)
        OR c->>'name' = current_setting('request.jwt.claims', true)
        OR c->>'fullName' = current_setting('request.jwt.claims', true)
    )
  );

-- 5. (Optional but recommended): Also allow access if the current user's ID matches assignee or collaborator id
-- Note: Only possible if client stores user id in created_by, assignee.id, collaborators[].id

CREATE POLICY "User can view tasks by user id match"
  ON public.tasks
  FOR SELECT USING (
    (assignee->>'id') = current_setting('request.jwt.claims', true)
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(collaborators) AS c
      WHERE c->>'id' = current_setting('request.jwt.claims', true)
    )
  );

-- 6. (Retain permissive INSERT, UPDATE, DELETE for demo purposes. You may want to restrict these later.)
