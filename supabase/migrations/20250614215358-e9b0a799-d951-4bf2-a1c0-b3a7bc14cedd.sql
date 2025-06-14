
-- Step 1: Disable Row Level Security (RLS) on the tasks table to allow all operations for the demo.
ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;

-- (Optional for clarity, leave any other demo policies in place; RLS will now not apply)
