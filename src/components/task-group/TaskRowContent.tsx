import React, { useCallback } from 'react';
import { Edit, Check, X, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TaskStatusIcon from '../TaskStatusIcon';
import { Task } from '@/types/task';
import { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core';

interface TaskRowContentProps {
  task: Task;
  editingTaskId: number | null;
  editingValue: string;
  onSetEditingValue: (value: string) => void;
  onTaskClick: (task: Task) => void;
  onEditClick: (task: Task, e: React.MouseEvent) => void;
  onSaveEdit: (taskId: number) => void;
  onCancelEdit: () => void;
  onKeyDown: (e: React.KeyboardEvent, taskId: number) => void;
  onTaskStatusClick: (taskId: number) => void;
  onDeleteClick: (e: React.MouseEvent) => void;
  isDragging?: boolean;
  dragAttributes?: DraggableAttributes;
  dragListeners?: SyntheticListenerMap;
}

const TaskRowContent = React.memo(({
  task,
  editingTaskId,
  editingValue,
  onSetEditingValue,
  onTaskClick,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onKeyDown,
  onTaskStatusClick,
  onDeleteClick,
  isDragging,
  dragAttributes,
  dragListeners,
}: TaskRowContentProps) => {
  const isEditing = editingTaskId === task.id;

  const handleTaskClick = useCallback(() => {
    if (!isEditing) { // Prevent navigation when editing
      onTaskClick(task);
    }
  }, [onTaskClick, task, isEditing]);

  const handleStatusClick = useCallback(() => {
    onTaskStatusClick(task.id);
  }, [onTaskStatusClick, task.id]);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    onEditClick(task, e);
  }, [onEditClick, task]);

  const handleSaveEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveEdit(task.id);
  }, [onSaveEdit, task.id]);

  const handleCancelEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onCancelEdit();
  }, [onCancelEdit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    onKeyDown(e, task.id);
  }, [onKeyDown, task.id]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSetEditingValue(e.target.value);
  }, [onSetEditingValue]);

  const handleInputClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleDragHandleClick = (e: React.MouseEvent) => {
    // Prevent row click when interacting with drag handle
    e.stopPropagation();
  };

  return (
    <div 
      className={`flex items-center gap-2 pl-1 ${isDragging ? 'opacity-50' : ''} ${!isEditing ? 'cursor-pointer' : ''}`}
      onClick={!isEditing ? handleTaskClick : undefined} // Only allow task click if not editing
    >
      <div 
        className="text-muted-foreground hover:text-foreground cursor-grab p-1 -ml-1" // Added padding for easier grabbing
        {...dragAttributes} 
        {...dragListeners}
        onClick={handleDragHandleClick} // Stop propagation on drag handle click
        role="button" // Added role for accessibility
        tabIndex={0} // Added tabIndex for accessibility
        aria-label="Drag task" // Added aria-label
      >
        <GripVertical className="w-4 h-4" strokeWidth="1.5" />
      </div>
      <TaskStatusIcon 
        status={task.status} 
        onClick={handleStatusClick}
        isDashed={true} // Make icon dashed
      />
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-1 py-1">
            <Input
              value={editingValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="text-xs h-6 px-1 py-0 border border-border"
              autoFocus
              onClick={handleInputClick}
            />
            <button
              onClick={handleSaveEdit}
              className="p-0.5 text-green-600 hover:text-green-700"
              aria-label="Save edit"
            >
              <Check className="w-3 h-3" strokeWidth="2" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-0.5 text-red-600 hover:text-red-700"
              aria-label="Cancel edit"
            >
              <X className="w-3 h-3" strokeWidth="2" />
            </button>
          </div>
        ) : (
          <div 
            className="py-0.5 leading-tight" // Adjusted leading for tighter spacing
            // onClick={handleTaskClick} // Moved onClick to parent div for broader click area when not editing
          >
            {/* Project name above task title */}
            <div className="text-xs text-muted-foreground truncate">{task.project}</div>
            <div className="flex items-center gap-1 group/title">
              <div className="font-medium text-xs text-foreground truncate">
                {task.title}
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover/title:opacity-100 transition-opacity">
                <button
                  onClick={handleEditClick}
                  className="p-0.5 hover:bg-accent rounded"
                  aria-label="Edit task"
                >
                  <Edit className="w-3 h-3 text-muted-foreground hover:text-foreground" strokeWidth="2" />
                </button>
                <button
                  onClick={onDeleteClick}
                  className="p-0.5 hover:bg-accent rounded"
                  aria-label="Delete task"
                >
                  <X className="w-3 h-3 text-muted-foreground hover:text-destructive" strokeWidth="2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

TaskRowContent.displayName = "TaskRowContent";

export default TaskRowContent;
