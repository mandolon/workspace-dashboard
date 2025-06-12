import React from 'react';
import { Plus, Edit, Check, X } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import TaskStatusIcon from '../TaskStatusIcon';
import TaskRowAssignees from './TaskRowAssignees';
import { formatDate } from '@/utils/taskUtils';
import { Task } from '@/types/task';

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
  onAddCollaborator
}: TaskRowProps) => {
  return (
    <TableRow key={task.id} className="hover:bg-accent/50 group">
      <TableCell className="py-2 w-[50%]">
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
                  <button
                    onClick={(e) => onEditClick(task, e)}
                    className="opacity-0 group-hover/title:opacity-100 p-0.5 hover:bg-accent rounded transition-opacity"
                  >
                    <Edit className="w-3 h-3 text-muted-foreground hover:text-foreground" strokeWidth="2" />
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">{task.project}</div>
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="py-2 w-[8%]">
        <div className="flex items-center gap-1">
          {task.hasAttachment && (
            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
          <button 
            className="p-0.5 hover:bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle file attachment
            }}
          >
            <Plus className="w-2 h-2" strokeWidth="2" />
          </button>
        </div>
      </TableCell>
      <TableCell className="text-xs text-muted-foreground py-2 w-[17%]">
        {formatDate(task.dateCreated)}
      </TableCell>
      <TableCell className="py-2 w-[25%]">
        <TaskRowAssignees
          task={task}
          onRemoveAssignee={onRemoveAssignee}
          onRemoveCollaborator={onRemoveCollaborator}
          onAssignPerson={onAssignPerson}
          onAddCollaborator={onAddCollaborator}
        />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
