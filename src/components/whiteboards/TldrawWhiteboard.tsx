
import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const TldrawWhiteboard: React.FC = () => {
  // Show the full tldraw UI for a classic whiteboard experience.
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow mb-8 h-[80vh] min-h-[500px]">
      <Tldraw viewport="fullscreen" />
    </div>
  );
};

export default TldrawWhiteboard;

