
import { TEAM_USERS } from '@/utils/teamUsers';
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
  role: 'Admin',
  lastActive: new Date().toISOString(),
  notificationsMuted: false,
  showOnlineStatus: true,
  showLastActive: true,
  avatarColor: 'bg-blue-800'
});

export const findUserById = (userId: string): User | null => {
  const u = TEAM_USERS.find(u => u.id === userId);
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
    role: u.role,
    lastActive: u.lastActive || "",
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    avatarColor: custom.avatarColor || u.avatarColor || 'bg-gray-600'
  };
};
