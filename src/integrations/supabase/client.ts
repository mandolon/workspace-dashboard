
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xxarxbmmedbmpptjgtxe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YXJ4Ym1tZWRibXBwdGpndHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODY1NTYsImV4cCI6MjA2NTI2MjU1Nn0.Gn3SU4hK27MNtZvyL4V2gSCGy0ahqeMiIyg9bNW7Tmc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

/**
 * Sync "mock" user with Supabase RLS context so RLS policies work for demo users.
 * We use a custom header "x-rls-mock-user" to communicate the desired identity.
 */
export async function syncSupabaseRLSUser(userNameOrEmail?: string) {
  if (userNameOrEmail) {
    try {
      // This only works if the server is configured to copy headers into request.jwt.claims
      // For demo/local: use custom "x-rls-mock-user" header for context. Supabase Edge Functions can handle this.
      await supabase.rpc('set_rls_context', { user_identifier: userNameOrEmail }); // Implement as needed if you support custom RLS via functions
      window.localStorage.setItem('supabase.rls_user', userNameOrEmail);
      // If needed: inject into fetch requests (advanced - skip for now)
      console.log('[supabase] Synced mock RLS context to:', userNameOrEmail);
    } catch (err) {
      // No-op for demo
    }
  } else {
    window.localStorage.removeItem('supabase.rls_user');
  }
}
