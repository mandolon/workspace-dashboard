
import React, { useMemo, useCallback } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { X, Users } from 'lucide-react';
import { TEAM_USERS } from "@/utils/teamUsers";
import { getCRMUser } from '@/utils/taskUserCRM';
import { getInitials } from '@/utils/taskUtils';
import { getAvatarColor } from '@/utils/avatarColors';
import { format } from 'date-fns';

interface TaskDetailFieldsProps {
  task: any;
  currentUser: any;
  assignPerson: (taskId: number | string, person: any) => void;
  removeAssignee: (taskId: number | string) => void;
}

// Define a virtual "Team" assignee
const VIRTUAL_TEAM_ASSIGNEE = {
  name: "Team",
  fullName: "Team",
  avatar: "bg-black",
  avatarColor: "bg-black"
};

const TaskDetailFields: React.FC<TaskDetailFieldsProps> = ({
  task, currentUser, assignPerson, removeAssignee
}) => {
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

  // Assignee UI logic
  const teamAssignees = useMemo(() => {
    return TEAM_USERS.filter(member => member.crmRole === 'Team');
  }, []);

  const handleAssign = useCallback((person: { name: string; avatar: string; fullName?: string }) => {
    assignPerson(task.id, person);
  }, [assignPerson, task.id]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    removeAssignee(task.id);
  }, [removeAssignee, task.id]);

  // Enforce CRM/TEAM_USERS colors/info for assignee
  const canonicalAssignee = getCRMUser(task.assignee);

  // Display support for "Team" assignment
  const isTeamAssignee = canonicalAssignee && (canonicalAssignee.name === "Team" || canonicalAssignee.fullName === "Team");

  return (
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
          {canonicalAssignee ? (
            <div className="flex items-center gap-1 relative min-h-[28px]">
              <div className="relative group/avatar">
                {/* Use Task Table avatar style for Team */}
                {isTeamAssignee ? (
                  <div
                    className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-white font-bold text-xs bg-black select-none"
                    title="Assigned to Team"
                  >
                    T
                  </div>
                ) : (
                  <div
                    className={`w-7 h-7 rounded-full border-2 border-background flex items-center justify-center select-none ${getAvatarColor(canonicalAssignee)} text-white font-medium text-xs`}
                    title={canonicalAssignee.fullName ?? canonicalAssignee.name}
                  >
                    {getInitials(canonicalAssignee.fullName ?? canonicalAssignee.name)}
                  </div>
                )}
                <button
                  className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity hover:bg-red-600 shadow"
                  onClick={handleRemove}
                  title="Remove assignee"
                  type="button"
                  aria-label="Remove assignee"
                  tabIndex={-1}
                  style={{ fontSize: 10 }}
                >
                  <X className="w-3 h-3" strokeWidth="2" />
                </button>
              </div>
              <span className={`ml-2 ${isTeamAssignee ? 'font-semibold text-black' : ''}`}>
                {isTeamAssignee ? "Team" : (canonicalAssignee.fullName || canonicalAssignee.name)}
              </span>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-accent p-0 focus:outline-none transition-colors"
                  type="button"
                  aria-label="Assign user"
                >
                  <Users className="w-4 h-4 text-muted-foreground" strokeWidth="2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-popover z-50">
                {/* Add "Assign to Team" at the top, visually matching elsewhere */}
                <DropdownMenuItem
                  onClick={() => handleAssign(VIRTUAL_TEAM_ASSIGNEE)}
                  className="flex items-center gap-2 cursor-pointer font-semibold"
                  data-testid="assign-team"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold bg-black border-2 border-background">T</div>
                  <span>Assign to Team</span>
                </DropdownMenuItem>
                <div className="border-b border-muted my-1" />
                {teamAssignees.map((person) => (
                  <DropdownMenuItem
                    key={person.name}
                    onClick={() => handleAssign(person)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(person)} border-2 border-background`}>
                      {getInitials(person.fullName ?? person.name)}
                    </div>
                    <span>{person.fullName ?? person.name}</span>
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
  );
};

export default TaskDetailFields;

