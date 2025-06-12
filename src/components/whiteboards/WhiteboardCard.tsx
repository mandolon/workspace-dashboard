
import React from 'react';
import { FileText } from 'lucide-react';

interface Whiteboard {
  id: string;
  title: string;
  type: string;
  lastModified: string;
  thumbnail: string;
}

interface WhiteboardCardProps {
  whiteboard: Whiteboard;
}

const WhiteboardCard = ({ whiteboard }: WhiteboardCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center group-hover:bg-muted/80 transition-colors">
        <FileText className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
          {whiteboard.title}
        </div>
        <div className="text-xs text-muted-foreground">
          {whiteboard.lastModified}
        </div>
      </div>
    </div>
  );
};

export default WhiteboardCard;
