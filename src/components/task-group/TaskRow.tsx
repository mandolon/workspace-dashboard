
import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import TaskRowContent from './TaskRowContent';
import TaskRowFiles from './TaskRowFiles';
import TaskRowAssignees from './TaskRowAssignees';
import TaskRowContextMenu from './TaskRowContextMenu';
import DeleteTaskDialog from '../DeleteTaskDialog';
import { formatDate } from '@/utils/taskUtils';
import { Task } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';

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

const TaskRow = ({
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteTask } = useTaskContext();

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      
      if (onTaskDeleted) {
        onTaskDeleted();
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleContextMenuDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Context menu delete clicked for task:', task.id);
    setShowDeleteDialog(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  return (
    <>
      <TaskRowContextMenu
        task={task}
        onEditClick={onEditClick}
        onTaskStatusClick={onTaskStatusClick}
        onContextMenuDelete={handleContextMenuDelete}
      >
        <TableRow key={task.id} className="hover:bg-accent/50 group">
          <TableCell className="py-2 w-[50%]">
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
              onDeleteClick={handleDeleteClick}
            />
          </TableCell>
          <TableCell className="py-2 w-[8%]">
            <TaskRowFiles hasAttachment={task.hasAttachment} />
          </TableCell>
          <TableCell className="text-xs text-muted-foreground py-2 w-[17%]">
            {formatDate(task.dateCreated)}
          </TableCell>
          <TableCell className="py-2 w-[25%]">
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
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteTask}
        taskTitle={task.title}
        isLoading={isDeleting}
      />
    </>
  );
};

export default TaskRow;
