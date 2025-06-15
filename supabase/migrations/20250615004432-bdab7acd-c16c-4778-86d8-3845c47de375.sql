
-- 1. Create a roles enum if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END$$;

-- 2. Create user_roles table if not exists
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, role)
);

-- 3. Automatically assign admin role to all NEW users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Connect the new trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 4. Make sure only admins can manage user_roles (edit, delete, assign)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- View own row (for completeness)
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can manage all
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'admin'
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- 5. Make two specific existing users into admins:
UPDATE public.user_roles SET role = 'admin' WHERE user_id IN (
  '8c3372c0-b4f2-44cf-a643-b27444d7ca22'::uuid,
  'a7e5f505-ba9b-4f91-9375-ef21494bd95d'::uuid
);

-- If these users do not exist in user_roles yet, insert them as admins:
INSERT INTO public.user_roles (user_id, role)
SELECT uid::uuid, 'admin'
FROM (VALUES
  ('8c3372c0-b4f2-44cf-a643-b27444d7ca22'),
  ('a7e5f505-ba9b-4f91-9375-ef21494bd95d')
) AS t(uid)
ON CONFLICT DO NOTHING;

