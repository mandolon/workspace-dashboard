
import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserContextType } from '@/types/user';
import { TEAM_USERS } from '@/utils/teamUsers';

const UserContext = createContext<UserContextType & {
  isImpersonating: boolean;
  impersonatedUser: User | null;
  impersonateAs: (userId: string) => void;
  exitImpersonation: () => void;
} | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store true admin as originalUser, "currentUser" drives UI.
  const [originalUser, setOriginalUser] = useState<User>({
    id: 't0',
    name: 'Armando Lopez',
    email: 'armando@company.com',
    avatar: 'AL',
    status: 'online',
    bio: 'Senior Architect & Project Manager',
    company: 'PinerWorks',
    role: 'Project Manager',
    lastActive: new Date().toISOString(),
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    avatarColor: 'bg-blue-500'
  });
  const [currentUser, setCurrentUser] = useState<User>(originalUser);
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null);

  const isImpersonating = !!impersonatedUser;

  // Find a user by their id from TEAM_USERS array (it covers team and client users)
  const findUserById = (userId: string): User | null => {
    const u = TEAM_USERS.find(u => u.id === userId);
    if (!u) return null;
    // Normalize TeamMember to User type
    // For clients, titleRole may be undefined
    return {
      id: u.id,
      name: u.fullName,
      email: u.email,
      avatar: u.name,
      status: u.status === "Active" ? "online" : u.status === "Inactive" ? "offline" : "away",
      bio: "",
      company: "",
      role: u.role,
      lastActive: u.lastActive || "",
      notificationsMuted: false,
      showOnlineStatus: true,
      showLastActive: true,
      avatarColor: u.avatar || undefined
    };
  };

  // Start impersonation: find user, set as currentUser and store impersonatedUser
  const impersonateAs = useCallback((userId: string) => {
    if (userId === originalUser.id) return; // Don't impersonate self!
    const user = findUserById(userId);
    if (user) {
      setImpersonatedUser(user);
      setCurrentUser(user);
    }
  }, [originalUser.id]);

  // Exit impersonation: revert to true admin
  const exitImpersonation = useCallback(() => {
    setImpersonatedUser(null);
    setCurrentUser(originalUser);
  }, [originalUser]);

  const updateUserStatus = (status: User['status']) => {
    setCurrentUser(prev => ({ ...prev, status }));
  };

  const toggleNotifications = () => {
    setCurrentUser(prev => ({ ...prev, notificationsMuted: !prev.notificationsMuted }));
  };

  const updateUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      updateUserStatus,
      toggleNotifications,
      updateUser,
      isImpersonating,
      impersonatedUser,
      impersonateAs,
      exitImpersonation
    }}>
      {children}
    </UserContext.Provider>
  );
};
