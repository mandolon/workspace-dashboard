
import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// Move these to a shared config if used elsewhere
const SUPABASE_URL = "https://xxarxbmmedbmpptjgtxe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YXJ4Ym1tZWRibXBwdGpndHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODY1NTYsImV4cCI6MjA2NTI2MjU1Nn0.Gn3SU4hK27MNtZvyL4V2gSCGy0ahqeMiIyg9bNW7Tmc";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface SupabaseAdmin {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  created_at: string;
}

export function useSupabaseAdmins() {
  const [admins, setAdmins] = useState<SupabaseAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  // Use a ref to avoid duplicate fetches during rapid changes
  const isMountedRef = useRef(true);

  // Fetch admins logic extracted for reuse
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_users_with_profile")
      .select("*")
      .order("created_at", { ascending: false });
    if (isMountedRef.current) {
      if (error) {
        console.error("Failed to fetch Supabase admins:", error);
        setAdmins([]);
      } else if (data) {
        setAdmins(data);
      } else {
        setAdmins([]);
      }
      setLoading(false);
    }
  }, []);

  // RealTime subscription effect
  useEffect(() => {
    isMountedRef.current = true;
    fetchAdmins();

    // Subscribe to profile changes (insert, update, delete)
    const channel = supabase.channel('admin-profiles-updates');
    const eventHandler = (payload: any) => {
      console.log("[Supabase] Received realtime event (profiles):", payload);
      fetchAdmins();
    };

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        eventHandler
      )
      .subscribe();

    // Also subscribe to direct changes in user_roles, just in case roles change
    const rolesChannel = supabase.channel('admin-roles-updates');
    const rolesEventHandler = (payload: any) => {
      console.log("[Supabase] Received realtime event (user_roles):", payload);
      fetchAdmins();
    };

    rolesChannel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_roles",
        },
        rolesEventHandler
      )
      .subscribe();

    return () => {
      isMountedRef.current = false;
      supabase.removeChannel(channel);
      supabase.removeChannel(rolesChannel);
    };
  }, [fetchAdmins]);

  // Optional: manual refresh method (can be used for a refresh button)
  const refresh = fetchAdmins;

  return { admins, loading, refresh };
}

