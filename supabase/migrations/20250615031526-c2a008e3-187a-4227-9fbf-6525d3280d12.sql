
-- Add 'team' and 'client' values to the enum 'app_role'
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'team';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'client';
