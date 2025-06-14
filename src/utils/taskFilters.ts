
import { Task } from "@/types/task";

export function filterByStatus(tasks: Task[], status: string): Task[] {
  return tasks.filter(task => task.status === status && !task.archived);
}
