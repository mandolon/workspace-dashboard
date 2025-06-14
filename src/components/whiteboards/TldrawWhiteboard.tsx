
import React, { useCallback, useRef } from "react";
import { Tldraw, serializeTldrawJson, deserializeTldrawJson, TldrawApp } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useSupabaseWhiteboard } from "@/hooks/useSupabaseWhiteboard";

interface Props {
  roomId?: string;
}
const TldrawWhiteboard: React.FC<Props> = ({ roomId }) => {
  const { tldrawData, setTldrawData, loaded, saveTldrawData } = useSupabaseWhiteboard(roomId);
  const appRef = useRef<TldrawApp | null>(null);

  // Save to Supabase on every local change
  const handleMount = useCallback((app: TldrawApp) => {
    appRef.current = app;

    // If data exists from Supabase, load it
    if (tldrawData) {
      // Be defensive: ignore if already loaded/synced
      try {
        app.replaceStoreContents(deserializeTldrawJson(tldrawData));
      } catch (e) {
        // fallback: ignore corrupted data
        // eslint-disable-next-line no-console
        console.error("Failed to load tldraw data from Supabase:", e);
      }
    }

    // Listen for document changes and persist
    const cleanup = app.store.listen(
      () => {
        // Serialize and send to Supabase
        const doc = serializeTldrawJson(app.store);
        setTldrawData(doc);
        saveTldrawData(doc);
      },
      { source: "user" }
    );

    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tldrawData, setTldrawData, saveTldrawData]);

  // Show loading spinner while loading
  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-[80vh] min-h-[500px] w-full bg-white rounded-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow mb-8 h-[80vh] min-h-[500px] w-full">
      <Tldraw
        autoFocus
        persistenceKey={undefined} // No local persistence; we use Supabase
        onMount={handleMount}
        id={roomId}
      />
    </div>
  );
};

export default TldrawWhiteboard;
