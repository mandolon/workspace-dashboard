
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, UserContextType } from '@/types/user';
import { TEAM_USERS } from '@/utils/teamUsers';
import { getUserCustomizations, saveUserCustomizations } from '@/utils/userCustomizations';
import { supabase } from '@/integrations/supabase/client';

const UserContext = createContext<UserContextType & {
  isImpersonating: boolean;
  impersonatedUser: User | null;
  impersonateAs: (userId: string) => void;
  exitImpersonation: () => void;
  loginAs: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  supabaseUserId?: string | null; // Added for utility if needed
} | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const LOCAL_STORAGE_KEY = 'lovable-demo-auth-userid';

const getSupabaseUserToCtxUser = (supabaseUser: any): User => {
  // Map supabase user to demo UserContext type (partial mapping)
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.email || 'User',
    email: supabaseUser.email || '',
    avatar: '', // No avatar from supabase for now
    status: 'online',
    bio: '',
    company: '',
    role: 'Admin', // Default to Admin since all signups are admin; can be further customized with DB if needed
    lastActive: new Date().toISOString(),
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    avatarColor: 'bg-blue-800' // Pick a color for real users
  };
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use avatarColor from TEAM_USERS (never from 'avatar' field!)
  const findUserById = (userId: string): User | null => {
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

  // Load persisted userId
  const persistedUserId = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
  const defaultUser = persistedUserId ? findUserById(persistedUserId) : null;

  // State: originalUser is the admin, currentUser is the logged-in user
  const [originalUser, setOriginalUser] = useState<User | null>(defaultUser);
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isImpersonating = !!impersonatedUser;
  // User is authenticated if using demo auth *or* Supabase auth
  const isAuthenticated = !!currentUser;

  // Login as a given userId (demo system)
  const loginAs = useCallback((userId: string) => {
    setLoading(true);
    const user = findUserById(userId);
    if (user) {
      setOriginalUser(user);
      setCurrentUser(user);
      setImpersonatedUser(null);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, userId);
    }
    setLoading(false);
  }, []);

  // Logout: clear auth and session (both demo and supabase)
  const logout = useCallback(async () => {
    setOriginalUser(null);
    setCurrentUser(null);
    setImpersonatedUser(null);
    setSupabaseUserId(null);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    // Also sign out from supabase if logged in
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {/* Ignore errors */ }
    // Clean up Supabase tokens from storage (limbo-prevention)
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(sessionStorage || {}).forEach(key => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
    // Force reload to ensure clean state
    window.location.href = '/login';
  }, []);

  // Impersonation
  const impersonateAs = useCallback((userId: string) => {
    if (!originalUser || userId === originalUser.id) return;
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
    setCurrentUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      if (updates.avatarColor && typeof window !== "undefined") {
        saveUserCustomizations(prev.id, { avatarColor: updates.avatarColor });
      }
      return updated;
    });
  };

  // Effect: Sync on mount. Prefer Supabase user session to demo.
  useEffect(() => {
    let supabaseListener: any;
    setLoading(true);

    // Listen to Supabase auth state changes
    supabaseListener = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userObj = getSupabaseUserToCtxUser(session.user);
        setCurrentUser(userObj);
        setSupabaseUserId(session.user.id);
        setOriginalUser(userObj);
        setImpersonatedUser(null);
        window.localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear persisted demo login if present
      } else {
        // Check if we have a demo user in storage
        if (persistedUserId) {
          const u = findUserById(persistedUserId);
          if (u) {
            setCurrentUser(u);
            setOriginalUser(u);
            setSupabaseUserId(null);
          } else {
            setCurrentUser(null);
            setOriginalUser(null);
            setSupabaseUserId(null);
          }
        } else {
          setCurrentUser(null);
          setOriginalUser(null);
          setSupabaseUserId(null);
        }
      }
      setLoading(false);
    });

    // On initial mount, check for Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userObj = getSupabaseUserToCtxUser(session.user);
        setCurrentUser(userObj);
        setSupabaseUserId(session.user.id);
        setOriginalUser(userObj);
        setImpersonatedUser(null);
        window.localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear demo login when Supabase login
      } else if (persistedUserId) {
        const u = findUserById(persistedUserId);
        if (u) {
          setCurrentUser(u);
          setOriginalUser(u);
          setSupabaseUserId(null);
        }
      }
      setLoading(false);
    });

    return () => {
      if (supabaseListener && supabaseListener.data && supabaseListener.data.subscription) {
        supabaseListener.data.subscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only render children once loading is done
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

