import React, { useMemo, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useUser } from '@/contexts/UserContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task'; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getRandomColor, availablePeople, getInitials } from '@/utils/taskUtils';
import { X, UserPlus } from 'lucide-react';

interface TaskDetailFormProps {
  task: Task;
}

const TaskDetailForm = ({ task }: TaskDetailFormProps) => {
  const { currentUser } = useUser();
  const {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit,
    assignPerson,
    removeAssignee,
  } = useTaskContext();

  // Check if this task is currently being edited
  const isEditing = editingTaskId === task.id;

  const formatCreatedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const getCreatedByName = (createdBy: string) => {
    if (createdBy === "AL" || createdBy === currentUser.name) {
      return currentUser.name;
    }
    return createdBy;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTaskEdit(task.id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelTaskEdit();
    }
  };

  const handleBlur = () => {
    saveTaskEdit(task.id);
  };

  // Assignee UI logic
  const availableForAssignment = useMemo(() => {
    return availablePeople;
  }, []);

  const handleAssign = useCallback((person: { name: string; avatar: string; fullName?: string }) => {
    assignPerson(task.id, person);
  }, [assignPerson, task.id]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    removeAssignee(task.id);
  }, [removeAssignee, task.id]);

  return (
    <div className="space-y-3">
      {/* Task Title with Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 max-w-[calc(100%-130px)] mr-4">
          {isEditing ? (
            <input
              type="text"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="text-2xl font-semibold opacity-60 bg-transparent border-none outline-none focus:ring-0 px-1 py-0.5 -mx-1 -my-0.5 rounded transition-colors truncate w-full"
              autoFocus
            />
          ) : (
            <h1 
              className="text-2xl font-semibold cursor-pointer hover:bg-accent/50 rounded px-1 py-0.5 -mx-1 -my-0.5 transition-colors truncate"
              onClick={() => startEditingTask(task)}
              title="Click to edit title"
            >
              {task.title}
            </h1>
          )}
        </div>
        <div className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2">
          REDLINE / TO DO
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Description</label>
        <Textarea 
          placeholder="Add description..."
          className="min-h-[80px] text-xs"
        />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Created by
          </label>
          <div className="text-xs">
            {getCreatedByName(task.createdBy)}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Date Created
          </label>
          <div className="text-xs">
            {formatCreatedDate(task.createdAt)}
          </div>
        </div>

        {/* ------- ASSIGNEE UI ------ */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Assigned to
          </label>
          <div className="text-xs">
            {/* If assigned, show avatar and remove button, else show dropdown */}
            {task.assignee ? (
              <div className="flex items-center gap-1 relative min-h-[24px]">
                <div className="relative group/avatar w-6 h-6">
                  {/* AVATAR CIRCLE WITH INITIALS */}
                  <div
                    className={`w-6 h-6 rounded-full border-[2.2px] border-background flex items-center justify-center select-none ${getRandomColor(task.assignee.name)} text-white font-medium text-xs`}
                  >
                    {getInitials(task.assignee.name)}
                  </div>
                  {/* Small red X in the top-left */}
                  <button
                    className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity hover:bg-red-600 shadow"
                    onClick={handleRemove}
                    title="Remove assignee"
                    type="button"
                    aria-label="Remove assignee"
                    tabIndex={-1}
                  >
                    <X className="w-2 h-2" strokeWidth="2" />
                  </button>
                </div>
                {/* No name next to avatar */}
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-6 h-6 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center hover:border-foreground hover:bg-accent transition-colors"
                    type="button"
                  >
                    <UserPlus className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-popover">
                  {availableForAssignment.map((person) => (
                    <DropdownMenuItem
                      key={person.name}
                      onClick={() => handleAssign(person)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium select-none ${getRandomColor(person.name)}`}>
                        {person.name}
                      </div>
                      <span>{person.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Marked Complete
          </label>
          <div className="text-xs text-muted-foreground">
            —
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailForm;
