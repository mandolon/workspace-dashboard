
import { ArchitectureRole } from './roles';

// TeamUser for demo
export interface TeamUser {
  id: string;
  name: string;
  fullName: string;
  role: ArchitectureRole;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  bio?: string;
  company?: string;
  role: ArchitectureRole;
  lastActive: string;
  notificationsMuted: boolean;
  showOnlineStatus: boolean;
  showLastActive: boolean;
}

export interface UserContextType {
  currentUser: User;
  updateUserStatus: (status: User['status']) => void;
  toggleNotifications: () => void;
  updateUser: (updates: Partial<User>) => void;
}
