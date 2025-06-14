
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PDFViewer from "@/components/whiteboards/PDFViewer";
import PDFCommentsSidebar from "@/components/whiteboards/PDFCommentsSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus, MoveLeft } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

type PDFPin = {
  id: string;
  page: number;
  x: number;
  y: number;
  number: number;
  comment: string;
};

interface Whiteboard {
  id: string;
  title: string;
  pdf_url: string;
}

const WhiteboardPDFPage = () => {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [whiteboard, setWhiteboard] = useState<Whiteboard | null>(null);
  const [pins, setPins] = useState<PDFPin[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [pendingPin, setPendingPin] = useState<{ x: number; y: number } | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activePin, setActivePin] = useState<number | null>(null);

  // Fetch whiteboard record
  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("whiteboards")
        .select("id, title, pdf_url")
        .eq("id", id)
        .single();
      if (!error) setWhiteboard(data as Whiteboard);
    })();
  }, [id]);

  // Fetch pins
  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("pdf_comments")
        .select("*")
        .eq("whiteboard_id", id);
      if (data) setPins(data.map((d, idx) => ({
        id: d.id,
        page: d.page_number,
        x: Number(d.x),
        y: Number(d.y),
        number: d.comment_number,
        comment: d.comment_text
      })));
    })();
    // Real-time sync
    const channel = supabase
      .channel("pdf-comments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pdf_comments", filter: `whiteboard_id=eq.${id}` },
        payload => {
          // Simply refetch pins on any change
          supabase
            .from("pdf_comments")
            .select("*")
            .eq("whiteboard_id", id)
            .then(({ data }) => {
              if (data)
                setPins(
                  data.map((d) => ({
                    id: d.id,
                    page: d.page_number,
                    x: Number(d.x),
                    y: Number(d.y),
                    number: d.comment_number,
                    comment: d.comment_text,
                  }))
                );
            });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); }
  }, [id]);

  // On PDF pin drop
  function handlePinDrop(pos: { x: number; y: number }) {
    setPendingPin(pos);
  }

  // Add comment for pin
  async function handleSubmitComment() {
    if (!id || !currentUser || !pendingPin || !newCommentText.trim()) return;
    const n = pins.length === 0 ? 1 : Math.max(...pins.map(p => p.number)) + 1;
    const { error } = await supabase.from("pdf_comments").insert({
      whiteboard_id: id,
      user_id: currentUser.id,
      comment_text: newCommentText,
      page_number: pageNumber,
      x: pendingPin.x,
      y: pendingPin.y,
      comment_number: n,
    });
    if (!error) {
      setNewCommentText("");
      setPendingPin(null);
      setActivePin(n);
    }
  }

  // Download the PDF
  const handleDownload = () => {
    if (!whiteboard?.pdf_url) return;
    const link = document.createElement("a");
    link.href = whiteboard.pdf_url;
    link.download = "whiteboard.pdf";
    link.click();
  };

  if (!whiteboard) {
    return <div className="p-8">Loading whiteboard...</div>;
  }
  if (!whiteboard.pdf_url) {
    return <div className="p-8">No PDF was uploaded for this whiteboard.</div>;
  }

  return (
    <div className="min-h-screen bg-[#252627] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-[#1b1c1e] h-16 px-8 border-b border-[#232324] shadow-md relative z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <a href="/whiteboards">
              <MoveLeft className="w-5 h-5 text-muted-foreground" />
            </a>
          </Button>
          <div className="text-lg font-semibold text-white truncate max-w-[360px]">{whiteboard.title}</div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="text-white hover:bg-muted/30"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPendingPin({ x: 0.5, y: 0.5 })}
            className="gap-2 bg-primary text-white hover:bg-primary/80"
          >
            <Plus className="w-4 h-4" />
            Add comment
          </Button>
        </div>
      </div>
      {/* Main area */}
      <div className="flex-1 flex flex-row bg-[#252627]">
        <div className="flex-1 flex justify-center items-start px-0 py-10 overflow-x-auto">
          <div className="rounded-lg shadow-xl overflow-hidden border border-neutral-800 bg-black p-6 flex flex-col items-center">
            <PDFViewer
              fileUrl={whiteboard.pdf_url}
              pins={pins}
              pageNumber={pageNumber}
              onPinDrop={handlePinDrop}
              onPageChange={setPageNumber}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
            {pendingPin && (
              <div className="mt-6 w-[320px] bg-white border border-muted rounded-lg p-5 shadow-xl">
                <div className="text-sm mb-2 font-medium text-foreground">Add a comment for this pin:</div>
                <Input
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  className="mb-2"
                  autoFocus
                  placeholder="Enter comment"
                />
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => setPendingPin(null)}>Cancel</Button>
                  <Button size="sm" onClick={handleSubmitComment} disabled={!newCommentText.trim()}>Add</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <PDFCommentsSidebar pins={pins} activePin={activePin} setActivePin={setActivePin} />
      </div>
    </div>
  );
};

export default WhiteboardPDFPage;
