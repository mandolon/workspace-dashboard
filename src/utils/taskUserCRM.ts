
import { TaskUser } from '@/types/task';
import { TEAM_USERS } from '@/utils/teamUsers';

/**
 * Returns the canonical CRM/TEAM_USERS user for consistent display
 * If a matching user is not found, falls back to the passed input
 */
export function getCRMUser(person?: TaskUser | null): TaskUser | null {
  if (!person) return null;
  const match = TEAM_USERS.find(
    u => u.name === person.name || u.fullName === person.fullName
  );
  if (match) {
    // Use CRM/TEAM_USERS properties but preserve fields like avatar if present (legacy fallback)
    return {
      ...match,
      avatar: match.avatar || person.avatar,
    };
  }
  return person;
}
