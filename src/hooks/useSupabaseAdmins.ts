
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

  useEffect(() => {
    let ignore = false;
    async function fetchAdmins() {
      setLoading(true);
      const { data, error } = await supabase
        .from("admin_users_with_profile")
        .select("*")
        .order("created_at", { ascending: false });
      if (!ignore) {
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
    }
    fetchAdmins();
    return () => {
      ignore = true;
    };
  }, []);

  return { admins, loading };
}
