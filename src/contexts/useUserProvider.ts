
import React, { useState, useCallback } from 'react';
import { User, UserContextType } from '@/types/user';
import { saveUserCustomizations } from '@/utils/userCustomizations';
import { supabase } from '@/integrations/supabase/client';
import { findUserById } from './userHelpers';
import { useSupabaseSync } from './useSupabaseSync';

const LOCAL_STORAGE_KEY = 'lovable-demo-auth-userid';

// A reusable hook containing most UserProvider logic
export function useUserProvider(): {
  currentUser: User | null,
  updateUserStatus: (status: User['status']) => void,
  toggleNotifications: () => void,
  updateUser: (updates: Partial<User>) => void,
  isImpersonating: boolean,
  impersonatedUser: User | null,
  impersonateAs: (userId: string) => void,
  exitImpersonation: () => void,
  loginAs: (userId: string) => void,
  logout: () => void,
  isAuthenticated: boolean,
  supabaseUserId?: string | null,
  loading: boolean,
} {
  const persistedUserId = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
  const defaultUser = persistedUserId ? findUserById(persistedUserId) : null;

  const [originalUser, setOriginalUser] = useState<User | null>(defaultUser);
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useSupabaseSync(setCurrentUser, setSupabaseUserId, setOriginalUser, setImpersonatedUser, setLoading);

  const isImpersonating = !!impersonatedUser;
  const isAuthenticated = !!currentUser;

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

  const logout = useCallback(async () => {
    setOriginalUser(null);
    setCurrentUser(null);
    setImpersonatedUser(null);
    setSupabaseUserId(null);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {/* Ignore errors */}
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
    window.location.href = '/login';
  }, []);

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

  return {
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
  };
}
