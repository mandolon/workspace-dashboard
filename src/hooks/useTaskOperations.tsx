import { useCallback } from "react";
import { Task } from "@/types/task";
import { getTasksByStatus } from "@/data/taskData";
import { useTaskToasts } from "./useTaskToasts";
import { filterByStatus } from "@/utils/taskFilters";

export const useTaskOperations = (
  customTasks: Task[],
  updateTaskById: (taskId: number, updates: Partial<Task>) => void,
  archiveTask: (taskId: number) => void
) => {
  const { showTaskCompletedToast } = useTaskToasts();

  const toggleTaskStatus = useCallback((taskId: number) => {
    // Combination of centralized and custom tasks
    const allCentralTasks = [
      ...getTasksByStatus("redline"),
      ...getTasksByStatus("progress"),
      ...getTasksByStatus("completed")
    ];
    const centralizedTask = allCentralTasks.find((t) => t.id === taskId);
    const customTask = customTasks.find((t) => t.id === taskId);
    const task = centralizedTask || customTask;

    if (task && task.status !== "completed") {
      const previousStatus = task.status;

      updateTaskById(taskId, { status: "completed", archived: true });
      archiveTask(taskId);

      showTaskCompletedToast(task.title, () => {
        updateTaskById(taskId, { status: previousStatus, archived: false });
      });

      console.log(`Completed and archived task ${taskId}`);
    } else if (task && task.status === "completed") {
      updateTaskById(taskId, { status: "progress", archived: false });
      console.log(`Unarchived task ${taskId}`);
    }
  }, [customTasks, updateTaskById, archiveTask, showTaskCompletedToast]);

  return {
    toggleTaskStatus
  };
};
