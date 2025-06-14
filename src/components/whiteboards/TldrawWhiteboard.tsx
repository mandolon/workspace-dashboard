
import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

interface Props {
  roomId?: string;
}

const TldrawWhiteboard: React.FC<Props> = ({ roomId }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow mb-8 h-[80vh] min-h-[500px]">
      {/* Remove unsupported 'id' prop. Use only 'persistenceKey'. */}
      <Tldraw
        persistenceKey={roomId}
        showPages={true}
        autoFocus
      />
    </div>
  );
};

export default TldrawWhiteboard;
