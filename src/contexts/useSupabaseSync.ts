
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/user';
import { getSupabaseUserToCtxUser, findUserById } from './userHelpers';

const LOCAL_STORAGE_KEY = 'lovable-demo-auth-userid';

export function useSupabaseSync(
  setCurrentUser: (u: User | null) => void,
  setSupabaseUserId: (id: string | null) => void,
  setOriginalUser: (u: User | null) => void,
  setImpersonatedUser: (u: User | null) => void,
  setLoading: (b: boolean) => void
): void {
  // Load persisted userId
  const persistedUserId = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;

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
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
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
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
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
}
