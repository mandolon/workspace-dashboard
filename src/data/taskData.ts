
import { Task } from '@/types/task';
import { getProjectDisplayName } from './projectClientData';

// Centralized task data with proper project ID associations
export const allTasks: Task[] = [
  {
    id: 1,
    title: "Planning set finalized, set up CD's",
    projectId: "piner-piner-haus-garage",
    project: "", // Will be populated by helper function
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
    projectId: "rathbun-usfs-cabin",
    project: "",
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
    project: "",
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
    projectId: "rathbun-usfs-cabin",
    project: "",
    estimatedCompletion: "—",
    dateCreated: "9/13/23",
    dueDate: "9/22/23, 5...",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: false,
    status: "progress"
  }
];

// Helper function to get tasks with populated project display names
export const getTasksWithProjectNames = (): Task[] => {
  return allTasks.map(task => ({
    ...task,
    project: getProjectDisplayName(task.projectId)
  }));
};

// Helper function to get tasks by status
export const getTasksByStatus = (status: string): Task[] => {
  return getTasksWithProjectNames().filter(task => task.status === status && !task.archived);
};

// Helper function to get tasks by project ID
export const getTasksByProjectId = (projectId: string): Task[] => {
  return getTasksWithProjectNames().filter(task => task.projectId === projectId && !task.archived);
};

// Helper function to get task by ID
export const getTaskById = (id: number): Task | undefined => {
  const task = allTasks.find(task => task.id === id);
  if (task) {
    return {
      ...task,
      project: getProjectDisplayName(task.projectId)
    };
  }
  return undefined;
};

// Helper function to add a new task
export const addTask = (taskData: Omit<Task, 'id'>): Task => {
  const newTask: Task = {
    ...taskData,
    id: Date.now(), // Simple ID generation
    project: getProjectDisplayName(taskData.projectId)
  };
  allTasks.push(newTask);
  return newTask;
};

// Helper function to update a task
export const updateTask = (id: number, updates: Partial<Task>): Task | null => {
  const taskIndex = allTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    allTasks[taskIndex] = { ...allTasks[taskIndex], ...updates };
    // Refresh project name if projectId changed
    if (updates.projectId) {
      allTasks[taskIndex].project = getProjectDisplayName(updates.projectId);
    }
    return allTasks[taskIndex];
  }
  return null;
};
