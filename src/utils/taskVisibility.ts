
import { Task } from "@/types/task";
import { User } from "@/types/user";

export function isAdmin(user: User) {
  return (
    user.name === "Armando Lopez" ||
    user.name === "AL" ||
    user.email === "armando@company.com"
  );
}

/**
 * Only show tasks assigned to, created by, or collaborated with the user,
 * unless the user is an admin.
 */
export function filterTasksForUser(tasks: Task[], user: User | null) {
  if (!user) return [];
  if (isAdmin(user)) return tasks;

  const myNames = [user.name, (user as any).fullName].filter(Boolean);
  return tasks.filter(
    t =>
      // Match on assignee's name or fullName
      (t.assignee && (
        myNames.includes(t.assignee?.fullName) ||
        myNames.includes(t.assignee?.name)
      )) ||
      // Or if a collaborator matches
      (t.collaborators && t.collaborators.some(
        c => myNames.includes(c.fullName) || myNames.includes(c.name)
      )) ||
      // Or createdBy matches
      myNames.includes(t.createdBy) ||
      t.createdBy === user.email // fallback just in case
  );
}
