
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import TaskGroupHeader from './task-group/TaskGroupHeader';
import TaskTable from './task-group/TaskTable';
import AddTaskButton from './task-group/AddTaskButton';
import QuickAddTask from './QuickAddTask';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task, TaskGroup } from '@/types/task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface TaskGroupSectionProps {
  group: TaskGroup;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive?: (taskId: number) => void;
  onTaskDeleted?: () => void;
}

const TaskGroupSection = React.memo(({ 
  group, 
  showQuickAdd, 
  onSetShowQuickAdd, 
  onQuickAddSave, 
  onTaskClick,
  // onTaskArchive, // Not currently used with D&D context logic
  onTaskDeleted
}: TaskGroupSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
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

  const { setNodeRef, isOver } = useDroppable({
    id: group.status, // Use group status as droppable ID
  });

  const visibleTasks = useMemo(() => 
    group.tasks.filter(task => !task.archived && !task.deletedAt),
    [group.tasks]
  );

  const taskIds = useMemo(() => visibleTasks.map(task => task.id), [visibleTasks]);

  const isShowingQuickAdd = showQuickAdd === group.status;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isShowingQuickAdd && quickAddRef.current && !quickAddRef.current.contains(event.target as Node)) {
        onSetShowQuickAdd(null);
      }
    };
    if (isShowingQuickAdd) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isShowingQuickAdd, onSetShowQuickAdd]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingTaskId && taskTableRef.current && !taskTableRef.current.contains(event.target as Node)) {
        cancelTaskEdit();
      }
    };
    if (editingTaskId) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editingTaskId, cancelTaskEdit]);

  const handleTaskNameClick = useCallback((task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startEditingTask(task);
  }, [startEditingTask]);

  const handleEditClick = useCallback((task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startEditingTask(task);
  }, [startEditingTask]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, taskId: number) => {
    if (e.key === 'Enter') saveTaskEdit(taskId);
    else if (e.key === 'Escape') cancelTaskEdit();
  }, [saveTaskEdit, cancelTaskEdit]);

  const handleRemoveAssignee = useCallback((taskId: number, e: React.MouseEvent) => {
    e.stopPropagation(); removeAssignee(taskId);
  }, [removeAssignee]);

  const handleRemoveCollaborator = useCallback((taskId: number, collaboratorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); removeCollaborator(taskId, collaboratorIndex);
  }, [removeCollaborator]);

  const handleAssignPerson = useCallback((taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    assignPerson(taskId, person);
  }, [assignPerson]);

  const handleAddCollaborator = useCallback((taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    addCollaborator(taskId, person);
  }, [addCollaborator]);

  const handleTaskStatusClick = useCallback((taskId: number) => {
    toggleTaskStatus(taskId);
  }, [toggleTaskStatus]);

  const handleToggleExpanded = useCallback(() => setIsExpanded(prev => !prev), []);
  const handleShowQuickAdd = useCallback(() => onSetShowQuickAdd(group.status), [onSetShowQuickAdd, group.status]);
  const handleHideQuickAdd = useCallback(() => onSetShowQuickAdd(null), [onSetShowQuickAdd]);

  return (
    <div 
      ref={setNodeRef} // Set droppable node ref here
      className={cn(
        "space-y-1 rounded-md", // Reduced space-y
        isOver && "bg-accent/70 ring-2 ring-primary ring-offset-2 ring-offset-background transition-colors duration-200" // Visual feedback for droppable area
      )}
    >
      <TaskGroupHeader
        group={group}
        isExpanded={isExpanded}
        onToggleExpanded={handleToggleExpanded}
      />

      {isExpanded && (
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <TaskTable
            ref={taskTableRef}
            tasks={visibleTasks}
            editingTaskId={editingTaskId}
            editingValue={editingValue}
            onSetEditingValue={setEditingValue}
            onTaskClick={onTaskClick}
            // onTaskNameClick={handleTaskNameClick} // Removed if not used
            onEditClick={handleEditClick}
            onSaveEdit={saveTaskEdit}
            onCancelEdit={cancelTaskEdit}
            onKeyDown={handleKeyDown}
            onTaskStatusClick={handleTaskStatusClick}
            onRemoveAssignee={handleRemoveAssignee}
            onRemoveCollaborator={handleRemoveCollaborator}
            onAssignPerson={handleAssignPerson}
            onAddCollaborator={handleAddCollaborator}
            onTaskDeleted={onTaskDeleted}
          />
        </SortableContext>
      )}
      {isExpanded && (isShowingQuickAdd ? (
        <div ref={quickAddRef} className="pl-8"> {/* Matched pl for alignment */}
          <QuickAddTask
            onSave={onQuickAddSave}
            onCancel={handleHideQuickAdd}
            defaultStatus={group.status}
          />
        </div>
      ) : (
        <AddTaskButton onAddTask={handleShowQuickAdd} />
      ))}
    </div>
  );
});

TaskGroupSection.displayName = "TaskGroupSection";

export default TaskGroupSection;
