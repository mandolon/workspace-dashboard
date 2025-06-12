
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TaskRow from './TaskRow';
import { Task } from '@/types/task';

interface TaskTableProps {
  tasks: Task[];
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
}

const TaskTable = ({
  tasks,
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
  onAddCollaborator
}: TaskTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-border">
          <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[50%] pl-8">Name</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[8%]">Files</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[17%]">Date Created</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[25%]">Assigned to</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            editingTaskId={editingTaskId}
            editingValue={editingValue}
            onSetEditingValue={onSetEditingValue}
            onTaskClick={onTaskClick}
            onTaskNameClick={onTaskNameClick}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onKeyDown={onKeyDown}
            onTaskStatusClick={onTaskStatusClick}
            onRemoveAssignee={onRemoveAssignee}
            onRemoveCollaborator={onRemoveCollaborator}
            onAssignPerson={onAssignPerson}
            onAddCollaborator={onAddCollaborator}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
