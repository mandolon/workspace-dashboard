
import React, { useMemo, useCallback } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import TaskRowContent from './TaskRowContent';
import TaskRowFiles from './TaskRowFiles';
import TaskRowAssignees from './TaskRowAssignees';
import TaskRowContextMenu from './TaskRowContextMenu';
import DeleteTaskDialog from '../DeleteTaskDialog';
import { useTaskDeletion } from '@/hooks/useTaskDeletion';
import { formatDate } from '@/utils/taskUtils';
import { Task } from '@/types/task';

interface TaskRowProps {
  task: Task;
  editingTaskId: number | null;
  editingValue: string;
  onSetEditingValue: (value: string) => void;
  onTaskClick: (task: Task) => void;
  onTaskNameClick: (task: Task, e: React.MouseEvent) => void;
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
  onTaskNameClick,
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

  return (
    <>
      <TaskRowContextMenu
        task={task}
        onEditClick={onEditClick}
        onTaskStatusClick={onTaskStatusClick}
        onContextMenuDelete={handleContextMenuDelete}
      >
        <TableRow key={task.id} className="hover:bg-accent/50 group">
          {/* Adjusted py-0 for tighter vertical spacing in cells, TaskRowContent handles its internal padding */}
          <TableCell className="py-0 w-[50%]"> 
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
            />
          </TableCell>
          <TableCell className="text-xs text-muted-foreground py-1 w-[8%]"> {/* py-1 for consistency */}
            <TaskRowFiles hasAttachment={task.hasAttachment} />
          </TableCell>
          <TableCell className="text-xs text-muted-foreground py-1 w-[17%]"> {/* py-1 */}
            {formattedDate}
          </TableCell>
          <TableCell className="py-1 w-[25%]"> {/* py-1 */}
            <TaskRowAssignees
              task={task}
              onRemoveAssignee={onRemoveAssignee}
              onRemoveCollaborator={onRemoveCollaborator}
              onAssignPerson={onAssignPerson}
              onAddCollaborator={onAddCollaborator}
            />
          </TableCell>
        </TableRow>
      </TaskRowContextMenu>

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

