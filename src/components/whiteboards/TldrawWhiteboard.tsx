
import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const TldrawWhiteboard: React.FC = () => {
  // You can pass props, callbacks, or a fileId to persist/save — for now, use the default.
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow mb-8" style={{ minHeight: 500 }}>
      <Tldraw />
    </div>
  );
};

export default TldrawWhiteboard;
