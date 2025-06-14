
import React, { useCallback, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task';
import TaskDetailTitleSection from './TaskDetailTitleSection';
import TaskDetailDescription from './TaskDetailDescription';
import TaskDetailFields from './TaskDetailFields';
import { updateTaskSupabase } from '@/data/taskSupabase';
// NEW: Supabase assignment hook
import { useSupabaseTaskAssignments } from '@/hooks/useSupabaseTaskAssignments';

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
    changeTaskStatus
  } = useTaskContext();

  // Is this a Supabase-backed task? We'll check by presence of taskId (string) and maybe a recent updatedAt.
  const isSupabaseTask = !!originalTask.taskId && !!originalTask.updatedAt;
  // Local state for optimistic updates (required for smooth UI in detail)
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

  // These wrappers ensure we always use string id (task.taskId)
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

  const handleChangeStatus = (newStatus: "redline" | "progress" | "completed") => {
    changeTaskStatus(task.id, newStatus);
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
      // else: legacy update (not really used now)
    } finally {
      setDescLoading(false);
    }
  }, [task.description, task.taskId, isSupabaseTask]);

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
    </div>
  );
};

export default TaskDetailForm;
