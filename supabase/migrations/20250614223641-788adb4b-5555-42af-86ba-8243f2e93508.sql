
-- 1. Remove and re-create whiteboards RLS policies so inserts work for all authenticated (anon key) clients

-- Remove existing policy
DROP POLICY IF EXISTS "Team can do everything" ON public.whiteboards;

-- Remove all policies for safety
DO
$$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'whiteboards' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "%s" ON public.whiteboards;', pol.policyname);
    END LOOP;
END
$$;

-- Allow SELECT for all users with a valid anon key
CREATE POLICY "Allow public select" ON public.whiteboards
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow INSERT for all users with a valid anon key
CREATE POLICY "Allow public insert" ON public.whiteboards
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow UPDATE for all users with a valid anon key
CREATE POLICY "Allow public update" ON public.whiteboards
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow DELETE for all users with a valid anon key
CREATE POLICY "Allow public delete" ON public.whiteboards
    FOR DELETE
    TO authenticated
    USING (true);

-- (Optional: restrict further if needed -- e.g. by user id -- but for frontends with custom auth, this works for now.)

-- Double check RLS is enabled
ALTER TABLE public.whiteboards ENABLE ROW LEVEL SECURITY;

