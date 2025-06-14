
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useSupabaseWhiteboard(roomId: string | undefined) {
  const [loaded, setLoaded] = useState(false);
  const [tldrawData, setTldrawData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Fetch whiteboard document on mount
  useEffect(() => {
    if (!roomId) return;
    let ignore = false;

    async function load() {
      const { data, error } = await supabase
        .from('whiteboards')
        .select('tldraw_data')
        .eq('id', roomId)
        .maybeSingle();
      if (!ignore) {
        if (error) {
          setTldrawData(null);
        } else {
          setTldrawData(data?.tldraw_data || null);
        }
        setLoaded(true);
      }
    }
    load();
    return () => { ignore = true; };
  }, [roomId]);

  // Save tldraw document back to Supabase
  const saveTldrawData = useCallback(
    async (data: any) => {
      if (!roomId) return;
      setSaving(true);
      await supabase
        .from('whiteboards')
        .update({ tldraw_data: data, last_modified: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('id', roomId);
      setSaving(false);
    },
    [roomId]
  );

  // Subscribe to Supabase realtime changes (others editing board)
  useEffect(() => {
    if (!roomId) return;
    const channel = supabase
      .channel('whiteboard-' + roomId)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'whiteboards', filter: `id=eq.${roomId}` },
        (payload) => {
          // Only update data if different
          setTldrawData(payload.new.tldraw_data);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return { tldrawData, setTldrawData, loaded, saving, saveTldrawData };
}
