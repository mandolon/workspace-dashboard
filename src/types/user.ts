
import { ArchitectureRole } from './roles';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  bio?: string;
  role: ArchitectureRole;
  lastActive: string;
  notificationsMuted: boolean;
}

export interface UserContextType {
  currentUser: User;
  updateUserStatus: (status: User['status']) => void;
  toggleNotifications: () => void;
  updateUser: (updates: Partial<User>) => void;
}
