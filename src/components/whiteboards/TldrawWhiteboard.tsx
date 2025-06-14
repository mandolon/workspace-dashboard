import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import CustomTldrawToolbar from "./CustomTldrawToolbar";

interface Props {
  roomId?: string;
}

const TldrawWhiteboard: React.FC<Props> = ({ roomId }) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white shadow mb-8 h-[80vh] min-h-[500px] flex flex-col">
      {/* Custom Toolbar */}
      <CustomTldrawToolbar />
      <div className="flex-1 min-h-0">
        <Tldraw
          persistenceKey={roomId}
          autoFocus
          hideUi // Hides all default tldraw UI, leaving canvas only
        />
      </div>
    </div>
  );
};

export default TldrawWhiteboard;
