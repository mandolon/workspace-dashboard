
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
  // For sorting
  currentSortBy?: 'dateCreated' | 'assignee' | null;
  currentSortDirection?: 'asc' | 'desc';
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
  currentSortBy,
  currentSortDirection,
  onDateCreatedFilterClick,
  onAssignedToFilterClick,
}, ref) => {
  const memoizedTasks = React.useMemo(() => tasks, [tasks]);
  // Which column is sorted and direction? Used for triangle orientation/fill
  const isDateActive = currentSortBy === 'dateCreated';
  const isAssigneeActive = currentSortBy === 'assignee';

  return (
    <div ref={ref}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[50%] pl-8 transition-colors hover:bg-blue-50 cursor-pointer">
              Name
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[8%] transition-colors hover:bg-blue-50 cursor-pointer">
              Files
            </TableHead>
            {/* Date Created - functional filter triangle */}
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[17%] transition-colors hover:bg-blue-50 cursor-pointer">
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
                    className={`w-2 h-2 pointer-events-none transition-transform duration-150 
                      ${isDateActive ? 
                        (currentSortDirection === 'desc' ? 'rotate-180' : '') 
                        : 'rotate-180 opacity-50'}
                      ${isDateActive ? 'text-blue-500 fill-blue-400' : 'text-gray-400 fill-gray-200'}`}
                    fill={isDateActive ? "currentColor" : "#E5E7EB"}
                    aria-hidden="true"
                  />
                  <span className="sr-only">Filter by date created</span>
                </button>
              </div>
            </TableHead>
            {/* Assigned to - functional filter triangle */}
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-[25%] transition-colors hover:bg-blue-50 cursor-pointer">
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
                    className={`w-2 h-2 pointer-events-none transition-transform duration-150 
                      ${isAssigneeActive ? 
                        (currentSortDirection === 'desc' ? 'rotate-180' : '') 
                        : 'rotate-180 opacity-50'}
                      ${isAssigneeActive ? 'text-blue-500 fill-blue-400' : 'text-gray-400 fill-gray-200'}`}
                    fill={isAssigneeActive ? "currentColor" : "#E5E7EB"}
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

