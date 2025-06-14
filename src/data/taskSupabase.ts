
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/task";

// Helper: Converts DB row (snake_case, JSONB) to Task (camelCase)
export function dbRowToTask(row: any): Task {
  return {
    id: row.id,
    taskId: row.task_id,
    title: row.title,
    projectId: row.project_id,
    project: row.project,
    estimatedCompletion: row.estimated_completion,
    dateCreated: row.date_created,
    dueDate: row.due_date,
    assignee: row.assignee,
    hasAttachment: row.has_attachment,
    collaborators: row.collaborators ?? [],
    status: row.status,
    archived: row.archived,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    deletedBy: row.deleted_by,
  };
}

export async function fetchAllTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(dbRowToTask);
}

export async function insertTask(task: Omit<Task, "id" | "taskId" | "createdAt" | "updatedAt">) {
  const toSend = {
    ...task,
    task_id: task.taskId,
    project_id: task.projectId,
    estimated_completion: task.estimatedCompletion,
    date_created: task.dateCreated,
    due_date: task.dueDate,
    has_attachment: task.hasAttachment,
    created_by: task.createdBy,
    collaborators: JSON.stringify(task.collaborators ?? []),
    // Remove camelCase properties not needed
    taskId: undefined, projectId: undefined, estimatedCompletion: undefined, dateCreated: undefined, dueDate: undefined, hasAttachment: undefined, createdBy: undefined,
  };
  const { data, error } = await supabase
    .from("tasks")
    .insert([toSend])
    .select("*")
    .single();
  if (error) throw error;
  return dbRowToTask(data);
}

export async function updateTaskSupabase(taskId: string, updates: Partial<Task>) {
  const toSend: any = {};
  Object.entries(updates).forEach(([k, v]) => {
    if (k === "taskId") toSend["task_id"] = v;
    else if (k === "projectId") toSend["project_id"] = v;
    else if (k === "estimatedCompletion") toSend["estimated_completion"] = v;
    else if (k === "dateCreated") toSend["date_created"] = v;
    else if (k === "dueDate") toSend["due_date"] = v;
    else if (k === "hasAttachment") toSend["has_attachment"] = v;
    else if (k === "createdBy") toSend["created_by"] = v;
    else if (k === "collaborators") toSend["collaborators"] = JSON.stringify(v);
    else toSend[k] = v;
  });
  const { data, error } = await supabase
    .from("tasks")
    .update(toSend)
    .eq("task_id", taskId)
    .select("*")
    .single();
  if (error) throw error;
  return dbRowToTask(data);
}

export async function deleteTaskSupabase(taskId: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", taskId);
  if (error) throw error;
}
