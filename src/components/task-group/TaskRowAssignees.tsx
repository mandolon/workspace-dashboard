import React, { useMemo, useCallback } from 'react';
import { UserPlus, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getRandomColor, availablePeople, getInitials } from '@/utils/taskUtils';
import { Task } from '@/types/task';
// Import useCRMRole if available, but don't require it
import { useCRMRole } from '@/pages/TeamsPage';

interface TaskRowAssigneesProps {
  task: Task;
  onRemoveAssignee: (taskId: number, e: React.MouseEvent) => void;
  onRemoveCollaborator: (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => void;
  onAssignPerson: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  onAddCollaborator: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
}

const TaskRowAssignees = React.memo(({
  task,
  onRemoveAssignee,
  onRemoveCollaborator,
  onAssignPerson,
  onAddCollaborator
}: TaskRowAssigneesProps) => {
  const assigneeColor = useMemo(() =>
    task.assignee ? getRandomColor(task.assignee.fullName ?? task.assignee.name) : '',
    [task.assignee]
  );
  const collaboratorColors = useMemo(() =>
    task.collaborators?.map(collab => getRandomColor(collab.name)) || [],
    [task.collaborators]
  );
  const availableForAssignment = useMemo(() => availablePeople, []);
  const availableForCollaboration = useMemo(() =>
    availablePeople.filter(person =>
      person.name !== task.assignee?.name &&
      !task.collaborators?.some(collab => collab.name === person.name)
    ),
    [task.assignee, task.collaborators]
  );

  const handleRemoveAssignee = useCallback((e: React.MouseEvent) => {
    onRemoveAssignee(task.id, e);
  }, [onRemoveAssignee, task.id]);
  const handleRemoveCollaborator = useCallback((index: number) => (e: React.MouseEvent) => {
    onRemoveCollaborator(task.id, index, e);
  }, [onRemoveCollaborator, task.id]);
  const handleAssignPerson = useCallback((person: { name: string; avatar: string; fullName?: string }) => {
    onAssignPerson(task.id, person);
  }, [onAssignPerson, task.id]);
  const handleAddCollaborator = useCallback((person: { name: string; avatar: string; fullName?: string }) => {
    onAddCollaborator(task.id, person);
  }, [onAddCollaborator, task.id]);
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Allow assignment everywhere unless explicitly locked by CRM logic
  let currentCRMRole: string | undefined;
  try {
    currentCRMRole = useCRMRole();
  } catch {
    currentCRMRole = undefined;
  }
  // If CRMRole context is missing, default to true (show assign UI)
  const canAssign = currentCRMRole === undefined || currentCRMRole === 'team' || currentCRMRole === 'admin';

  return (
    <div className="flex items-center -space-x-1">
      {task.assignee ? (
        <div className="relative group/avatar">
          {/* Remove font-semibold */}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center border-[2.2px] border-background select-none text-white text-xs tracking-tight ${assigneeColor}`}>
            <span>{getInitials(task.assignee.fullName ?? task.assignee.name)}</span>
          </div>
          {/* Remove Assignee (X) - top left, small */}
          {canAssign && (
            <button
              onClick={handleRemoveAssignee}
              className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity hover:bg-red-600 shadow"
              style={{ fontSize: '0.6rem', padding: 0 }}
              aria-label="Remove assignee"
              tabIndex={-1}
            >
              <X className="w-2 h-2" strokeWidth="2" />
            </button>
          )}
        </div>
      ) : (
        canAssign && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={stopPropagation}
                className="w-7 h-7 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center hover:border-foreground hover:bg-accent transition-colors bg-transparent"
                aria-label="Assign to"
                type="button"
              >
                <UserPlus className="w-3 h-3 text-white dark:text-white" strokeWidth="2" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-popover">
              {availableForAssignment.map((person) => (
                <DropdownMenuItem
                  key={person.name}
                  onClick={() => handleAssignPerson(person)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold select-none ${getRandomColor(person.fullName ?? person.name)}`}>
                    {getInitials(person.fullName ?? person.name)}
                  </div>
                  <span>{person.fullName ?? person.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      )}

      {task.collaborators?.map((collaborator, index) => (
        <div key={index} className="relative group/collaborator">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center border-[2.2px] border-background select-none text-white text-xs tracking-tight ${collaboratorColors[index]}`}>
            <span>{getInitials(collaborator.fullName ?? collaborator.name)}</span>
          </div>
          {canAssign && (
            <button
              onClick={handleRemoveCollaborator(index)}
              className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/collaborator:opacity-100 transition-opacity hover:bg-red-600 shadow"
              style={{ fontSize: '0.6rem', padding: 0 }}
              aria-label="Remove collaborator"
              tabIndex={-1}
            >
              <X className="w-2 h-2" strokeWidth="2" />
            </button>
          )}
        </div>
      ))}

      {canAssign && task.assignee && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={stopPropagation}
              className="w-7 h-7 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center hover:border-foreground hover:bg-accent transition-colors ml-1"
            >
              <UserPlus className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-popover">
            {availableForCollaboration.map((person) => (
              <DropdownMenuItem
                key={person.name}
                onClick={() => handleAddCollaborator(person)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold select-none ${getRandomColor(person.fullName ?? person.name)}`}>
                  {getInitials(person.fullName ?? person.name)}
                </div>
                <span>{person.fullName ?? person.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
});

TaskRowAssignees.displayName = "TaskRowAssignees";

export default TaskRowAssignees;
