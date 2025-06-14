import React, { useState } from 'react';
import WhiteboardCard from './WhiteboardCard';
import { getVisibleWhiteboardsForUser } from "@/utils/whiteboardStore";
import { useUser } from "@/contexts/UserContext";
import { projectClientData } from "@/data/projectClientStaticData";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import DeleteWhiteboardDialog from "./DeleteWhiteboardDialog";
import { deleteWhiteboard } from "@/utils/whiteboardStore";

// Helper
function getProjectName(projectId: string) {
  const p = projectClientData[projectId];
  if (!p) return projectId;
  const primaryClient = p.clients.find(c => c.isPrimary) || p.clients[0];
  return `${primaryClient?.lastName ?? ""} • ${p.projectAddress}`;
}

const WhiteboardsGrid = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
  const { currentUser } = useUser();
  const [dialog, setDialog] = useState<null | { id: string, title: string }>(null);
  const [refresh, setRefresh] = useState(0);

  const whiteboards = getVisibleWhiteboardsForUser(currentUser);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteWhiteboard(id);
    setDialog(null);
    setRefresh(r => r + 1);
  };

  if (whiteboards.length === 0) return (
    <div className="text-center text-muted-foreground italic py-8">
      No whiteboards found for your projects.
    </div>
  );

  // Context menu for both grid and list, code below is DRY for both:
  const renderCardWithContextMenu = (whiteboard: any, content: React.ReactNode) => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div>
          {content}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => setDialog({ id: whiteboard.id, title: whiteboard.title })}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  if (viewMode === 'list') {
    return (
      <>
        <div className="px-6 py-4">
          <div className="space-y-2">
            {whiteboards.map((whiteboard) =>
              renderCardWithContextMenu(whiteboard,
                <div
                  key={whiteboard.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer"
                  onClick={() => whiteboard.type === 'tldraw' ? navigate(`/whiteboard/${whiteboard.id}`) : undefined}
                  title={whiteboard.type === 'tldraw' ? "Open Whiteboard" : undefined}
                >
                  <div className="w-8 h-8 bg-muted rounded flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-sm flex gap-2 items-center">
                      {whiteboard.title}
                      {whiteboard.sharedWithClient && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px]">Shared</span>
                      )}
                      {whiteboard.type === 'tldraw' && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded">tldraw</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{getProjectName(whiteboard.projectId)}</div>
                    <div className="text-xs text-muted-foreground">{whiteboard.lastModified}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <DeleteWhiteboardDialog
          open={!!dialog}
          onOpenChange={(open) => !open && setDialog(null)}
          onConfirm={() => dialog && handleDelete(dialog.id)}
          whiteboardTitle={dialog?.title}
        />
      </>
    );
  }

  return (
    <>
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {whiteboards.map((whiteboard) =>
            renderCardWithContextMenu(whiteboard,
              <div key={whiteboard.id}
                onClick={() => whiteboard.type === 'tldraw' ? navigate(`/whiteboard/${whiteboard.id}`) : undefined}
                className="cursor-pointer"
                title={whiteboard.type === 'tldraw' ? "Open Whiteboard" : undefined}
              >
                <WhiteboardCard
                  whiteboard={{
                    ...whiteboard,
                    projectName: getProjectName(whiteboard.projectId),
                  }}
                  showSharingStatus
                />
              </div>
            )
          )}
        </div>
      </div>
      <DeleteWhiteboardDialog
        open={!!dialog}
        onOpenChange={(open) => !open && setDialog(null)}
        onConfirm={() => dialog && handleDelete(dialog.id)}
        whiteboardTitle={dialog?.title}
      />
    </>
  );
};

export default WhiteboardsGrid;
