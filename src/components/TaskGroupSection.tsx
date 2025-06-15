
import React, { useState, useMemo } from 'react';
import TaskGroup from './TaskGroup';
import { Task, TaskGroup as TaskGroupType, TaskUser } from '@/types/task';
import { useTaskEditing } from '@/hooks/useTaskEditing';

interface TaskGroupSectionProps {
  group: TaskGroupType;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive: (taskId: number) => void;
  onTaskDeleted: () => void;
  useContext: boolean;
  assignPerson: (taskId: string, person: TaskUser) => void;
  removeAssignee: (taskId: string) => void;
  addCollaborator: (taskId: string, person: TaskUser) => void;
  removeCollaborator: (taskId: string, idx: number) => void;
}

const TaskGroupSection = ({
  group,
  showQuickAdd,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive,
  onTaskDeleted,
  useContext,
  assignPerson,
  removeAssignee,
  addCollaborator,
  removeCollaborator,
}: TaskGroupSectionProps) => {
  // Mock update function for the editing hook - since we're using Supabase now
  const mockUpdateTaskById = (taskId: number, updates: Partial<Task>) => {
    console.log('[TaskGroupSection] Mock update task:', taskId, updates);
    // The actual update will be handled by the Supabase realtime system
  };

  // Add task editing functionality
  const {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit
  } = useTaskEditing(mockUpdateTaskById);

  console.log('[TaskGroupSection] Editing state:', { editingTaskId, editingValue });

  return (
    <div className="space-y-4">
      <TaskGroup
        group={group}
        showQuickAdd={showQuickAdd}
        onSetShowQuickAdd={onSetShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
        onTaskClick={onTaskClick}
        onTaskArchive={onTaskArchive}
        onTaskDeleted={onTaskDeleted}
        useContext={useContext}
        assignPerson={assignPerson}
        removeAssignee={removeAssignee}
        addCollaborator={addCollaborator}
        removeCollaborator={removeCollaborator}
        // Pass editing state and handlers to TaskGroup
        editingTaskId={editingTaskId}
        editingValue={editingValue}
        setEditingValue={setEditingValue}
        startEditingTask={startEditingTask}
        saveTaskEdit={saveTaskEdit}
        cancelTaskEdit={cancelTaskEdit}
      />
    </div>
  );
};

export default TaskGroupSection;
