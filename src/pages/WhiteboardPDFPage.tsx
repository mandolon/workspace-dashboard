import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PDFViewer from "@/components/whiteboards/PDFViewer";
import PDFCommentsSidebar from "@/components/whiteboards/PDFCommentsSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    // FIX: Cleanup must be synchronous!
    return () => { supabase.removeChannel(channel); }
  }, [id]);

  // On PDF pin drop
  function handlePinDrop(pos: { x: number; y: number }) {
    setPendingPin(pos);
  }

  // Add comment for pin
  async function handleSubmitComment() {
    if (!id || !currentUser || !pendingPin || !newCommentText.trim()) return;
    // Next pin number (sequence)
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
      setActivePin(n); // focus on it
    }
  }

  if (!whiteboard) {
    return <div className="p-8">Loading whiteboard...</div>;
  }
  if (!whiteboard.pdf_url) {
    return <div className="p-8">No PDF was uploaded for this whiteboard.</div>;
  }

  return (
    <div className="flex h-full bg-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold py-4">{whiteboard.title}</h1>
        <PDFViewer
          fileUrl={whiteboard.pdf_url}
          pins={pins}
          pageNumber={pageNumber}
          onPinDrop={handlePinDrop}
          onPageChange={setPageNumber}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
        {/* When pin drop is activated, show comment box */}
        {pendingPin && (
          <div className="mt-4 w-full max-w-xs mx-auto bg-muted border rounded-lg p-4">
            <div className="text-sm mb-2">Add a comment for this pin:</div>
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
      <PDFCommentsSidebar pins={pins} activePin={activePin} setActivePin={setActivePin} />
    </div>
  );
};

export default WhiteboardPDFPage;
