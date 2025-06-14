
import { supabase } from "@/integrations/supabase/client";

// Deletes a whiteboard from Supabase by its id
export async function deleteWhiteboardSupabase(id: string) {
  const { error } = await supabase
    .from('whiteboards')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message || "Failed to delete whiteboard.");
}
