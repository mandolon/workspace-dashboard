
import React, { forwardRef } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { useDroppable } from '@dnd-kit/core';
import TaskTableHeader from './TaskTableHeader';
import DraggableTaskRow from './DraggableTaskRow';
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

const TaskTable = forwardRef<HTMLDivElement, TaskTableProps>(({
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
  // Get status from first task if available
  const status = tasks.length > 0 ? tasks[0].status : 'unknown';
  
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  console.log('TaskTable for status:', status, 'isOver:', isOver, 'tasks:', tasks.length);

  return (
    <div ref={ref} className="space-y-0">
      <TaskTableHeader />
      <div 
        ref={setNodeRef} 
        className={`min-h-[100px] transition-colors ${isOver ? 'bg-accent/20' : ''} rounded-md`}
      >
        <Table>
          <TableBody>
            {tasks.map((task) => (
              <DraggableTaskRow
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
    </div>
  );
});

TaskTable.displayName = "TaskTable";

export default TaskTable;
