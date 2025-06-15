
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { getCRMRole, isAdmin as isAdminHelper } from "@/utils/userRoleHelpers";

export function isAdmin(user: User) {
  return isAdminHelper(user);
}

export function isUserMatch(a: any, b: User | null) {
  if (!a || !b) return false;
  // Match by id, name, fullName, or email
  return (
    (!!a.id && a.id === b.id) ||
    (!!a.name && a.name === b.name) ||
    (!!a.fullName && a.fullName === b.name) ||
    (!!a.email && a.email === b.email)
  );
}

/**
 * Determines if user can view a task.
 */
export function canUserViewTask(task: Task, user: User | null): { allowed: boolean; reason: string } {
  if (!user) return { allowed: false, reason: 'No user' };
  if (isAdmin(user)) return { allowed: true, reason: 'Admin' };

  if (task.assignee && isUserMatch(task.assignee, user)) {
    return { allowed: true, reason: 'Assignee' };
  }
  if (task.collaborators && task.collaborators.some(c => isUserMatch(c, user))) {
    return { allowed: true, reason: 'Collaborator' };
  }
  if (task.createdBy && (task.createdBy === user.name || task.createdBy === user.email)) {
    return { allowed: true, reason: 'Creator' };
  }
  return { allowed: false, reason: 'Not assigned, not collaborator, not creator' };
}

/**
 * Returns tasks user is allowed to see (not archived or soft-deleted).
 */
export function filterTasksForUser(tasks: Task[], user: User | null) {
  if (!user) return [];
  if (isAdmin(user)) return tasks.filter(t => !t.deletedAt && !t.archived);
  return tasks.filter(
    t => !t.deletedAt && !t.archived && canUserViewTask(t, user).allowed
  );
}
