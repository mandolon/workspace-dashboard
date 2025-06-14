
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllWhiteboards } from "@/utils/whiteboardStore";
import TldrawWhiteboard from "@/components/whiteboards/TldrawWhiteboard";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const WhiteboardPage = () => {
  const { whiteboardId } = useParams<{ whiteboardId: string }>();
  const navigate = useNavigate();

  const whiteboard = getAllWhiteboards().find((wb) => wb.id === whiteboardId);

  if (!whiteboard) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto py-10 px-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Whiteboard not found</h2>
          <Button onClick={() => navigate("/whiteboards")}>Back to Whiteboards</Button>
        </div>
      </AppLayout>
    );
  }

  // Only allow tldraw type, if not, show unsupported notice
  if (whiteboard.type !== "tldraw") {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto py-10 px-6 text-center">
          <h2 className="text-xl font-semibold mb-2">This whiteboard is not a tldraw board.</h2>
          <Button onClick={() => navigate("/whiteboards")}>Back to Whiteboards</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto w-full px-4 py-6">
        <div className="mb-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/whiteboards")}>
            ← Whiteboards
          </Button>
          <h2 className="text-lg font-semibold">{whiteboard.title}</h2>
        </div>
        <TldrawWhiteboard roomId={whiteboard.tldrawRoomId || whiteboard.id} />
      </div>
    </AppLayout>
  );
};

export default WhiteboardPage;
