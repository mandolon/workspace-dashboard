
import React, { useState } from 'react';
import TaskNameCell from './TaskNameCell';
import TaskActionMenu from './TaskActionMenu';
import TaskFileCell from './TaskFileCell';
import { TableCell, TableRow } from '@/components/ui/table';
import TaskStatusIcon from '../TaskStatusIcon';
import TaskRowAssignees from './TaskRowAssignees';
import DeleteTaskDialog from '../DeleteTaskDialog';
import { formatDate } from '@/utils/taskUtils';
import { Task } from '@/types/task';
import { softDeleteTask, restoreTask } from '@/data/taskData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  columnConfig: {
    key: string;
    label: string;
    headClassName: string;
    cellClassName: string;
  }[];
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
  onTaskDeleted,
  columnConfig
}: TaskRowProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    try {
      const deletedTask = softDeleteTask(task.id, "AL"); // Current user
      
      if (deletedTask) {
        toast({
          title: "Task deleted",
          description: `"${task.title}" has been deleted.`,
          action: (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleUndoDelete()}
            >
              Undo
            </Button>
          ),
          duration: 5000,
        });

        if (onTaskDeleted) {
          onTaskDeleted();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleUndoDelete = () => {
    const restoredTask = restoreTask(task.id);
    if (restoredTask) {
      toast({
        title: "Task restored",
        description: "Task has been restored successfully.",
        duration: 3000,
      });

      if (onTaskDeleted) {
        onTaskDeleted();
      }
    }
  };

  const handleDuplicateTask = () => {
    console.log('Duplicating task:', task.id);
  };

  const handleMarkComplete = () => {
    onTaskStatusClick(task.id);
  };

  // Remove context menu from here—move into dedicated component
  return (
    <>
      <TaskActionMenu
        onEdit={(e) => onEditClick(task, e)}
        onMarkComplete={handleMarkComplete}
        onDuplicate={handleDuplicateTask}
        onDelete={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDeleteDialog(true);
        }}
      >
        <TableRow key={task.id} className="hover:bg-accent/50 group">
          {/* Name column */}
          <TableCell className={columnConfig[0].cellClassName}>
            <div className="flex items-center gap-2">
              <TaskStatusIcon 
                status={task.status} 
                onClick={() => onTaskStatusClick(task.id)}
              />
              <TaskNameCell
                editing={editingTaskId === task.id}
                value={editingValue}
                onSetValue={onSetEditingValue}
                onKeyDown={e => onKeyDown(e, task.id)}
                onSave={e => {
                  e.stopPropagation();
                  onSaveEdit(task.id);
                }}
                onCancel={e => {
                  e.stopPropagation();
                  onCancelEdit();
                }}
                onEdit={e => onEditClick(task, e)}
                onDelete={e => {
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
                title={task.title}
                project={task.project}
                onClick={() => onTaskClick(task)}
              />
            </div>
          </TableCell>
          {/* Files column */}
          <TableCell className={columnConfig[1].cellClassName}>
            <TaskFileCell 
              hasAttachment={task.hasAttachment}
              onAddAttachment={(e) => {
                e.stopPropagation();
                // Handle file attachment
              }}
            />
          </TableCell>
          {/* Date Created column */}
          <TableCell className={columnConfig[2].cellClassName + " text-xs text-muted-foreground"}>
            {formatDate(task.dateCreated)}
          </TableCell>
          {/* Assigned To column */}
          <TableCell className={columnConfig[3].cellClassName}>
            <TaskRowAssignees
              task={task}
              onRemoveAssignee={onRemoveAssignee}
              onRemoveCollaborator={onRemoveCollaborator}
              onAssignPerson={onAssignPerson}
              onAddCollaborator={onAddCollaborator}
            />
          </TableCell>
        </TableRow>
      </TaskActionMenu>

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

