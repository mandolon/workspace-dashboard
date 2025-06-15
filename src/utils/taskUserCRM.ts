
import { TaskUser } from '@/types/task';
import { TEAM_USERS } from '@/utils/teamUsers';
import { getUserCustomizations } from '@/utils/userCustomizations';
import { getInitials } from '@/utils/taskUtils';

/**
 * Returns the canonical CRM/TEAM_USERS user for consistent display, with avatarColor from customizations (localStorage) if present.
 * If a matching user is not found, falls back to the passed input
 */
export function getCRMUser(person?: TaskUser | null): TaskUser | null {
  if (!person) return null;
  const match = TEAM_USERS.find(
    u => u.name === person.name || u.fullName === person.fullName
  );
  if (match) {
    const custom = getUserCustomizations(match.id);
    return {
      ...match,
      avatarUrl: match.avatarUrl || person.avatarUrl,
      avatarColor: custom.avatarColor || match.avatarColor,
      initials: match.initials || person.initials || getInitials(match.fullName || match.name || ""),
    };
  }
  if (person.id) {
    const custom = getUserCustomizations(person.id);
    return {
      ...person,
      avatarColor: custom.avatarColor || person.avatarColor,
      initials: person.initials || getInitials(person.fullName || person.name || ""),
    };
  }
  // fallback build initials if missing
  return {
    ...person,
    initials: person.initials || getInitials(person.fullName || person.name || ""),
  };
}
