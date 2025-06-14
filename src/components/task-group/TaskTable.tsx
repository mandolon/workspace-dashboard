import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
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
  onTaskDeleted?: () => void;
}

const columns = [
  {
    key: "name",
    label: "Name",
    headClassName: "w-1/2 pl-8 text-muted-foreground font-medium text-xs py-2",
    cellClassName: "w-1/2 pl-8",
  },
  {
    key: "files",
    label: "Files",
    headClassName: "w-[8%] text-muted-foreground font-medium text-xs py-2",
    cellClassName: "w-[8%]",
  },
  {
    key: "dateCreated",
    label: "Date Created",
    headClassName: "w-[17%] text-muted-foreground font-medium text-xs py-2",
    cellClassName: "w-[17%]",
  },
  {
    key: "assignedTo",
    label: "Assigned to",
    headClassName: "w-[25%] text-muted-foreground font-medium text-xs py-2",
    cellClassName: "w-[25%]",
  },
];

const TaskTable = React.forwardRef<HTMLDivElement, TaskTableProps>(({
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
  onAddCollaborator,
  onTaskDeleted
}, ref) => {
  return (
    <div ref={ref}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            {columns.map((col) => (
              <TableHead key={col.key} className={col.headClassName}>
                {col.label}
              </TableHead>
            ))}
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
              onTaskDeleted={onTaskDeleted}
              columnConfig={columns}
              // Pass columns, so the row could use className for correct alignment if it supports it
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

TaskTable.displayName = "TaskTable";

export default TaskTable;
