
-- Migration: Update whiteboards RLS policies from 'authenticated' to 'anon'

-- Remove all existing policies for whiteboards
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
    TO anon
    USING (true);

-- Allow INSERT for all users with a valid anon key
CREATE POLICY "Allow public insert" ON public.whiteboards
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow UPDATE for all users with a valid anon key
CREATE POLICY "Allow public update" ON public.whiteboards
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Allow DELETE for all users with a valid anon key
CREATE POLICY "Allow public delete" ON public.whiteboards
    FOR DELETE
    TO anon
    USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.whiteboards ENABLE ROW LEVEL SECURITY;
