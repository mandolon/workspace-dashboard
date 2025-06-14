
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const DEFAULT_WIDTH = 1100;
const DEFAULT_HEIGHT = 700;

const FabricWhiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  // In-memory loading & save fallback
  const loadedOnce = useRef(false);

  // Load whiteboard data from Supabase
  useEffect(() => {
    let localCanvas: fabric.Canvas | null = null;
    let unsub = false;

    async function loadBoard() {
      toast("Loading whiteboard...");
      const { data, error } = await supabase
        .from("whiteboards")
        .select("fabric_data, title")
        .eq("id", id)
        .maybeSingle();

      if (unsub) return;

      if (error || !data) {
        toast.error("Failed to load whiteboard.");
        return;
      }

      if (!canvasRef.current) return;
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        backgroundColor: "#fff",
        preserveObjectStacking: true,
      });
      fabricRef.current = canvas;
      localCanvas = canvas;

      // Load saved objects if they exist
      if (data.fabric_data) {
        try {
          canvas.loadFromJSON(data.fabric_data, () => {
            canvas.renderAll();
          });
        } catch (e) {
          toast.error("Failed to load whiteboard data.");
        }
      }

      // Register drawing events
      // Draw mode is on by default
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

  // Save to Supabase
  async function handleSave() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const json = canvas.toJSON();
    const { error } = await supabase
      .from("whiteboards")
      .update({ fabric_data: json, updated_at: new Date().toISOString() })
      .eq("id", id);
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

  function toggleDrawMode() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    toast(`Draw mode ${canvas.isDrawingMode ? "enabled" : "disabled"}`);
  }

  function addRect() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const rect = new fabric.Rect({
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
    const circ = new fabric.Circle({
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
    const text = new fabric.IText("Double-click to edit", {
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
    <div className="h-[81vh] flex flex-col gap-4 mx-auto max-w-5xl pt-6 pb-3">
      <div className="mb-2 flex items-center gap-2">
        <h2 className="font-semibold flex-1 truncate text-lg">Project Whiteboard</h2>
        <Button size="sm" variant="secondary" onClick={toggleDrawMode}>
          Toggle Draw
        </Button>
        <Button size="sm" variant="ghost" onClick={addRect}>
          Rectangle
        </Button>
        <Button size="sm" variant="ghost" onClick={addCircle}>
          Circle
        </Button>
        <Button size="sm" variant="ghost" onClick={addText}>
          Text
        </Button>
        <Button size="sm" variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button size="sm" variant="default" onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="rounded-lg border bg-background shadow flex justify-center items-center">
        <canvas
          ref={canvasRef}
          width={DEFAULT_WIDTH}
          height={DEFAULT_HEIGHT}
          style={{ maxWidth: "100%", background: "#fff" }}
        />
      </div>
      <div className="text-xs text-muted-foreground pl-1">
        Freehand: draw with mouse or finger. Select and move with pointer.
      </div>
    </div>
  );
};

export default FabricWhiteboard;
