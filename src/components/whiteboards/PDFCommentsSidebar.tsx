
import React from "react";
import { MessageSquareDashed } from "lucide-react";

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
  <aside className="w-[350px] h-full flex flex-col bg-[#f8fafc] border-l border-neutral-200 shadow-lg pt-6 px-7 pb-4 relative z-10">
    <h2 className="text-base font-semibold mb-6 text-[#232324]">Comments</h2>
    {pins.length === 0 ? (
      <div className="flex flex-col items-center justify-center text-center flex-1 mt-20">
        <MessageSquareDashed className="w-12 h-12 mb-3 text-muted-foreground" />
        <div className="text-xl font-semibold text-[#212426] mb-2">
          No Comments Yet
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          Click on the image to add comments<br />
          and assign Proofing requests.
        </div>
        {/* You could add a small image or SVG here to match the ref's illustration */}
        <div className="w-32 h-20 flex items-center justify-center mt-2 mb-2">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none"><ellipse cx="60" cy="30" rx="60" ry="20" fill="#FFEAFE"/><rect x="30" y="15" width="60" height="25" rx="5" fill="white" stroke="#E9D3FC" strokeWidth="2"/><circle cx="45" cy="27.5" r="5" fill="#EFA2B8"/><rect x="54" y="22" width="30" height="10" rx="2" fill="#EAEFFF"/><rect x="54" y="34" width="14" height="3" rx="1.5" fill="#EAF4FF"/></svg>
        </div>
        <span className="text-2xl absolute left-5 top-5 text-pink-400 select-none" style={{ transform: "rotate(-20deg)", opacity: 0.75 }}>←</span>
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        {pins
          .sort((a, b) => a.number - b.number)
          .map(pin => (
            <div
              key={pin.id}
              className={`cursor-pointer rounded p-3 border text-xs ${
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
  </aside>
);

export default PDFCommentsSidebar;
