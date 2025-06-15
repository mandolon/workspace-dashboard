
import React, { useState } from 'react';
import { Edit, Check, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Task } from '@/types/task';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleDuplicateTask = () => {
    console.log('Duplicating task:', task.id);
    setIsOpen(false);
  };

  const handleMarkComplete = () => {
    onTaskStatusClick(task.id);
    setIsOpen(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick(task, e as any);
    setIsOpen(false);
  };

  // Close menu and trigger delete
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false); // Close menu immediately
    // Small delay to ensure menu closes before dialog opens
    setTimeout(() => {
      onContextMenuDelete(e);
    }, 0);
  };

  return (
    <ContextMenu open={isOpen} onOpenChange={setIsOpen}>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEditClick}>
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
