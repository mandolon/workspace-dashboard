
-- 1. Allow update (restore) on tasks even if deleted, if user would otherwise be able to view the task.
-- First, drop existing "User can view their assigned tasks and collaborations" policy if it exists,
-- then create a new more permissive UPDATE policy to allow restoring deleted tasks.
-- The logic mimics select policies but applies to update.

-- Drop old policies to avoid duplicates/conflicts (safe even if missing)
DROP POLICY IF EXISTS "User can view their assigned tasks and collaborations" ON public.tasks;
DROP POLICY IF EXISTS "User can view tasks by user id match" ON public.tasks;
DROP POLICY IF EXISTS "User can update their tasks" ON public.tasks;

-- View Policy (for reference/keeping task visible in trash)
CREATE POLICY "User can view their assigned tasks and collaborations"
  ON public.tasks
  FOR SELECT USING (
    created_by = current_setting('request.jwt.claims', true)
    OR (assignee->>'email') = current_setting('request.jwt.claims', true)
    OR (assignee->>'name') = current_setting('request.jwt.claims', true)
    OR (assignee->>'fullName') = current_setting('request.jwt.claims', true)
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(collaborators) AS c
      WHERE
        c->>'email' = current_setting('request.jwt.claims', true)
        OR c->>'name' = current_setting('request.jwt.claims', true)
        OR c->>'fullName' = current_setting('request.jwt.claims', true)
    )
  );

-- View by user ID match (optional, for flexibility)
CREATE POLICY "User can view tasks by user id match"
  ON public.tasks
  FOR SELECT USING (
    (assignee->>'id') = current_setting('request.jwt.claims', true)
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(collaborators) AS c
      WHERE c->>'id' = current_setting('request.jwt.claims', true)
    )
  );

-- Allow update for restore (including restore from trash)
CREATE POLICY "User can restore or update their tasks even if deleted"
  ON public.tasks
  FOR UPDATE USING (
    -- Allow update if user matches by created_by, assignee, or collaborator -- regardless of deleted_at state
    created_by = current_setting('request.jwt.claims', true)
    OR (assignee->>'email') = current_setting('request.jwt.claims', true)
    OR (assignee->>'name') = current_setting('request.jwt.claims', true)
    OR (assignee->>'fullName') = current_setting('request.jwt.claims', true)
    OR (assignee->>'id') = current_setting('request.jwt.claims', true)
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(collaborators) AS c
      WHERE
        c->>'email' = current_setting('request.jwt.claims', true)
        OR c->>'name' = current_setting('request.jwt.claims', true)
        OR c->>'fullName' = current_setting('request.jwt.claims', true)
        OR c->>'id' = current_setting('request.jwt.claims', true)
    )
  ) WITH CHECK (true);

-- (Optional/for legacy) Allow admins to do everything:
DROP POLICY IF EXISTS "Tasks admin can do everything" ON public.tasks;
CREATE POLICY "Tasks admin can do everything"
  ON public.tasks
  FOR ALL USING (
    created_by = 'AL' OR created_by = 'Armando Lopez' OR created_by = 'armando@company.com'
  );

-- No need to adjust DELETE or INSERT at this time.

