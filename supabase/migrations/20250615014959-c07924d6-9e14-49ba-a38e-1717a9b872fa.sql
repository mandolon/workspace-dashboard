
-- We want to make it easy to join `user_roles` with `profiles` for admin users.
-- Let's create a simple database view for "admin_users_with_profile" for efficient client-side fetching.

CREATE OR REPLACE VIEW public.admin_users_with_profile AS
SELECT
  p.id,
  p.full_name,
  p.email,
  ur.role,
  ur.created_at
FROM
  user_roles ur
JOIN
  profiles p ON ur.user_id = p.id
WHERE
  ur.role = 'admin';

-- (No RLS policies needed for a view. Frontend will query this view combined with TEAM_USERS.)
