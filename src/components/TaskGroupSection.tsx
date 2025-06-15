
import React, { useState, useMemo } from 'react';
import TaskTableSection from './task-group/TaskTableSection';
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
  toggleTaskStatus?: (taskId: number) => void; // Add optional toggle handler
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
  toggleTaskStatus, // Add toggle handler
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
      <TaskTableSection
        group={group}
        showQuickAdd={showQuickAdd}
        onSetShowQuickAdd={onSetShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
        onTaskClick={onTaskClick}
        onTaskDeleted={onTaskDeleted}
        useContext={useContext}
        editingTaskId={editingTaskId}
        editingValue={editingValue}
        setEditingValue={setEditingValue}
        startEditingTask={startEditingTask}
        saveTaskEdit={saveTaskEdit}
        cancelTaskEdit={cancelTaskEdit}
        toggleTaskStatus={toggleTaskStatus} // Pass toggle handler
        assignPerson={assignPerson}
        removeAssignee={removeAssignee}
        addCollaborator={addCollaborator}
        removeCollaborator={removeCollaborator}
      />
    </div>
  );
};

export default TaskGroupSection;
