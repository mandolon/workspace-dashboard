import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getAvailableProjects } from "@/utils/projectMapping";
import { createWhiteboard } from "@/utils/whiteboardStore";
import { useUser } from "@/contexts/UserContext";
import PDFUploadField from "./PDFUploadField";
import { supabase } from "@/integrations/supabase/client";

const WhiteboardCreateDialog: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [shared, setShared] = useState(true);
  const { currentUser } = useUser();
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const availableProjects = getAvailableProjects();

  const handleCreate = async () => {
    if (!title.trim() || !projectId) return;

    // If type is "pdf", require a file and upload to supabase storage
    let pdf_url: string | undefined = undefined;
    const type = "pdf";
    if (type === "pdf") {
      if (!pdfFile) return;
      const ext = pdfFile.name.split(".").pop();
      const key = `pdfs/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from("pdfs").upload(key, pdfFile);
      if (!error) {
        const { data: publicUrlData } = supabase
          .storage
          .from("pdfs")
          .getPublicUrl(key);
        pdf_url = publicUrlData?.publicUrl || "";
      }
    }

    createWhiteboard({
      title,
      type: "pdf",
      projectId,
      createdBy: currentUser.id,
      sharedWithClient: shared,
      pdf_url,
    });

    setTitle("");
    setProjectId("");
    setPdfFile(null);
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
          <Input
            placeholder="Whiteboard Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full"
          />
          <div>
            <label className="block text-xs font-medium mb-1">Project</label>
            <select
              className="w-full rounded border border-border px-2 py-1 text-sm"
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
            >
              <option value="">Select project...</option>
              {availableProjects.map(p => (
                <option key={p.projectId} value={p.projectId}>
                  {p.displayName}
                </option>
              ))}
            </select>
          </div>
          {/* PDF upload field */}
          <div className="flex items-center gap-3">
            <PDFUploadField onUpload={setPdfFile} />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="share-client"
              checked={shared}
              onCheckedChange={setShared}
            />
            <label htmlFor="share-client" className="text-xs">
              Share with client?
            </label>
          </div>
          <div className="flex justify-end">
            <Button variant="default" size="sm" onClick={handleCreate} disabled={!title.trim() || !projectId || (type === "pdf" && !pdfFile)}>
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhiteboardCreateDialog;
