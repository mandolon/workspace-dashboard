
-- Make all tasks visible and accessible to all users (disabling most restrictive RLS temporarily for demo/custom auth context)

-- 1. Drop all previous policies
DROP POLICY IF EXISTS "Tasks admin can do everything" ON public.tasks;

-- 2. Create a permissive policy: Anyone (including anon) can select/insert/update/delete tasks
-- This is appropriate for a demo or non-auth environment ONLY. For production, use real auth!
CREATE POLICY "Anyone can read tasks"
  ON public.tasks
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tasks"
  ON public.tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tasks"
  ON public.tasks
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete tasks"
  ON public.tasks
  FOR DELETE
  USING (true);

-- 3. (Ensure RLS remains enabled; the above makes it fully permissive)
-- Security warning: This exposes all tasks to all clients. For a real app, use Supabase Auth.

