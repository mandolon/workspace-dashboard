
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TaskRow from './TaskRow';
import { Task } from '@/types/task';
import { Triangle } from 'lucide-react';

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

  // New: Optional filter callback props
  onDateCreatedFilterClick?: (e: React.MouseEvent) => void;
  onAssignedToFilterClick?: (e: React.MouseEvent) => void;
}

const TaskTable = React.memo(React.forwardRef<HTMLDivElement, TaskTableProps>(({
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
  onTaskDeleted,
  onDateCreatedFilterClick,
  onAssignedToFilterClick,
}, ref) => {
  const memoizedTasks = React.useMemo(() => tasks, [tasks]);

  return (
    <div ref={ref}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[50%] pl-8">
              Name
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[8%]">
              Files
            </TableHead>
            {/* Date Created - with functional filter triangle */}
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[17%]">
              <div className="flex items-center gap-1 relative w-fit select-none group/date">
                Date Created
                <button
                  type="button"
                  className="ml-1 p-0 bg-transparent border-none rounded cursor-pointer opacity-0 group-hover/date:opacity-100 hover:opacity-100 transition-opacity duration-150 outline-none focus:ring-1 focus:ring-blue-300 focus:bg-blue-50 active:bg-blue-100"
                  style={{ lineHeight: 0, display: 'flex', alignItems: 'center' }}
                  onClick={onDateCreatedFilterClick}
                  aria-label="Filter by date"
                  tabIndex={0}
                >
                  <Triangle
                    className="w-2 h-2 text-gray-400 fill-current rotate-180 pointer-events-none"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Filter by date created</span>
                </button>
              </div>
            </TableHead>
            {/* Assigned to - with functional filter triangle */}
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[25%]">
              <div className="flex items-center gap-1 relative w-fit select-none group/assigned">
                Assigned to
                <button
                  type="button"
                  className="ml-1 p-0 bg-transparent border-none rounded cursor-pointer opacity-0 group-hover/assigned:opacity-100 hover:opacity-100 transition-opacity duration-150 outline-none focus:ring-1 focus:ring-blue-300 focus:bg-blue-50 active:bg-blue-100"
                  style={{ lineHeight: 0, display: 'flex', alignItems: 'center' }}
                  onClick={onAssignedToFilterClick}
                  aria-label="Filter by assignee"
                  tabIndex={0}
                >
                  <Triangle
                    className="w-2 h-2 text-gray-400 fill-current rotate-180 pointer-events-none"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Filter by assignee</span>
                </button>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-b">
          {memoizedTasks.map((task) => (
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
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}));

TaskTable.displayName = "TaskTable";

export default TaskTable;
