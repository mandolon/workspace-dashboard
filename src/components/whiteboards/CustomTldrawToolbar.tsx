
import React from "react";
import {
  Pen, Highlighter, RectangleHorizontal, Circle,
  Text as TextIcon, Eraser, CircleArrowUp, ZoomIn, ZoomOut, icons
} from "lucide-react";
import { useEditor } from "@tldraw/tldraw";
import { cn } from "@/lib/utils";

const TOOL_BUTTONS: Array<{
  key: string,
  icon: React.ReactNode,
  label: string,
}> = [
  { key: "select", icon: React.createElement(icons["select"]), label: "Select" },
  { key: "zoom-in", icon: <ZoomIn />, label: "Zoom In" },
  { key: "zoom-out", icon: <ZoomOut />, label: "Zoom Out" },
  { key: "draw", icon: <Pen />, label: "Pen" },
  { key: "highlight", icon: <Highlighter />, label: "Highlighter" },
  { key: "line", icon: React.createElement(icons["line"]), label: "Line" },
  { key: "rectangle", icon: <RectangleHorizontal />, label: "Rectangle" },
  { key: "ellipse", icon: <Circle />, label: "Ellipse" },
  { key: "text", icon: <TextIcon />, label: "Text" },
  { key: "eraser", icon: <Eraser />, label: "Eraser" },
];

const COLORS = [
  "#1a1a1a", "#e60000", "#ffbe3b", "#00a6ed", "#1adb4e", "#f087ff", "#ffffff"
];

const STROKE_WIDTHS = [
  { w: 2, label: "Thin" },
  { w: 4, label: "Medium" },
  { w: 8, label: "Thick" },
];

const CustomTldrawToolbar: React.FC = () => {
  const editor = useEditor();

  // Tool state
  const activeTool = editor?.getCurrentToolId();

  // Custom state for color/stroke (optional: could use editor's own state also)
  const [color, setColor] = React.useState<string>("#1a1a1a");
  const [stroke, setStroke] = React.useState<number>(2);

  // When tool change/color change: update tldraw style
  React.useEffect(() => {
    if (editor) {
      editor.setStyleForNextShapes('color', color);
      editor.setStyleForNextShapes('size', stroke);
    }
  }, [color, stroke, editor]);

  // Tool activation
  const handleTool = (tool: string) => {
    if (!editor) return;
    if (tool === "select") {
      editor.setCurrentTool("select");
    }
    else if (tool === "eraser") {
      editor.setCurrentTool("erase");
    }
    else if (tool === "zoom-in") {
      editor.zoomIn();
    }
    else if (tool === "zoom-out") {
      editor.zoomOut();
    }
    else if (tool === "highlight") {
      editor.setCurrentTool("draw");
      editor.setStyleForNextShapes('color', "#fff176");
      editor.setStyleForNextShapes('opacity', 0.32);
      editor.setStyleForNextShapes('size', 6);
      setColor("#fff176");
      setStroke(6);
    }
    else {
      // Supported shape tools: draw, line, rectangle, ellipse, text
      editor.setCurrentTool(tool);
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-3 py-2 rounded-t-md shadow border-b bg-[#f5f5f7] relative transition-all z-10"
    )}
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      {/* Ribbon: main tools */}
      {TOOL_BUTTONS.map(({ key, icon, label }) => (
        <button
          key={key}
          type="button"
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 mx-[2px] rounded-md transition bg-transparent hover:bg-[#eaeaef] active:shadow-inner select-none",
            activeTool === key ? "bg-white shadow-inner border" : ""
          )}
          title={label}
          onClick={() => handleTool(key)}
        >
          <div>{icon}</div>
          <span className="text-[10px] text-gray-700 mt-[1px]">{label}</span>
        </button>
      ))}
      <span className="mx-4 my-0 w-px h-7 bg-gray-300" />
      {/* Ribbon: Color */}
      <div className="flex items-center gap-1 ml-1">
        {COLORS.map((c) => (
          <button
            aria-label="Select color"
            key={c}
            className={cn(
              "rounded-full w-6 h-6 border transition relative flex items-center justify-center",
              c === "#ffffff" ? "border-gray-300" : "border"
            )}
            style={{ background: c, boxShadow: color === c ? "0 0 0 2px #007aff" : undefined }}
            onClick={() => setColor(c)}
          >
            {color === c && (
              <CircleArrowUp className="absolute -right-2 -top-2 text-[#007aff]" size={15} />
            )}
          </button>
        ))}
      </div>
      <span className="mx-4 my-0 w-px h-7 bg-gray-300" />
      {/* Ribbon: Stroke thickness */}
      <div className="flex items-center gap-1">
        {STROKE_WIDTHS.map(({ w, label }) => (
          <button
            aria-label={label}
            key={w}
            className={cn(
              "w-8 h-7 rounded flex flex-col items-center justify-center transition border border-transparent hover:border-gray-300",
              stroke === w ? "border-[#007aff] bg-white shadow" : ""
            )}
            onClick={() => setStroke(w)}
          >
            <div
              style={{
                background: "#222",
                height: `${w}px`,
                width: "18px",
                borderRadius: "4px",
                margin: "2px 0"
              }}
            />
            <span className="text-[9px] text-gray-500">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTldrawToolbar;
