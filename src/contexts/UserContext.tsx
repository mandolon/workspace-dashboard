
// New version: powered by Supabase session, not localStorage
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { UserContextType } from "@/types/user";

const UserContext = createContext<UserContextType & {
  logout: () => void;
  isAuthenticated: boolean;
  session: Session | null;
} | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });
    // 2. Check current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user || null);
      setLoading(false);
    });
    return () => { subscription.unsubscribe(); };
  }, []);

  const isAuthenticated = !!user;

  // This can be fleshed out with more fields per your needs
  const contextValue = {
    currentUser: user,
    updateUserStatus: () => {},
    toggleNotifications: () => {},
    updateUser: () => {},
    logout: async () => {
      await supabase.auth.signOut();
      window.location.href = "/auth";
    },
    isAuthenticated,
    session,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></span>
        <span className="ml-3">Loading authentication...</span>
      </div>
    );
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
