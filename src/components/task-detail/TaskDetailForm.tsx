
import React, { useCallback, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task';
import TaskDetailTitleSection from './TaskDetailTitleSection';
import TaskDetailDescription from './TaskDetailDescription';
import TaskDetailFields from './TaskDetailFields';
import { updateTaskSupabase } from '@/data/taskSupabase';
import { useSupabaseTaskAssignments } from '@/hooks/useSupabaseTaskAssignments';
import { toast } from "@/hooks/use-toast";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import { Button } from "@/components/ui/button";

interface TaskDetailFormProps {
  task: Task;
}

const TaskDetailForm = ({ task: originalTask }: TaskDetailFormProps) => {
  const { currentUser } = useUser();
  const {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit,
    assignPerson: legacyAssignPerson,
    removeAssignee: legacyRemoveAssignee,
    addCollaborator: legacyAddCollaborator,
    removeCollaborator: legacyRemoveCollaborator,
    changeTaskStatus: legacyChangeTaskStatus,
    deleteTask: legacyDeleteTask // legacy delete for local tasks
  } = useTaskContext();

  const isSupabaseTask = !!originalTask.taskId && !!originalTask.updatedAt;
  const [task, setTask] = useState<Task>(originalTask);

  // Use correct assignment handlers
  const supabaseAssignments = useSupabaseTaskAssignments(task, setTask);

  const isEditing = editingTaskId === task.id;
  const [desc, setDesc] = useState(task.description ?? "");
  const [descLoading, setDescLoading] = useState(false);

  // Delete dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handler selection
  const handlerSet = isSupabaseTask ? supabaseAssignments : {
    assignPerson: legacyAssignPerson,
    removeAssignee: legacyRemoveAssignee,
    addCollaborator: legacyAddCollaborator,
    removeCollaborator: legacyRemoveCollaborator,
  };

  const handleAssignPerson = (taskId: string, person: { name: string; avatar: string; fullName?: string }) => {
    handlerSet.assignPerson(taskId, person);
  };

  const handleRemoveAssignee = (taskId: string) => {
    handlerSet.removeAssignee(taskId);
  };

  const handleAddCollaborator = (taskId: string, person: { name: string; avatar: string; fullName?: string }) => {
    if (handlerSet.addCollaborator) handlerSet.addCollaborator(taskId, person);
  };

  const handleRemoveCollaborator = (taskId: string, idx: number) => {
    if (handlerSet.removeCollaborator) handlerSet.removeCollaborator(taskId, idx);
  };

  const handleChangeStatus = async (newStatus: "redline" | "progress" | "completed") => {
    if (!task) return;
    if (isSupabaseTask) {
      const oldStatus = task.status;
      const wasArchived = !!task.archived;
      const willArchive = newStatus === "completed";
      const updates: Partial<Task> = {
        status: newStatus,
        archived: willArchive
      };
      setTask(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
      try {
        const updated = await updateTaskSupabase(task.taskId, updates);
        setTask(updated);
        toast({
          title: "Status Updated",
          description: `Task moved to "${newStatus === "redline"
            ? "Redline / To Do"
            : newStatus === "progress"
              ? "In Progress"
              : "Completed"
            }".`
        });
      } catch (e) {
        setTask(prev => ({
          ...prev,
          status: oldStatus,
          archived: wasArchived,
        }));
        toast({
          title: "Error updating status",
          description: (e as any)?.message || "Failed to update task status.",
        });
      }
    } else {
      legacyChangeTaskStatus(task.id, newStatus);
    }
  };

  // Save handler for description field
  const handleSaveDescription = useCallback(async (newDesc: string) => {
    if (newDesc === task.description) return;
    setDescLoading(true);
    setDesc(newDesc);
    try {
      if (isSupabaseTask) {
        await updateTaskSupabase(task.taskId, { description: newDesc });
        setTask(t => ({ ...t, description: newDesc, updatedAt: new Date().toISOString() }));
      }
    } finally {
      setDescLoading(false);
    }
  }, [task.description, task.taskId, isSupabaseTask]);

  // Move to trash / soft delete handler
  const handleTrashClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (isSupabaseTask) {
        // Soft-delete: set deleted_at to now
        const deletedTask = await updateTaskSupabase(task.taskId, {
          deletedAt: new Date().toISOString(),
        });
        setTask(deletedTask);
        toast({
          title: "Task Trashed",
          description: "Task moved to trash.",
          duration: 3000
        });
        setShowDeleteDialog(false);
        // You might want to navigate away after deleting! (optional)
      } else {
        await legacyDeleteTask(task.id);
        toast({
          title: "Task Trashed",
          description: "Task moved to trash.",
          duration: 3000
        });
        setShowDeleteDialog(false);
      }
    } catch (err) {
      toast({
        title: "Delete Failed",
        description: (err as any)?.message || "Could not move task to trash.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => setShowDeleteDialog(false);

  return (
    <div className="space-y-3">
      <TaskDetailTitleSection
        isEditing={isEditing}
        editingValue={editingValue}
        setEditingValue={setEditingValue}
        startEditingTask={startEditingTask}
        saveTaskEdit={saveTaskEdit}
        cancelTaskEdit={cancelTaskEdit}
        task={task}
        onChangeStatus={handleChangeStatus}
      />
      <TaskDetailDescription
        value={desc}
        onSave={handleSaveDescription}
        disabled={descLoading}
      />
      <TaskDetailFields
        task={task}
        currentUser={currentUser}
        assignPerson={handleAssignPerson}
        removeAssignee={handleRemoveAssignee}
        addCollaborator={handleAddCollaborator}
        removeCollaborator={handleRemoveCollaborator}
      />
      {/* Move to Trash Button */}
      <div className="flex justify-end pt-4">
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={handleTrashClick}
          disabled={isDeleting}
        >
          {/* Using Lucide trash icon by import and JSX */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6v12a2 2 0 002 2h2a2 2 0 002-2V6m-9 0a2 2 0 012-2h2a2 2 0 012 2m7 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6" />
          </svg>
          Move to Trash
        </Button>
      </div>
      <DeleteTaskDialog
        isOpen={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        taskTitle={task.title}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TaskDetailForm;
