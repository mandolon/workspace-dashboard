
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Plus, X } from 'lucide-react';
import { TEAM_USERS } from '@/utils/teamUsers';
import { getCRMUser } from '@/utils/taskUserCRM';
import { getInitials } from '@/utils/taskUtils';
import { getAvatarColor } from '@/utils/avatarColors';

interface TaskDetailAssigneesProps {
  task: any;
  assignPerson: (taskId: number | string, person: any) => void;
  addCollaborator: (taskId: number | string, person: any) => void;
  removeAssignee: (taskId: number | string) => void;
  removeCollaborator: (taskId: number | string, collaboratorIndex: number) => void;
}

const VIRTUAL_TEAM_ASSIGNEE = {
  name: "Team",
  avatar: "bg-black",
  avatarColor: "bg-black"
};

const TaskDetailAssignees: React.FC<TaskDetailAssigneesProps> = ({
  task,
  assignPerson,
  addCollaborator,
  removeAssignee,
  removeCollaborator
}) => {
  // Canonical users
  const assignee = getCRMUser(task.assignee);
  const collaborators = (task.collaborators || []).map(getCRMUser);

  // Names of all assigned: assignee + collaborators
  const assignedNames = [
    ...(assignee ? [assignee.name] : []),
    ...collaborators.map(p => p.name)
  ];

  // Only show users with crmRole Team, and not already assigned
  const availablePeople = TEAM_USERS
    .filter(u => u.crmRole === 'Team')
    .filter(u => !assignedNames.includes(u.name));

  // Add Team as a special assignee
  const showAssignTeam = !assignedNames.includes("Team");

  return (
    <div className="flex items-center space-x-1 min-h-[32px]">
      {/* Display all assigned (assignee then collaborators) */}
      {assignee && (
        <div className="relative group" key={"main-assignee"}>
          <div
            className={`${getAvatarColor(assignee)} w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background`}
            title={assignee.name}
          >
            {assignee.name === "Team"
              ? <span className="font-bold">T</span>
              : getInitials(assignee.name)
            }
          </div>
          <button
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-border p-0 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            style={{lineHeight: 1}}
            onClick={e => { e.stopPropagation(); removeAssignee(task.id); }}
            title="Remove assignee"
            tabIndex={-1}
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {collaborators.map((collaborator: any, idx: number) => (
        <div className="relative group" key={collaborator?.name || idx}>
          <div
            className={`${getAvatarColor(collaborator)} w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background`}
            title={collaborator.name}
          >
            {getInitials(collaborator.name)}
          </div>
          <button
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-border p-0 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            style={{lineHeight: 1}}
            onClick={e => { e.stopPropagation(); removeCollaborator(task.id, idx); }}
            title="Remove collaborator"
            tabIndex={-1}
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      {/* Add person ("+") dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Add person"
            className="ml-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground hover:border-foreground transition text-muted-foreground hover:text-foreground bg-white dark:bg-background"
            tabIndex={0}
          >
            <Plus className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 w-40 bg-popover z-50 border border-border rounded shadow-xl">
          <div className="text-xs font-semibold pb-1 px-2 text-foreground">Add person</div>
          <div className="flex flex-col">
            {showAssignTeam && (
              <DropdownMenuItem
                onClick={() => assignPerson(task.id, VIRTUAL_TEAM_ASSIGNEE)}
                className="flex items-center gap-2 py-1 px-2 rounded cursor-pointer font-semibold"
                data-testid="assign-team"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold bg-black border-2 border-background">T</div>
                <span>Team</span>
              </DropdownMenuItem>
            )}
            {availablePeople.map(person => (
              <DropdownMenuItem
                key={person.name}
                onClick={() => (assignee
                  ? addCollaborator(task.id, person)
                  : assignPerson(task.id, person))}
                className="flex items-center gap-2 py-1 px-2 rounded cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(person)} border-2 border-background`}>
                  {getInitials(person.name)}
                </div>
                <span>{person.name}</span>
              </DropdownMenuItem>
            ))}
            {(!showAssignTeam && availablePeople.length === 0) && (
              <div className="text-xs text-muted-foreground px-2 py-1">Everyone assigned</div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskDetailAssignees;
