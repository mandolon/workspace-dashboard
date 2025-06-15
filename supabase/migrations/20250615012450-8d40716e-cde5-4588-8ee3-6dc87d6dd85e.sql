
-- 1. Update the trigger function so that profile creation avoids email in full_name if possible
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  supplied_name TEXT;
BEGIN
  -- Try to prefer a real name (from full_name or name), fallback to username from email
  supplied_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'name', ''),
    split_part(NEW.email, '@', 1)
  );
  INSERT INTO public.profiles (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    supplied_name,
    now()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Fix any already-created profiles with emails as their full name
UPDATE public.profiles
SET full_name = split_part(email, '@', 1)
WHERE full_name = email
  AND full_name LIKE '%@%'
  AND email IS NOT NULL;

