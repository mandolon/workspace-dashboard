
import { Task } from '@/types/task';
import { getProjectDisplayName } from './projectClientData';

// Counter for generating unique TaskIDs
let nextTaskIdNumber = 5; // Starting from 5 since we have 4 existing tasks

// Helper function to generate TaskID
const generateTaskId = (): string => {
  const taskId = `T${nextTaskIdNumber.toString().padStart(4, '0')}`;
  nextTaskIdNumber++;
  return taskId;
};

// Helper function to get next TaskID without incrementing (for preview)
export const getNextTaskId = (): string => {
  return `T${nextTaskIdNumber.toString().padStart(4, '0')}`;
};

// Centralized task data with proper project ID associations, TaskIDs, and audit fields
export const allTasks: Task[] = [
  {
    id: 1,
    taskId: "T0001",
    title: "Planning set finalized, set up CD's",
    projectId: "piner-piner-haus-garage",
    project: "", // Will be populated by helper function
    estimatedCompletion: "—",
    dateCreated: "8/10/22",
    dueDate: "—",
    assignee: { name: "MH", avatar: "bg-purple-500" },
    hasAttachment: true,
    status: "redline",
    createdBy: "AL",
    createdAt: "2022-08-10T10:00:00Z",
    updatedAt: "2022-08-10T10:00:00Z"
  },
  {
    id: 2,
    taskId: "T0002",
    title: "Update - 12.27.23",
    projectId: "rathbun-usfs-cabin",
    project: "",
    estimatedCompletion: "—",
    dateCreated: "12/27/23",
    dueDate: "—",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: true,
    collaborators: [{ name: "MP", avatar: "bg-green-500" }],
    status: "progress",
    createdBy: "AL",
    createdAt: "2023-12-27T10:00:00Z",
    updatedAt: "2023-12-27T10:00:00Z"
  },
  {
    id: 3,
    taskId: "T0003",
    title: "Update 12.9.23",
    projectId: "ogden-thew-2709-t-street",
    project: "",
    estimatedCompletion: "—",
    dateCreated: "12/9/23",
    dueDate: "—",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: true,
    status: "progress",
    createdBy: "AL",
    createdAt: "2023-12-09T10:00:00Z",
    updatedAt: "2023-12-09T10:00:00Z"
  },
  {
    id: 4,
    taskId: "T0004",
    title: "Alternate Cabin Design",
    projectId: "ogden-thew-2709-t-street",
    project: "",
    estimatedCompletion: "—",
    dateCreated: "9/13/23",
    dueDate: "9/22/23, 5...",
    assignee: { name: "AL", avatar: "bg-gray-600" },
    hasAttachment: false,
    status: "progress",
    createdBy: "AL",
    createdAt: "2023-09-13T10:00:00Z",
    updatedAt: "2023-09-13T10:00:00Z"
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

// Helper function to get task by ID (numeric)
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

// Helper function to get task by TaskID (T0001 format)
export const getTaskByTaskId = (taskId: string): Task | undefined => {
  const task = allTasks.find(task => task.taskId === taskId);
  if (task) {
    return {
      ...task,
      project: getProjectDisplayName(task.projectId)
    };
  }
  return undefined;
};

// Helper function to add a new task
export const addTask = (taskData: Omit<Task, 'id' | 'taskId' | 'createdBy' | 'createdAt' | 'updatedAt'>): Task => {
  const now = new Date().toISOString();
  const newTask: Task = {
    ...taskData,
    id: Date.now(), // Simple ID generation
    taskId: generateTaskId(), // Generate unique TaskID
    project: getProjectDisplayName(taskData.projectId),
    createdBy: "AL", // Default to current user - will be updated when user context is available
    createdAt: now,
    updatedAt: now
  };
  allTasks.push(newTask);
  return newTask;
};

// Helper function to update a task
export const updateTask = (id: number, updates: Partial<Task>): Task | null => {
  const taskIndex = allTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    allTasks[taskIndex] = { 
      ...allTasks[taskIndex], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    // Refresh project name if projectId changed
    if (updates.projectId) {
      allTasks[taskIndex].project = getProjectDisplayName(updates.projectId);
    }
    return allTasks[taskIndex];
  }
  return null;
};

// Helper function to soft delete a task
export const softDeleteTask = (id: number, deletedBy: string): Task | null => {
  const taskIndex = allTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    allTasks[taskIndex] = {
      ...allTasks[taskIndex],
      deletedAt: new Date().toISOString(),
      deletedBy: deletedBy,
      updatedAt: new Date().toISOString()
    };
    return allTasks[taskIndex];
  }
  return null;
};

// Helper function to restore a deleted task
export const restoreTask = (id: number): Task | null => {
  const taskIndex = allTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    const { deletedAt, deletedBy, ...taskWithoutDeletedFields } = allTasks[taskIndex];
    allTasks[taskIndex] = {
      ...taskWithoutDeletedFields,
      updatedAt: new Date().toISOString()
    };
    return allTasks[taskIndex];
  }
  return null;
};
