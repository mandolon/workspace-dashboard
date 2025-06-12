
export interface Task {
  id: number;
  title: string;
  projectId: string; // Links to projectClientData
  estimatedCompletion: string;
  dateCreated: string;
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
    fullName?: string;
  } | null;
  hasAttachment: boolean;
  collaborators?: Array<{
    name: string;
    avatar: string;
    fullName?: string;
  }>;
  status: string;
  archived?: boolean;
}

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Planning set finalized, set up CD's",
    projectId: "piner-piner-haus-garage",
    estimatedCompletion: "—",
    dateCreated: "8/10/22",
    dueDate: "—",
    assignee: { name: "MH", avatar: "bg-purple-500" },
    hasAttachment: true,
    status: "redline"
  },
  {
    id: 2,
    title: "Update - 12.27.23",
    projectId: "adams-1063-40th-street",
    estimatedCompletion: "—",
    dateCreated: "12/27/23",
    dueDate: "—",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: true,
    collaborators: [{ name: "MP", avatar: "bg-green-500" }],
    status: "progress"
  },
  {
    id: 3,
    title: "Update 12.9.23",
    projectId: "ogden-thew-2709-t-street",
    estimatedCompletion: "—",
    dateCreated: "12/9/23",
    dueDate: "—",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: true,
    status: "progress"
  },
  {
    id: 4,
    title: "Alternate Cabin Design",
    projectId: "henderson-1524-tiverton",
    estimatedCompletion: "—",
    dateCreated: "9/13/23",
    dueDate: "9/22/23, 5...",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: false,
    status: "progress"
  }
];

export const getTaskById = (id: number): Task | null => {
  return defaultTasks.find(task => task.id === id) || null;
};

export const getTasksByProjectId = (projectId: string): Task[] => {
  return defaultTasks.filter(task => task.projectId === projectId);
};
