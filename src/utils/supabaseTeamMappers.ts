
import { TeamMember } from "@/utils/teamUsers";
import { ArchitectureRole } from "@/types/roles";

/**
 * Map a profile row from Supabase to a TeamMember for TEAM (only teams get a titleRole)
 */
export function mapSupabaseTeamProfile(profile: any): TeamMember {
  const nameInit =
    profile.full_name?.split(" ")?.map((s: string) => s[0])?.join("")?.toUpperCase() ||
    "SU";
  return {
    id: profile.id,
    name: nameInit,
    fullName: profile.full_name || profile.email || "Unknown User",
    crmRole: "Team",
    titleRole: "Team" as ArchitectureRole,
    lastActive: "—",
    status: "Active",
    email: profile.email || "",
    avatar: nameInit,
    avatarColor: "bg-blue-700",
  };
}

/**
 * Map a profile row from Supabase to a TeamMember for CLIENT (clients have NO titleRole)
 */
export function mapSupabaseClientProfile(profile: any): TeamMember {
  const nameInit =
    profile.full_name?.split(" ")?.map((s: string) => s[0])?.join("")?.toUpperCase() ||
    "SU";
  return {
    id: profile.id,
    name: nameInit,
    fullName: profile.full_name || profile.email || "Unknown User",
    crmRole: "Client",
    titleRole: undefined,
    lastActive: "—",
    status: "Active",
    email: profile.email || "",
    avatar: nameInit,
    avatarColor: "bg-pink-700",
  };
}
