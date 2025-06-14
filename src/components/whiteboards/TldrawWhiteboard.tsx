
import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

interface Props {
  roomId?: string;
}

const TldrawWhiteboard: React.FC<Props> = ({ roomId }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow mb-8 h-[80vh] min-h-[500px]">
      {/* Remove invalid viewport prop. */}
      {/* Use 'id' prop for persistence and to create unique boards */}
      <Tldraw
        id={roomId}
        persistenceKey={roomId}
        showPages={true}
        autoFocus
      />
    </div>
  );
};

export default TldrawWhiteboard;

