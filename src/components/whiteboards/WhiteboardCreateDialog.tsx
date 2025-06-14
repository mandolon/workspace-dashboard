
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getAvailableProjects } from "@/utils/projectMapping";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
// Add toast
import { toast } from "@/components/ui/use-toast";

const WhiteboardCreateDialog: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [shared, setShared] = useState(true);
  const { currentUser } = useUser();
  const availableProjects = getAvailableProjects();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setError(null);
    if (!title.trim() || !projectId) return;
    setLoading(true);
    // create a new empty tldraw board in Supabase
    const id = Date.now().toString();
    const insertPayload = {
      id,
      title,
      type: "tldraw",
      last_modified: new Date().toISOString(),
      thumbnail: "/placeholder.svg",
      project_id: projectId,
      created_by: currentUser.id,
      shared_with_client: shared,
      tldraw_data: null,
    };
    const { error: supabaseError } = await supabase.from('whiteboards').insert([insertPayload]);
    setLoading(false);
    if (supabaseError) {
      setError(supabaseError.message || "Failed to create whiteboard.");
      toast({
        variant: "destructive",
        title: "Error creating whiteboard",
        description: supabaseError.message || "Failed to create whiteboard. Check Supabase policies and network.",
      });
      return;
    }
    toast({
      title: "Whiteboard created!",
      description: `"${title}" has been added.`,
    });
    setTitle("");
    setProjectId("");
    setShared(true);
    setOpen(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-2">Create Whiteboard</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Whiteboard</DialogTitle>
        <div className="space-y-3 p-2">
          {error && (
            <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2 mb-2">
              {error}
            </div>
          )}
          <Input
            placeholder="Whiteboard Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full"
            disabled={loading}
          />
          <div>
            <label className="block text-xs font-medium mb-1">Project</label>
            <select
              className="w-full rounded border border-border px-2 py-1 text-sm"
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
              disabled={loading}
            >
              <option value="">Select project...</option>
              {availableProjects.map(p => (
                <option key={p.projectId} value={p.projectId}>
                  {p.displayName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="share-client"
              checked={shared}
              onCheckedChange={setShared}
              disabled={loading}
            />
            <label htmlFor="share-client" className="text-xs">
              Share with client?
            </label>
          </div>
          <div className="flex justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={handleCreate}
              disabled={!title.trim() || !projectId || loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhiteboardCreateDialog;

