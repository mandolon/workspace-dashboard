
import React from 'react';
import { Edit, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TaskStatusIcon from '../TaskStatusIcon';
import { Task } from '@/types/task';

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
}

const TaskRowContent = ({
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
  onDeleteClick
}: TaskRowContentProps) => {
  return (
    <div 
      className="flex items-center gap-2 cursor-pointer pl-4" 
      onClick={() => onTaskClick(task)}
    >
      <TaskStatusIcon 
        status={task.status} 
        onClick={() => onTaskStatusClick(task.id)}
      />
      <div className="flex-1">
        {editingTaskId === task.id ? (
          <div className="flex items-center gap-1">
            <Input
              value={editingValue}
              onChange={(e) => onSetEditingValue(e.target.value)}
              onKeyDown={(e) => onKeyDown(e, task.id)}
              className="text-xs h-6 px-1 py-0 border border-border"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveEdit(task.id);
              }}
              className="p-0.5 text-green-600 hover:text-green-700"
            >
              <Check className="w-3 h-3" strokeWidth="2" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancelEdit();
              }}
              className="p-0.5 text-red-600 hover:text-red-700"
            >
              <X className="w-3 h-3" strokeWidth="2" />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1 group/title">
              <div className="font-medium text-xs">
                {task.title}
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover/title:opacity-100">
                <button
                  onClick={(e) => onEditClick(task, e)}
                  className="p-0.5 hover:bg-accent rounded transition-opacity"
                >
                  <Edit className="w-3 h-3 text-muted-foreground hover:text-foreground" strokeWidth="2" />
                </button>
                <button
                  onClick={onDeleteClick}
                  className="p-0.5 hover:bg-accent rounded transition-opacity"
                >
                  <X className="w-3 h-3 text-muted-foreground hover:text-destructive" strokeWidth="2" />
                </button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{task.project}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskRowContent;
