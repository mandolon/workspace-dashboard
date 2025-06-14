import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, UserContextType } from '@/types/user';
import { TEAM_USERS } from '@/utils/teamUsers';

const UserContext = createContext<UserContextType & {
  isImpersonating: boolean;
  impersonatedUser: User | null;
  impersonateAs: (userId: string) => void;
  exitImpersonation: () => void;
  loginAs: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
} | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const LOCAL_STORAGE_KEY = 'lovable-demo-auth-userid';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Utility to find a user by id
  const findUserById = (userId: string): User | null => {
    const u = TEAM_USERS.find(u => u.id === userId);
    if (!u) return null;
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

  // Load persisted userId
  const persistedUserId = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
  const defaultUser = persistedUserId ? findUserById(persistedUserId) : null;

  // State: originalUser is the admin, currentUser is the logged-in user
  const [originalUser, setOriginalUser] = useState<User | null>(defaultUser);
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null);

  const isImpersonating = !!impersonatedUser;
  const isAuthenticated = !!currentUser;

  // Login as a given userId
  const loginAs = useCallback((userId: string) => {
    const user = findUserById(userId);
    if (user) {
      setOriginalUser(user);
      setCurrentUser(user);
      setImpersonatedUser(null);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, userId);
    }
  }, []);

  // Logout: clear auth and session
  const logout = useCallback(() => {
    setOriginalUser(null);
    setCurrentUser(null);
    setImpersonatedUser(null);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  // Impersonation
  const impersonateAs = useCallback((userId: string) => {
    if (!originalUser || userId === originalUser.id) return; // Don't impersonate self
    const user = findUserById(userId);
    if (user) {
      setImpersonatedUser(user);
      setCurrentUser(user);
    }
  }, [originalUser]);

  const exitImpersonation = useCallback(() => {
    if (originalUser) {
      setImpersonatedUser(null);
      setCurrentUser(originalUser);
    }
  }, [originalUser]);

  // Basic "update" logic as before
  const updateUserStatus = (status: User['status']) => {
    setCurrentUser(prev => prev ? { ...prev, status } : prev);
  };

  const toggleNotifications = () => {
    setCurrentUser(prev => prev ? { ...prev, notificationsMuted: !prev.notificationsMuted } : prev);
  };

  const updateUser = (updates: Partial<User>) => {
    setCurrentUser(prev => prev ? { ...prev, ...updates } : prev);
  };

  // Effect: Sync on mount with localStorage
  useEffect(() => {
    if (!currentUser && persistedUserId) {
      const user = findUserById(persistedUserId);
      if (user) {
        setOriginalUser(user);
        setCurrentUser(user);
      }
    }
  }, []); // only run on mount

  return (
    <UserContext.Provider value={{
      currentUser: currentUser!,
      updateUserStatus,
      toggleNotifications,
      updateUser,
      isImpersonating,
      impersonatedUser,
      impersonateAs,
      exitImpersonation,
      loginAs,
      logout,
      isAuthenticated,
    }}>
      {children}
    </UserContext.Provider>
  );
};
