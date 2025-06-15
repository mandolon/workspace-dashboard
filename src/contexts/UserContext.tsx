
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { UserContextType, User } from "@/types/user";

// Define exported context type with impersonation support
type ImpersonationContext = {
  isImpersonating: boolean;
  impersonatedUser: User | null;
  impersonateAs: (userId: string) => void;
  exitImpersonation: () => void;
};

// The augmented context type:
const UserContext = createContext<
  UserContextType &
    ImpersonationContext & {
      logout: () => void;
      isAuthenticated: boolean;
      session: Session | null;
    } | undefined
>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // BEGIN: Impersonation stubs (no real functionality)
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null);
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Stub: Call to "impersonate" (does nothing for now)
  const impersonateAs = (userId: string) => {
    // Normally you'd setImpersonatedUser/fetch, for now just flag.
    setIsImpersonating(true);
    setImpersonatedUser(null); // You could fake a user here if you want
  };
  const exitImpersonation = () => {
    setIsImpersonating(false);
    setImpersonatedUser(null);
  };
  // END Impersonation stubs

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

  // Convert SupabaseUser to your local User type, fallback fields
  const mapToAppUser = (u: SupabaseUser | null): User => ({
    id: u?.id || "unknown",
    name: u?.user_metadata?.full_name || u?.email || "Unnamed",
    email: u?.email || "",
    avatar: "", // Replace with avatar URL if available in profile/user_metadata
    status: "online", // Fallback; app could actually derive from presence later
    role: "Admin", // Fallback; replace with real role if applicable
    lastActive: new Date().toISOString(),
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    company: "",
    bio: "",
    avatarColor: undefined,
  });

  // This can be fleshed out with more fields per your needs
  const contextValue = {
    currentUser: mapToAppUser(isImpersonating ? null : user), // You may want to return impersonatedUser here if impersonating
    updateUserStatus: () => {},
    toggleNotifications: () => {},
    updateUser: () => {},
    logout: async () => {
      await supabase.auth.signOut();
      window.location.href = "/auth";
    },
    isAuthenticated,
    session,
    // ADD IMPERSONATION KEYS
    isImpersonating,
    impersonatedUser,
    impersonateAs,
    exitImpersonation,
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
