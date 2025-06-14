import React from "react";
import { 
  Brush, 
  RectangleHorizontal,  // Fixed import
  Circle as CircleIcon, 
  Text as TextIcon, 
  Save, 
  Trash2, 
  SquareDashed, 
  Eraser,
  Image as ImageIcon,  // Import image icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

type Tool =
  | "draw"
  | "select"
  | "rectangle"
  | "circle"
  | "text"
  | "image"    // Add 'image' tool
  | "clear"
  | "save";

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const toolList: {
  key: Tool;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "draw",
    label: "Brush",
    icon: <Brush />,
  },
  {
    key: "select",
    label: "Select",
    icon: <SquareDashed />,
  },
  {
    key: "rectangle",
    label: "Rectangle",
    icon: <RectangleHorizontal />,
  },
  {
    key: "circle",
    label: "Circle",
    icon: <CircleIcon />,
  },
  {
    key: "text",
    label: "Text",
    icon: <TextIcon />,
  },
  {
    key: "image",
    label: "Image",
    icon: <ImageIcon />,      // Image icon in toolbar
  },
  {
    key: "clear",
    label: "Clear",
    icon: <Trash2 />,
  },
  {
    key: "save",
    label: "Save",
    icon: <Save />,
  },
];

export function WhiteboardToolbar({ activeTool, onToolChange }: ToolbarProps) {
  return (
    <TooltipProvider>
      <nav className="flex md:flex-col gap-1 p-2 bg-muted rounded-xl shadow transition-all select-none">
        {toolList.map((item) => (
          <Tooltip key={item.key}>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === item.key ? "secondary" : "ghost"}
                size="icon"
                className="h-11 w-11"
                aria-label={item.label}
                onClick={() => onToolChange(item.key)}
              >
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}
