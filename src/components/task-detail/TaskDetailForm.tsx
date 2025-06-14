
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
    changeTaskStatus: legacyChangeTaskStatus
    // deleteTask, // removed legacyDeleteTask from here
  } = useTaskContext();

  const isSupabaseTask = !!originalTask.taskId && !!originalTask.updatedAt;
  const [task, setTask] = useState<Task>(originalTask);

  // Use correct assignment handlers
  const supabaseAssignments = useSupabaseTaskAssignments(task, setTask);

  const isEditing = editingTaskId === task.id;
  const [desc, setDesc] = useState(task.description ?? "");
  const [descLoading, setDescLoading] = useState(false);

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

  return (
    <div className="space-y-3 relative">
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
      {/* Attachments and Trash sections are outside this form */}
    </div>
  );
};

export default TaskDetailForm;

