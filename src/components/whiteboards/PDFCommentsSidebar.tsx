
import React from "react";

interface PDFPin {
  id: string;
  page: number;
  x: number;
  y: number;
  number: number;
  comment: string;
}

interface PDFCommentsSidebarProps {
  pins: PDFPin[];
  activePin: number | null;
  setActivePin: (n: number | null) => void;
}

const PDFCommentsSidebar: React.FC<PDFCommentsSidebarProps> = ({
  pins,
  activePin,
  setActivePin
}) => (
  <div className="w-64 bg-muted/50 h-full px-4 py-3 overflow-y-auto border-l">
    <h2 className="text-sm font-semibold mb-3">Comments</h2>
    {pins.length === 0 ? (
      <div className="text-xs italic text-muted-foreground">No pins yet</div>
    ) : (
      <div className="flex flex-col gap-4">
        {pins
          .sort((a, b) => a.number - b.number)
          .map(pin => (
            <div
              key={pin.id}
              className={`cursor-pointer rounded p-2 border text-xs ${
                activePin === pin.number
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-accent border-transparent"
              }`}
              onClick={() => setActivePin(pin.number)}
            >
              <div className="font-bold text-primary mb-1 flex items-center gap-2">
                <span className="border border-primary rounded-full px-2 py-0.5 text-xs">{pin.number}</span>
                Page {pin.page}
              </div>
              <div className="text-foreground">{pin.comment}</div>
            </div>
          ))}
      </div>
    )}
  </div>
);

export default PDFCommentsSidebar;
