
import { ADMIN_USERS, TEAM_USERS, CLIENT_USERS } from '@/utils/teamUsers';
import { getUserCustomizations, saveUserCustomizations } from '@/utils/userCustomizations';
import { User } from '@/types/user';
import { ArchitectureRole } from '@/types/roles';

// Map Supabase user to demo UserContext type (partial mapping)
export const getSupabaseUserToCtxUser = (supabaseUser: any): User => ({
  id: supabaseUser.id,
  name: supabaseUser.user_metadata?.full_name || supabaseUser.email || 'User',
  email: supabaseUser.email || '',
  avatar: '',
  status: 'online',
  bio: '',
  company: '',
  role: "Admin",
  lastActive: new Date().toISOString(),
  notificationsMuted: false,
  showOnlineStatus: true,
  showLastActive: true,
  avatarColor: 'bg-blue-800'
});

// Safely infer appropriate role for User from TeamMember type
export const findUserById = (userId: string): User | null => {
  // Search in all user arrays
  const u =
    ADMIN_USERS.find(u => u.id === userId) ||
    TEAM_USERS.find(u => u.id === userId) ||
    CLIENT_USERS.find(u => u.id === userId);

  if (!u) return null;
  const custom = getUserCustomizations(userId);

  // Determine correct ArchitectureRole for the specific user
  let role: ArchitectureRole;
  if (u.crmRole === "Admin") {
    role = "Admin";
  } else if (u.crmRole === "Team") {
    // Only Team users have titleRole, fallback to "Team Lead"
    role = u.titleRole ?? "Team Lead";
  } else if (u.crmRole === "Client") {
    role = "Client";
  } else {
    role = "Team Lead";
  }

  return {
    id: u.id,
    name: u.fullName,
    email: u.email,
    avatar: u.avatar,
    status: u.status === "Active" ? "online" : u.status === "Inactive" ? "offline" : "away",
    bio: "",
    company: "",
    role: role,
    lastActive: u.lastActive || "",
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    avatarColor: custom.avatarColor || u.avatarColor || "bg-gray-600"
  };
};
