import React from 'react';
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";
import { getRandomColor, getInitials } from '@/utils/taskUtils';

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
  return (
    <div className="flex items-center -space-x-1">
      {task.assignee && (
        <div
          className={`${getRandomColor(task.assignee.name, task.assignee.avatarColor)} w-7 h-7 rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white border-2 border-background`}
        >
          {getInitials(task.assignee.fullName ?? task.assignee.name)}
        </div>
      )}
      {task.collaborators?.map((collaborator: any, idx: number) => (
        <div
          key={idx}
          className={`${getRandomColor(collaborator.name, collaborator.avatarColor)} w-7 h-7 rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white border-2 border-background`}
        >
          {getInitials(collaborator.fullName ?? collaborator.name)}
        </div>
      ))}
    </div>
  );
};

export default TaskRowAssignees;
