// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ojfbcfuiigxdacvyvmrs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZmJjZnVpaWd4ZGFjdnl2bXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NTg4MDEsImV4cCI6MjA2NTUzNDgwMX0.-m-KYzi0tqybxfiSyIAxZ58GQku6Lz9xiKHVar234RA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});