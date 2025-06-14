
-- 1. Add description column to the tasks table
ALTER TABLE public.tasks
ADD COLUMN description TEXT;

-- 2. (Optional but recommended) Set default to NULL for description (existing rows will auto default to null)

-- No further action is needed. The column is nullable and does not have to be required for existing tasks.
