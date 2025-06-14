import React, { createContext, useContext, useState } from 'react';
import { User, UserContextType } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 't0', // CHANGED from "user-1" to "t0" to match TeamUser id for Armando Lopez
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
    avatarColor: 'bg-blue-500' // Default avatar color for first time
  });

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
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
