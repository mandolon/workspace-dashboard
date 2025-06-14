
import React from 'react';
import { TEAM_USERS } from "@/utils/teamUsers";
import { getInitials } from "@/utils/taskUtils";
import { getAvatarColor } from "@/utils/avatarColors";
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";
import { Task } from "@/types/task";

/**
 * Maps createdBy string (name/email) to a TEAM_USERS object (if possible)
 * @param createdBy Name or email from Task.createdBy
 */
function findTeamUserByCreatedBy(createdBy: string): { fullName?: string; name?: string; avatar?: string; avatarColor?: string } | null {
  if (!createdBy) return null;

  // Try to match fullName or email (case-insensitive)
  const match = TEAM_USERS.find(
    user =>
      user.fullName?.toLowerCase() === createdBy.toLowerCase() ||
      user.name?.toLowerCase() === createdBy.toLowerCase() ||
      user.email?.toLowerCase() === createdBy.toLowerCase()
  );
  return match || null;
}

interface TaskRowCreatedByProps {
  createdBy: string;
}

const TaskRowCreatedBy: React.FC<TaskRowCreatedByProps> = ({ createdBy }) => {
  const userObj = findTeamUserByCreatedBy(createdBy);
  // Fallback: use whatever string is available
  const displayName = userObj?.fullName || userObj?.name || createdBy || "Unknown";

  // Always prefer color from palette, else fallback to gray
  const avatarBg = getAvatarColor(userObj || { name: createdBy }) || 'bg-gray-400';

  // Show initials: prefer user's name/fullName for initials, else from the string
  const initials = userObj ? getInitials(userObj.fullName || userObj.name || "") : getInitials(createdBy);

  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className={`w-7 h-7 rounded-full ${avatarBg} text-white ${AVATAR_INITIALS_CLASSNAMES}`}>
        {initials}
      </div>
      <span className="truncate max-w-[85px] text-xs text-muted-foreground">{displayName}</span>
    </div>
  );
};

export default TaskRowCreatedBy;
