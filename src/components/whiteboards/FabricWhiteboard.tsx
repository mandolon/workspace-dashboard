import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, IText, Image as FabricImage } from "fabric";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { WhiteboardToolbar } from "./WhiteboardToolbar";

const DEFAULT_WIDTH = 1100;
const DEFAULT_HEIGHT = 700;

// "draw" is freehand, "select" disables drawing mode, shapes/text insert, "clear"/"save" are actions
type Tool = "draw" | "select" | "rectangle" | "circle" | "text" | "image" | "clear" | "save";

const FabricWhiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const loadedOnce = useRef(false);

  const [activeTool, setActiveTool] = useState<Tool>("draw");

  // Load whiteboard data from Supabase
  useEffect(() => {
    let localCanvas: Canvas | null = null;
    let unsub = false;

    async function loadBoard() {
      toast("Loading whiteboard...");
      const { data, error } = await import("@/integrations/supabase/client").then(
        mod =>
          mod.supabase
            .from("whiteboards")
            .select("tldraw_data, title")
            .eq("id", id)
            .maybeSingle()
      );

      if (unsub) return;

      if (error || !data) {
        toast.error("Failed to load whiteboard.");
        return;
      }

      if (!canvasRef.current) return;
      const canvas = new Canvas(canvasRef.current, {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        backgroundColor: "#fff",
        preserveObjectStacking: true,
      });
      fabricRef.current = canvas;
      localCanvas = canvas;

      // Load saved objects if they exist
      if (data.tldraw_data) {
        try {
          canvas.loadFromJSON(data.tldraw_data, () => {
            canvas.renderAll();
          });
        } catch (e) {
          toast.error("Failed to load whiteboard data.");
        }
      }
      // Register drawing events
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 2;
      canvas.freeDrawingBrush.color = "#1a202c";
      loadedOnce.current = true;
    }
    loadBoard();

    return () => {
      if (localCanvas) {
        localCanvas.dispose();
      }
      unsub = true;
    };
  }, [id]);

  // 1. Add ref for file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update FabricJS for active tool
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Drawing/browsing mode
    if (activeTool === "draw") {
      canvas.isDrawingMode = true;
      canvas.selection = false;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = 2;
        canvas.freeDrawingBrush.color = "#1a202c";
      }
    } else {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.discardActiveObject();
      canvas.renderAll();
    }

    // Insert shapes/text on demand (handlers below)
    // "clear" and "save" handled separately
    // "select" just disables drawing mode
  }, [activeTool]);

  // Toolbar actions logic
  function handleToolbarAction(tool: Tool) {
    if (tool === "rectangle") {
      addRect();
      setActiveTool("select");
    } else if (tool === "circle") {
      addCircle();
      setActiveTool("select");
    } else if (tool === "text") {
      addText();
      setActiveTool("select");
    } else if (tool === "image") {
      // When image tool is selected, trigger hidden file input
      fileInputRef.current?.click();
      // Do NOT switch to select yet; will handle after image loads
    } else if (tool === "clear") {
      handleClear();
    } else if (tool === "save") {
      handleSave();
    } else {
      setActiveTool(tool);
    }
  }

  // Image insertion logic
  function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const canvas = fabricRef.current;
    const file = e.target.files?.[0];
    if (!canvas || !file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;
      // Use Fabric v6 async fromURL signature
      FabricImage.fromURL(dataUrl, {
        crossOrigin: 'anonymous'
      }).then((img) => {
        img.set({
          left: 150,
          top: 150,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        setActiveTool("select");
      });
    };
    reader.readAsDataURL(file);
    // Reset file input to allow uploading the same image again
    e.target.value = "";
  }

  // Save/load logic same as before
  async function handleSave() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const json = canvas.toJSON();
    const { error } = await import("@/integrations/supabase/client").then(
      mod =>
        mod.supabase
          .from("whiteboards")
          .update({ tldraw_data: json, updated_at: new Date().toISOString() })
          .eq("id", id)
    );
    if (error) {
      toast.error("Failed to save whiteboard.");
    } else {
      toast.success("Saved whiteboard!");
    }
  }

  function handleClear() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = "#fff";
    canvas.renderAll();
  }

  function addRect() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const rect = new Rect({
      left: 120,
      top: 100,
      width: 100,
      height: 60,
      fill: "#ffec99",
      stroke: "#ed8936",
      strokeWidth: 2,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
  }

  function addCircle() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const circ = new Circle({
      left: 240,
      top: 150,
      radius: 40,
      fill: "#f4f4f5",
      stroke: "#38bdf8",
      strokeWidth: 2,
    });
    canvas.add(circ);
    canvas.setActiveObject(circ);
  }

  function addText() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const text = new IText("Double-click to edit", {
      left: 300,
      top: 200,
      fontFamily: "system-ui",
      fontSize: 28,
      fill: "#333",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  }

  return (
    <div className="h-[81vh] flex flex-row md:gap-6 gap-2 mx-auto max-w-5xl pt-6 pb-3">
      {/* Toolbar (docked left on desktop, top on mobile) */}
      <div className="flex-none md:mr-4 mr-2">
        <WhiteboardToolbar
          activeTool={activeTool}
          onToolChange={handleToolbarAction}
        />
        {/* Hidden file input for images */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageFileChange}
          style={{ display: "none" }}
          tabIndex={-1}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="rounded-lg border bg-background shadow flex justify-center items-center">
          <canvas
            ref={canvasRef}
            width={DEFAULT_WIDTH}
            height={DEFAULT_HEIGHT}
            style={{ maxWidth: "100%", background: "#fff" }}
          />
        </div>
        <div className="text-xs text-muted-foreground pl-1 pt-2">
          <b>Tools:</b> Use toolbar. Draw mode: freehand. Select/move: pointer tool. Add/upload images via image tool. Double click text to edit.
        </div>
      </div>
    </div>
  );
};

export default FabricWhiteboard;
