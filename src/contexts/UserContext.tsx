import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { UserContextType, User } from "@/types/user";
import Avatar from '@/components/common/Avatar';

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

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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

  // Fetch admin status for the current user (from user_roles table in Supabase)
  useEffect(() => {
    // Don't check while loading or if user not present
    if (!user) {
      setIsAdmin(false);
      return;
    }
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);
        if (error) throw error;
        const isAdminFound = data?.some((row: any) => row.role === "admin");
        if (isMounted) setIsAdmin(!!isAdminFound);
      } catch (err) {
        setIsAdmin(false);
      }
    })();
    return () => { isMounted = false; };
  }, [user]);

  const isAuthenticated = !!user;

  // Convert SupabaseUser to your local User type, fallback fields
  const mapToAppUser = (u: SupabaseUser | null): User => ({
    id: u?.id || "unknown",
    name: u?.user_metadata?.full_name || u?.email || "Unnamed",
    email: u?.email || "",
    avatarUrl: "", // We'll sync from profile below
    avatarColor: "bg-blue-500",
    initials: (u?.user_metadata?.full_name || u?.email || "U").split(" ").map((n: string) => n[0]).join("").toUpperCase(),
    status: "online",
    role: "Admin",
    lastActive: new Date().toISOString(),
    notificationsMuted: false,
    showOnlineStatus: true,
    showLastActive: true,
    company: "",
    bio: "",
    isAdmin,
  });

  // Updated local user state based on profile
  const [userProfile, setUserProfile] = useState<any>(null);

  // Load user profile from Supabase public.profiles table
  useEffect(() => {
    if (!user) return setUserProfile(null);
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (!error && data) {
        setUserProfile(data);
      }
    })();
  }, [user]);

  // -- Implement updateUser
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    // Only update allowed fields
    const profileUpdates: any = {};
    if (typeof updates.name === "string") profileUpdates.full_name = updates.name;
    if (typeof updates.avatarUrl === "string") profileUpdates.avatar_url = updates.avatarUrl;
    // Extra fields can be added as you wish

    if (Object.keys(profileUpdates).length === 0) return;

    // Update in Supabase
    const { error, data } = await supabase
      .from("profiles")
      .update(profileUpdates)
      .eq("id", user.id)
      .select()
      .maybeSingle();

    if (error) {
      // Optional: show toast UI error (if using shadcn/ui use-toast)
      if (window && "toast" in window) {
        (window as any).toast &&
          (window as any).toast({
            title: "Update failed",
            description: error.message,
            variant: "destructive",
          });
      } else {
        alert("Profile update failed: " + error.message);
      }
      return;
    }
    // Update local userProfile and possibly force a refresh if desired
    setUserProfile(data);

    // Optional: refetch SupabaseUser/profile here if fields like full_name or avatarUrl
    // are referenced in SupabaseUser metadata.

    // Optional: show toast success
    if (window && "toast" in window) {
      (window as any).toast &&
        (window as any).toast({
          title: "Profile updated",
          description: "Your profile changes have been saved.",
          variant: "success",
        });
    }
  };

  // This can be fleshed out with more fields per your needs
  const contextValue = {
    currentUser: {
      ...mapToAppUser(isImpersonating ? null : user),
      // Patch over with userProfile fields if loaded
      ...(userProfile
        ? {
            name: userProfile.full_name || user?.user_metadata?.full_name || user?.email || "",
            avatarUrl: userProfile.avatar_url || "",
          }
        : {}),
    },
    updateUserStatus: () => {},
    toggleNotifications: () => {},
    updateUser,
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
