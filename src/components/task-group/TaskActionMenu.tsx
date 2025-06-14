
import React from 'react';
import { Edit, Check, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface TaskActionMenuProps {
  children: React.ReactNode;
  onEdit: (e: React.MouseEvent) => void;
  onMarkComplete: () => void;
  onDuplicate: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

const TaskActionMenu: React.FC<TaskActionMenuProps> = ({
  children,
  onEdit,
  onMarkComplete,
  onDuplicate,
  onDelete
}) => (
  <ContextMenu>
    <ContextMenuTrigger asChild>
      <div>{children}</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem onClick={onEdit}>
        <Edit className="w-4 h-4 mr-2" />
        Edit task
      </ContextMenuItem>
      <ContextMenuItem onClick={onMarkComplete}>
        <Check className="w-4 h-4 mr-2" />
        Mark as complete
      </ContextMenuItem>
      <ContextMenuItem onClick={onDuplicate}>
        <div className="w-4 h-4 mr-2" />
        Duplicate
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem 
        onClick={onDelete}
        className="text-destructive focus:text-destructive"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export default TaskActionMenu;
