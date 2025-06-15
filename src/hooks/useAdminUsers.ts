
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";

export function useAdminUsers() {
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      // Get users with 'admin' role in user_roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");
      if (rolesError) throw rolesError;
      const userIds = (roles ?? []).map((r: any) => r.user_id);

      if (!userIds.length) return [];

      // Now get profiles/user info for those user ids
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url")
        .in("id", userIds);

      if (profilesError) throw profilesError;
      return profiles.map((profile: any) => ({
        id: profile.id,
        name: profile.full_name ?? profile.email ?? "",
        fullName: profile.full_name ?? profile.email ?? "",
        crmRole: "Admin",
        titleRole: "Admin",
        lastActive: "—",
        status: "Active",
        email: profile.email ?? "",
        role: "Admin",
        avatar: profile.avatar_url ?? "",
        avatarColor: "bg-blue-800", // You can use a more advanced color logic if desired
      }));
    }
  });
}
