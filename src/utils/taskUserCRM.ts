
import { TaskUser } from '@/types/task';
import { TEAM_USERS } from '@/utils/teamUsers';
import { getUserCustomizations } from '@/utils/userCustomizations';
import { getInitials } from '@/utils/taskUtils';

// New helpers
function isEmail(str: string | undefined | null) {
  return !!str && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(str);
}
function getSafeDisplayName(person: TaskUser | null | undefined) {
  if (!person) return "";
  if (person.fullName && !isEmail(person.fullName)) return person.fullName;
  if (person.name && !isEmail(person.name)) return person.name;
  if (person.fullName && isEmail(person.fullName)) return person.fullName.split("@")[0]; // username from email
  if (person.name && isEmail(person.name)) return person.name.split("@")[0];
  return "";
}
function buildInitials(person: TaskUser | null | undefined) {
  const name =
    getSafeDisplayName(person) ||
    person?.fullName ||
    person?.name ||
    "";
  return getInitials(name);
}

/**
 * Returns the canonical CRM/TEAM_USERS user for consistent display.
 * Fallback to input, using better display/initials if not a match.
 */
export function getCRMUser(person?: TaskUser | null): TaskUser | null {
  if (!person) return null;
  // Try to find by id, name, or fullName (if not email)
  const match = TEAM_USERS.find(
    u =>
      (person.id && u.id === person.id) ||
      (u.name === person.name && !!person.name && !isEmail(person.name)) ||
      (u.fullName === person.fullName && !!person.fullName && !isEmail(person.fullName))
  );
  if (match) {
    const custom = getUserCustomizations(match.id);
    return {
      ...match,
      avatarUrl: match.avatarUrl || person.avatarUrl,
      avatarColor: custom.avatarColor || match.avatarColor,
      initials: match.initials || buildInitials(match),
      fullName: getSafeDisplayName(match),
    };
  }
  if (person.id) {
    const custom = getUserCustomizations(person.id);
    return {
      ...person,
      avatarColor: custom.avatarColor || person.avatarColor || "bg-blue-500",
      initials: person.initials || buildInitials(person),
      fullName: getSafeDisplayName(person),
    };
  }
  // Fallback for always showing something user-friendly
  return {
    ...person,
    initials: buildInitials(person),
    avatarColor: person.avatarColor || "bg-blue-500",
    fullName: getSafeDisplayName(person),
  };
}
