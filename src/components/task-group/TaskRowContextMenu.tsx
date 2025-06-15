
import React, { useRef } from 'react';
import { Edit, Check, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Task } from '@/types/task';

// Add a prop for closing context menu
interface TaskRowContextMenuProps {
  task: Task;
  children: React.ReactNode;
  onEditClick: (task: Task, e: React.MouseEvent) => void;
  onTaskStatusClick: (taskId: number) => void;
  onContextMenuDelete: (e: React.MouseEvent) => void;
}

const TaskRowContextMenu = ({
  task,
  children,
  onEditClick,
  onTaskStatusClick,
  onContextMenuDelete
}: TaskRowContextMenuProps) => {
  // Use a ref to access underlying context menu API
  const contentRef = useRef<HTMLDivElement>(null);

  // Imperatively close the context menu (works with Radix)
  const closeContextMenu = () => {
    // Radix context menus will close when 'open' prop set to false or event bubbles
    // Dispatching custom keyboard navigation event, e.g. Escape key
    if (contentRef.current) {
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      contentRef.current.dispatchEvent(escEvent);
    }
  };

  const handleDuplicateTask = () => {
    console.log('Duplicating task:', task.id);
  };

  const handleMarkComplete = () => {
    onTaskStatusClick(task.id);
  };

  // Updated: close the context menu *before* opening any dialog
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeContextMenu();
    onContextMenuDelete(e);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent ref={contentRef}>
        <ContextMenuItem onClick={(e) => { e.stopPropagation(); onEditClick(task, e as any); }}>
          <Edit className="w-4 h-4 mr-2" />
          Edit task
        </ContextMenuItem>
        <ContextMenuItem onClick={handleMarkComplete}>
          <Check className="w-4 h-4 mr-2" />
          Mark as complete
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicateTask}>
          <div className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem 
          onClick={handleDeleteClick}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TaskRowContextMenu;
