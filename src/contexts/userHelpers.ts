
import { ADMIN_USERS, TEAM_USERS, CLIENT_USERS } from '@/utils/teamUsers';
import { getUserCustomizations, saveUserCustomizations } from '@/utils/userCustomizations';
import { User } from '@/types/user';

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

export const findUserById = (userId: string): User | null => {
  // Search in all user arrays
  const u =
    ADMIN_USERS.find(u => u.id === userId) ||
    TEAM_USERS.find(u => u.id === userId) ||
    CLIENT_USERS.find(u => u.id === userId);
  if (!u) return null;
  const custom = getUserCustomizations(userId);
  return {
    id: u.id,
    name: u.fullName,
    email: u.email,
    avatar: u.avatar,
    status: u.status === "Active" ? "online" : u.status === "Inactive" ? "offline" : "away",
    bio: "",
    company: "",
    // Use titleRole if present (for team), else fallback to crmRole, else blank
    role: (u.titleRole as string) || u.crmRole || "",
    lastActive: u.lastActive || "",
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    avatarColor: custom.avatarColor || u.avatarColor || 'bg-gray-600'
  };
};
