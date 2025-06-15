
import React, { createContext, useContext } from 'react';
import { User, UserContextType } from '@/types/user';
import { useUserProvider } from './useUserProvider';

const UserContext = createContext<UserContextType & {
  isImpersonating: boolean;
  impersonatedUser: User | null;
  impersonateAs: (userId: string) => void;
  exitImpersonation: () => void;
  loginAs: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  supabaseUserId?: string | null;
} | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentUser,
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
    supabaseUserId,
    loading
  } = useUserProvider();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></span>
        <span className="ml-3">Loading authentication...</span>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{
      currentUser,
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
      supabaseUserId,
    }}>
      {children}
    </UserContext.Provider>
  );
};
