
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskRow from './TaskRow';
import { Task } from '@/types/task';

interface DraggableTaskRowProps {
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

const DraggableTaskRow = (props: DraggableTaskRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskRow {...props} />
    </div>
  );
};

export default DraggableTaskRow;
