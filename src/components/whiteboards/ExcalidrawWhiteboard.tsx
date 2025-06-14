
import React, { useEffect, useRef, useState } from "react";
import { Excalidraw, exportToBlob, serializeAsJSON, restore } from "@excalidraw/excalidraw";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface ExcalidrawData {
  elements: any[];
  appState: any;
  files?: Record<string, any>;
}

const ExcalidrawWhiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [excalidrawData, setExcalidrawData] = useState<ExcalidrawData | null>(null);
  const excalidrawRef = useRef<any>(null);
  const { currentUser } = useUser();

  // Load whiteboard data from Supabase
  useEffect(() => {
    const fetchWhiteboard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("whiteboards")
        .select("excalidraw_data,title")
        .eq("id", id)
        .single();
      if (error || !data) {
        toast.error("Failed to load whiteboard.");
        setLoading(false);
        return;
      }
      setExcalidrawData(data.excalidraw_data || { elements: [], appState: { viewBackgroundColor: "#fff" } });
      setLoading(false);
    };
    fetchWhiteboard();
    // eslint-disable-next-line
  }, [id]);

  // Save handler
  const handleSave = async () => {
    if (!excalidrawRef.current) return;
    const scene = await excalidrawRef.current.getSceneElements();
    const appState = excalidrawRef.current.getAppState();
    // Excalidraw export: elements, appState
    const newData = { elements: scene, appState };
    const { error } = await supabase
      .from("whiteboards")
      .update({ excalidraw_data: newData, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("Failed to save whiteboard.");
    } else {
      toast.success("Whiteboard saved!");
    }
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading whiteboard...</div>;

  return (
    <div className="h-[80vh] max-w-5xl mx-auto pt-6 pb-4">
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-lg font-semibold flex-1 truncate">Project Whiteboard</h2>
        <Button variant="outline" size="sm" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden bg-background shadow h-[70vh]">
        <Excalidraw
          ref={excalidrawRef}
          initialData={excalidrawData ?? undefined}
        />
      </div>
    </div>
  );
};

export default ExcalidrawWhiteboard;
