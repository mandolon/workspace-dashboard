
import React, { useRef, useEffect } from "react";
import TaskTable from "./TaskTable";
import AddTaskButton from "./AddTaskButton";
import QuickAddTask from "@/components/QuickAddTask";
import { useTaskSorting } from "@/hooks/useTaskSorting";
import { Task, TaskGroup } from "@/types/task";
import { useTaskContext } from "@/contexts/TaskContext";

interface TaskTableSectionProps {
  group: TaskGroup;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (value: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskDeleted?: () => void;
}

const TaskTableSection = ({
  group,
  showQuickAdd,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskDeleted
}: TaskTableSectionProps) => {
  const quickAddRef = useRef<HTMLDivElement>(null);
  const taskTableRef = useRef<HTMLDivElement>(null);

  const {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit,
    toggleTaskStatus,
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator
  } = useTaskContext();

  const {
    visibleTasks,
    sortBy,
    sortDirection,
    handleDateCreatedFilterClick,
    handleAssignedToFilterClick
  } = useTaskSorting(group.tasks);

  const isShowingQuickAdd = showQuickAdd === group.status;

  // Handle click outside to cancel quick add
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isShowingQuickAdd && quickAddRef.current && !quickAddRef.current.contains(event.target as Node)) {
        onSetShowQuickAdd(null);
      }
    };

    if (isShowingQuickAdd) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowingQuickAdd, onSetShowQuickAdd]);

  // Handle click outside to cancel editing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingTaskId && taskTableRef.current && !taskTableRef.current.contains(event.target as Node)) {
        cancelTaskEdit();
      }
    };

    if (editingTaskId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingTaskId, cancelTaskEdit]);

  return (
    <>
      <TaskTable
        ref={taskTableRef}
        tasks={visibleTasks}
        editingTaskId={editingTaskId}
        editingValue={editingValue}
        onSetEditingValue={setEditingValue}
        onTaskClick={onTaskClick}
        onTaskNameClick={(task, e) => { e.stopPropagation(); startEditingTask(task); }}
        onEditClick={(task, e) => { e.stopPropagation(); startEditingTask(task); }}
        onSaveEdit={saveTaskEdit}
        onCancelEdit={cancelTaskEdit}
        onKeyDown={(e, tid) => {
          if (e.key === "Enter") saveTaskEdit(tid);
          else if (e.key === "Escape") cancelTaskEdit();
        }}
        onTaskStatusClick={toggleTaskStatus}
        onRemoveAssignee={(tid, e) => { e.stopPropagation(); removeAssignee(tid); }}
        onRemoveCollaborator={(tid, idx, e) => { e.stopPropagation(); removeCollaborator(tid, idx); }}
        onAssignPerson={assignPerson}
        onAddCollaborator={addCollaborator}
        onTaskDeleted={onTaskDeleted}
        currentSortBy={sortBy}
        currentSortDirection={sortDirection}
        onDateCreatedFilterClick={handleDateCreatedFilterClick}
        onAssignedToFilterClick={handleAssignedToFilterClick}
      />

      {isShowingQuickAdd ? (
        <div ref={quickAddRef}>
          <QuickAddTask
            onSave={onQuickAddSave}
            onCancel={() => onSetShowQuickAdd(null)}
            defaultStatus={group.status}
          />
        </div>
      ) : (
        <AddTaskButton onAddTask={() => onSetShowQuickAdd(group.status)} />
      )}
    </>
  );
};

export default TaskTableSection;
