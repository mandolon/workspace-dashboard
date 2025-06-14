
import React from 'react';
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";
import { getRandomColor, getInitials } from '@/utils/taskUtils';
import { X } from 'lucide-react';

interface TaskRowAssigneesProps {
  task: any;
  onRemoveAssignee: (taskId: number, e: React.MouseEvent) => void;
  onRemoveCollaborator: (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => void;
  onAssignPerson: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  onAddCollaborator: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
}

const TaskRowAssignees = ({
  task,
  onRemoveAssignee,
  onRemoveCollaborator,
  onAssignPerson,
  onAddCollaborator,
}: TaskRowAssigneesProps) => {
  // Helper to pick color: use avatarColor if present, else generate
  const getColor = (person: any) => person.avatarColor || getRandomColor(person.name);

  return (
    <div className="flex items-center -space-x-1">
      {/* ASSIGNEE */}
      {task.assignee && (
        <div className="relative group">
          <div
            className={`${getColor(task.assignee)} w-7 h-7 rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white border-2 border-background flex items-center justify-center`}
          >
            {getInitials(task.assignee.fullName ?? task.assignee.name)}
          </div>
          {/* Remove Assignee Button (X) - shows on hover */}
          <button
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-border p-0 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            style={{lineHeight: 1}}
            onClick={e => { e.stopPropagation(); onRemoveAssignee(task.id, e); }}
            title="Remove assignee"
            tabIndex={-1}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {/* COLLABORATORS */}
      {task.collaborators?.map((collaborator: any, idx: number) => (
        <div className="relative group" key={idx}>
          <div
            className={`${getColor(collaborator)} w-7 h-7 rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white border-2 border-background flex items-center justify-center`}
          >
            {getInitials(collaborator.fullName ?? collaborator.name)}
          </div>
          {/* Remove Collaborator Button (X) - shows on hover */}
          <button
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-border p-0 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            style={{lineHeight: 1}}
            onClick={e => { e.stopPropagation(); onRemoveCollaborator(task.id, idx, e); }}
            title="Remove collaborator"
            tabIndex={-1}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskRowAssignees;
