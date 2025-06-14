
import React, { useMemo, useCallback } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { X, Users } from 'lucide-react';
import { TEAM_USERS } from "@/utils/teamUsers";
import { getCRMUser } from '@/utils/taskUserCRM';
import { getInitials } from '@/utils/taskUtils';
import { getAvatarColor } from '@/utils/avatarColors';
import { format } from 'date-fns';
import TaskDetailAssignees from './TaskDetailAssignees';

interface TaskDetailFieldsProps {
  task: any;
  currentUser: any;
  assignPerson: (taskId: number | string, person: any) => void;
  removeAssignee: (taskId: number | string) => void;
  addCollaborator?: (taskId: number | string, person: any) => void;
  removeCollaborator?: (taskId: number | string, collaboratorIndex: number) => void;
}

// Define a virtual "Team" assignee
const VIRTUAL_TEAM_ASSIGNEE = {
  name: "Team",
  fullName: "Team",
  avatar: "bg-black",
  avatarColor: "bg-black"
};

const TaskDetailFields: React.FC<TaskDetailFieldsProps> = ({
  task, currentUser, assignPerson, removeAssignee, addCollaborator, removeCollaborator
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
      {/* ------ ASSIGNEE & COLLABORATORS (now supports multiple assignees) ------ */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">
          Assigned to
        </label>
        <div className="text-xs">
          <TaskDetailAssignees
            task={task}
            assignPerson={assignPerson}
            addCollaborator={addCollaborator!}
            removeAssignee={removeAssignee}
            removeCollaborator={removeCollaborator!}
          />
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

