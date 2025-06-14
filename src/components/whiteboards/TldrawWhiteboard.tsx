
import React, { useCallback, useRef, useEffect } from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useSupabaseWhiteboard } from "@/hooks/useSupabaseWhiteboard";

interface Props {
  roomId?: string;
}
const TldrawWhiteboard: React.FC<Props> = ({ roomId }) => {
  const { tldrawData, setTldrawData, loaded, saveTldrawData } = useSupabaseWhiteboard(roomId);
  const editorRef = useRef<any>(null);

  // Handle change/persistence using the TldrawEditor instance
  const handleMount = useCallback((editor: any) => {
    editorRef.current = editor;

    // Load from Supabase if data exists
    if (tldrawData) {
      try {
        // tldraw v3 exposes store manipulation via 'editor.store'
        // We can load previous content using replaceStoreContents
        if (editor.replaceStoreContents) {
          editor.replaceStoreContents(tldrawData);
        }
      } catch (e) {
        // fallback: ignore corrupted data
        // eslint-disable-next-line no-console
        console.error("Failed to load tldraw data from Supabase:", e);
      }
    }

    // Listen for document changes and persist (minimal debounce)
    const offChange = editor.store.listen(
      () => {
        try {
          const doc = editor.store.getSnapshot(); // Get JSON representation of current data
          setTldrawData(doc);
          saveTldrawData(doc);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to save tldraw data to Supabase:", error);
        }
      },
      { source: "user" }
    );

    // Cleanup
    return () => {
      offChange();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tldrawData, setTldrawData, saveTldrawData]);

  // Show loading spinner while loading data
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
        persistenceKey={undefined} // Disables local persistence
        onMount={handleMount}
        // No 'id' prop, no 'initialData' prop. We load programmatically in handleMount.
      />
    </div>
  );
};

export default TldrawWhiteboard;
