
-- Change the default inserted role to 'team' in handle_new_user_role:
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'team')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$function$
