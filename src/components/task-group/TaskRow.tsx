
import React, { useMemo, useCallback } from 'react';
import { TableCell, TableRow as UiTableRow } from '@/components/ui/table'; // Renamed to avoid conflict
import TaskRowContent from './TaskRowContent';
import TaskRowFiles from './TaskRowFiles';
import TaskRowAssignees from './TaskRowAssignees';
import TaskRowContextMenu from './TaskRowContextMenu';
import DeleteTaskDialog from '../DeleteTaskDialog';
import { useTaskDeletion } from '@/hooks/useTaskDeletion';
import { formatDate } from '@/utils/taskUtils';
import { Task } from '@/types/task';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface TaskRowProps {
  task: Task;
  editingTaskId: number | null;
  editingValue: string;
  onSetEditingValue: (value: string) => void;
  onTaskClick: (task: Task) => void;
  onTaskNameClick: (task: Task, e: React.MouseEvent) => void; // Can be removed if not used
  onEditClick: (task: Task, e: React.MouseEvent) => void;
  onSaveEdit: (taskId: number) => void;
  onCancelEdit: () => void;
  onKeyDown: (e: React.KeyboardEvent, taskId: number) => void;
  onTaskStatusClick: (taskId: number) => void;
  onRemoveAssignee: (taskId: number, e: React.MouseEvent) => void;
  onRemoveCollaborator: (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => void;
  onAssignPerson: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  onAddCollaborator: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  onTaskDeleted?: () => void;
}

const TaskRow = React.memo(({
  task,
  editingTaskId,
  editingValue,
  onSetEditingValue,
  onTaskClick,
  // onTaskNameClick, // Removed if not used
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onKeyDown,
  onTaskStatusClick,
  onRemoveAssignee,
  onRemoveCollaborator,
  onAssignPerson,
  onAddCollaborator,
  onTaskDeleted
}: TaskRowProps) => {
  const {
    showDeleteDialog,
    taskToDelete,
    isDeleting,
    handleDeleteClick,
    handleDeleteTask,
    handleCloseDeleteDialog
  } = useTaskDeletion();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formattedDate = useMemo(() => formatDate(task.dateCreated), [task.dateCreated]);

  const handleDeleteClickInternal = useCallback((e: React.MouseEvent) => {
    handleDeleteClick(task, e);
  }, [handleDeleteClick, task]);

  const handleContextMenuDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDeleteClick(task, e);
  }, [handleDeleteClick, task]);

  const handleDeleteTaskInternal = useCallback(async () => {
    await handleDeleteTask();
    if (onTaskDeleted) {
      onTaskDeleted();
    }
  }, [handleDeleteTask, onTaskDeleted]);
  
  // Stop propagation for context menu trigger to prevent row click
  const handleContextMenuTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };


  return (
    <>
      <UiTableRow 
        ref={setNodeRef} 
        style={style}
        className={cn(
          "hover:bg-accent/50 group",
          isDragging && "opacity-50 shadow-lg"
        )}
      >
        <TaskRowContextMenu
          task={task}
          onEditClick={onEditClick}
          onTaskStatusClick={onTaskStatusClick}
          onContextMenuDelete={handleContextMenuDelete}
        >
          {/* The TableRow itself is the context menu trigger, this div is for proper structure */}
          <div onClick={handleContextMenuTriggerClick} className="contents"> 
            <TableCell 
              className="py-1.5 w-[50%] cursor-default" // Adjusted padding
              {...attributes} // Spread attributes for dnd-kit
              {...listeners}  // Spread listeners for dnd-kit, this makes the whole row draggable via the handle
            >
              <TaskRowContent
                task={task}
                editingTaskId={editingTaskId}
                editingValue={editingValue}
                onSetEditingValue={onSetEditingValue}
                onTaskClick={onTaskClick}
                onEditClick={onEditClick}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onKeyDown={onKeyDown}
                onTaskStatusClick={onTaskStatusClick}
                onDeleteClick={handleDeleteClickInternal}
                isDragging={isDragging}
              />
            </TableCell>
            <TableCell className="py-1.5 w-[8%] cursor-default" onClick={(e) => e.stopPropagation()}>
              <TaskRowFiles hasAttachment={task.hasAttachment} />
            </TableCell>
            <TableCell className="text-xs text-muted-foreground py-1.5 w-[17%] cursor-default" onClick={(e) => e.stopPropagation()}>
              {formattedDate}
            </TableCell>
            <TableCell className="py-1.5 w-[25%] cursor-default" onClick={(e) => e.stopPropagation()}>
              <TaskRowAssignees
                task={task}
                onRemoveAssignee={onRemoveAssignee}
                onRemoveCollaborator={onRemoveCollaborator}
                onAssignPerson={onAssignPerson}
                onAddCollaborator={onAddCollaborator}
              />
            </TableCell>
          </div>
        </TaskRowContextMenu>
      </UiTableRow>

      <DeleteTaskDialog
        isOpen={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteTaskInternal}
        taskTitle={taskToDelete?.title || task.title}
        isLoading={isDeleting}
      />
    </>
  );
});

TaskRow.displayName = "TaskRow";

export default TaskRow;
