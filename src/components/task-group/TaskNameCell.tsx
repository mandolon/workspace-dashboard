
import React from 'react';
import { Input } from '@/components/ui/input';
import { Check, X, Edit, Trash2 } from 'lucide-react';

interface TaskNameCellProps {
  editing: boolean;
  value: string;
  onSetValue: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  title: string;
  project: string;
  onClick: () => void;
}

const TaskNameCell: React.FC<TaskNameCellProps> = ({
  editing,
  value,
  onSetValue,
  onKeyDown,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  title,
  project,
  onClick
}) => (
  <div 
    className="flex items-center gap-2 cursor-pointer pl-4" 
    onClick={onClick}
  >
    {/* Status icon removed from here. Should be passed as a child if needed. */}
    <div className="flex-1">
      {editing ? (
        <div className="flex items-center gap-1">
          <Input
            value={value}
            onChange={e => onSetValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="text-xs h-6 px-1 py-0 border border-border"
            autoFocus
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={onSave}
            className="p-0.5 text-green-600 hover:text-green-700"
          >
            <Check className="w-3 h-3" strokeWidth="2" />
          </button>
          <button
            onClick={onCancel}
            className="p-0.5 text-red-600 hover:text-red-700"
          >
            <X className="w-3 h-3" strokeWidth="2" />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-1 group/title">
            <div className="font-medium text-xs">
              {title}
            </div>
            <div className="flex items-center gap-0.5 opacity-0 group-hover/title:opacity-100">
              <button
                onClick={onEdit}
                className="p-0.5 hover:bg-accent rounded transition-opacity"
              >
                <Edit className="w-3 h-3 text-muted-foreground hover:text-foreground" strokeWidth="2" />
              </button>
              <button
                onClick={onDelete}
                className="p-0.5 hover:bg-accent rounded transition-opacity"
              >
                <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" strokeWidth="2" />
              </button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{project}</div>
        </div>
      )}
    </div>
  </div>
);

export default TaskNameCell;
