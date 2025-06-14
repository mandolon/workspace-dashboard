
import React, { useEffect, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface ExcalidrawData {
  elements: readonly any[];
  appState: any;
  files?: Record<string, any>;
}

const ExcalidrawWhiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [excalidrawData, setExcalidrawData] = useState<ExcalidrawData | null>(null);
  const [scene, setScene] = useState<ExcalidrawData>({
    elements: [],
    appState: {},
    files: {},
  });
  const { currentUser } = useUser();

  // Load whiteboard data from Supabase
  useEffect(() => {
    const fetchWhiteboard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("whiteboards")
        .select("excalidraw_data,title")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        toast.error("Failed to load whiteboard.");
        setLoading(false);
        return;
      }
      const safeData = data.excalidraw_data || { elements: [], appState: { viewBackgroundColor: "#fff" } };
      setExcalidrawData(safeData);
      setScene(safeData);
      setLoading(false);
    };
    fetchWhiteboard();
    // eslint-disable-next-line
  }, [id]);

  // Save handler
  const handleSave = async () => {
    // Save current scene
    const { elements, appState, files } = scene;
    // Store as plain JS arrays/objects
    const newData = {
      elements: Array.isArray(elements) ? elements : Array.from(elements ?? []),
      appState,
      files: files ?? {},
    };
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
          initialData={excalidrawData ?? undefined}
          onChange={(elements, appState, files) => setScene({ elements, appState, files })}
        />
      </div>
    </div>
  );
};

export default ExcalidrawWhiteboard;

