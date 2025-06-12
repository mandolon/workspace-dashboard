
export interface Task {
  id: number;
  title: string;
  projectId: string;
  project: string; // Display name for backward compatibility
  estimatedCompletion: string;
  dateCreated: string;
  dueDate: string;
  assignee: { name: string; avatar: string; fullName?: string } | null;
  hasAttachment: boolean;
  collaborators?: Array<{ name: string; avatar: string; fullName?: string }>;
  status: string;
  archived?: boolean;
}

export interface TaskGroup {
  title: string;
  count: number;
  color: string;
  status: string;
  tasks: Task[];
}
