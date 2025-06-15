export interface TaskUser {
  id?: string;
  name: string;
  fullName?: string;
  avatarUrl?: string;
  avatarColor?: string; // fallback to default in UI
  initials: string;
}

export interface Task {
  id: number;
  taskId: string; // Human-readable task ID like T0001, T0002, etc.
  title: string;
  projectId: string;
  project: string; // Display name for backward compatibility
  estimatedCompletion: string;
  dateCreated: string;
  dueDate: string;
  assignee: TaskUser | null;
  hasAttachment: boolean;
  collaborators?: TaskUser[];
  status: string;
  archived?: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  deletedBy?: string;
  description?: string; // <-- added field
}

export interface TaskGroup {
  title: string;
  count: number;
  color: string;
  status: string;
  tasks: Task[];
}
