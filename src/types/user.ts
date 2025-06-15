
import { ArchitectureRole } from './roles';

// TeamUser for demo
export interface TeamUser {
  id: string;
  name: string;
  fullName: string;
  role: ArchitectureRole;
  avatarUrl?: string;
  avatarColor?: string; // default "bg-blue-500" if not set
  initials: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  avatarColor?: string;
  initials: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  bio?: string;
  company?: string;
  role: ArchitectureRole;
  lastActive: string;
  notificationsMuted: boolean;
  showOnlineStatus: boolean;
  showLastActive: boolean;
  isAdmin?: boolean;
}

export interface UserContextType {
  currentUser: User;
  updateUserStatus: (status: User['status']) => void;
  toggleNotifications: () => void;
  updateUser: (updates: Partial<User>) => void;
}
