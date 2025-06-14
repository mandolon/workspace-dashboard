
import React, { useCallback } from "react";
import { Tldraw, TldrawApp, serializeTldrawDocument, deserializeTldrawDocument } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useSupabaseWhiteboard } from "@/hooks/useSupabaseWhiteboard";

interface Props {
  roomId?: string;
}

const TldrawWhiteboard: React.FC<Props> = ({ roomId }) => {
  const { tldrawData, setTldrawData, loaded, saveTldrawData } = useSupabaseWhiteboard(roomId);

  // tldraw fires onPersist as changes happen
  const handlePersist = useCallback(
    (app: TldrawApp) => {
      // Save to Supabase
      const doc = serializeTldrawDocument(app.store);
      setTldrawData(doc);
      saveTldrawData(doc);
    },
    [setTldrawData, saveTldrawData]
  );

  // If not loaded yet, show a loading spinner
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
        persistenceKey={undefined} // disable local persistence since we have Supabase
        onPersist={handlePersist}
        initialData={tldrawData ? deserializeTldrawDocument(tldrawData) : undefined}
        id={roomId}
      />
    </div>
  );
};

export default TldrawWhiteboard;
