
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import TaskGroupHeader from './task-group/TaskGroupHeader';
import TaskTable from './task-group/TaskTable';
import AddTaskButton from './task-group/AddTaskButton';
import QuickAddTask from './QuickAddTask';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task, TaskGroup } from '@/types/task';

// Helper to sort by assignee name (nulls at end)
function compareAssignee(a: Task, b: Task, direction: 'asc' | 'desc') {
  const nameA = a.assignee?.name?.toLowerCase?.() ?? '';
  const nameB = b.assignee?.name?.toLowerCase?.() ?? '';
  if (!nameA && !nameB) return 0;
  if (!nameA) return 1;
  if (!nameB) return -1;
  return direction === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
}

// Helper to sort by simple date format MM/DD/YY (or ISO, fallback)
function compareDateCreated(a: Task, b: Task, direction: 'asc' | 'desc') {
  // Try to parse as MM/DD/YY (default US)
  const parse = (date: string) => {
    if (!date) return new Date(0);
    const parts = date.split('/');
    if (parts.length === 3) {
      // mm/dd/yy or mm/dd/yyyy
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      return new Date(year, month, day);
    } else {
      // Fallback to ISO
      return new Date(date);
    }
  };
  const dA = parse(a.dateCreated);
  const dB = parse(b.dateCreated);
  return direction === 'asc' ? dA.getTime() - dB.getTime() : dB.getTime() - dA.getTime();
}

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
  onTaskArchive,
  onTaskDeleted
}: TaskGroupSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const quickAddRef = useRef<HTMLDivElement>(null);
  const taskTableRef = useRef<HTMLDivElement>(null);
  // --- Sorting state
  const [sortBy, setSortBy] = useState<null | 'dateCreated' | 'assignee'>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default DESC

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

  // Create sorting callbacks
  const handleDateCreatedFilterClick = useCallback(() => {
    if (sortBy === 'dateCreated') {
      setSortDirection(direction => (direction === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy('dateCreated');
      setSortDirection('desc');
    }
  }, [sortBy]);

  const handleAssignedToFilterClick = useCallback(() => {
    if (sortBy === 'assignee') {
      setSortDirection(direction => (direction === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy('assignee');
      setSortDirection('asc');
    }
  }, [sortBy]);

  // Memoize filtered & sorted tasks
  const visibleTasks = useMemo(() => {
    let filtered = group.tasks.filter(task => !task.archived && !task.deletedAt);
    if (sortBy === 'dateCreated') {
      filtered = [...filtered].sort((a, b) => compareDateCreated(a, b, sortDirection));
    } else if (sortBy === 'assignee') {
      filtered = [...filtered].sort((a, b) => compareAssignee(a, b, sortDirection));
    }
    return filtered;
  }, [group.tasks, sortBy, sortDirection]);

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

  // Handle click outside to cancel task editing
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

  const handleTaskNameClick = useCallback((task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startEditingTask(task);
  }, [startEditingTask]);

  const handleEditClick = useCallback((task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startEditingTask(task);
  }, [startEditingTask]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, taskId: number) => {
    if (e.key === 'Enter') {
      saveTaskEdit(taskId);
    } else if (e.key === 'Escape') {
      cancelTaskEdit();
    }
  }, [saveTaskEdit, cancelTaskEdit]);

  const handleRemoveAssignee = useCallback((taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeAssignee(taskId);
  }, [removeAssignee]);

  const handleRemoveCollaborator = useCallback((taskId: number, collaboratorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeCollaborator(taskId, collaboratorIndex);
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

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleShowQuickAdd = useCallback(() => {
    onSetShowQuickAdd(group.status);
  }, [onSetShowQuickAdd, group.status]);

  const handleHideQuickAdd = useCallback(() => {
    onSetShowQuickAdd(null);
  }, [onSetShowQuickAdd]);

  return (
    <div className="space-y-1.5">
      <TaskGroupHeader
        group={group}
        isExpanded={isExpanded}
        onToggleExpanded={useCallback(() => setIsExpanded(prev => !prev), [])}
      />

      {isExpanded && (
        <>
          <TaskTable
            ref={taskTableRef}
            tasks={visibleTasks}
            editingTaskId={editingTaskId}
            editingValue={editingValue}
            onSetEditingValue={setEditingValue}
            onTaskClick={onTaskClick}
            onTaskNameClick={useCallback((task, e) => {e.stopPropagation(); startEditingTask(task);}, [startEditingTask])}
            onEditClick={useCallback((task, e) => {e.stopPropagation(); startEditingTask(task);}, [startEditingTask])}
            onSaveEdit={saveTaskEdit}
            onCancelEdit={cancelTaskEdit}
            onKeyDown={useCallback((e, tid) => {
              if (e.key === 'Enter') saveTaskEdit(tid);
              else if (e.key === 'Escape') cancelTaskEdit();
            }, [saveTaskEdit, cancelTaskEdit])}
            onTaskStatusClick={toggleTaskStatus}
            onRemoveAssignee={useCallback((tid, e) => {e.stopPropagation(); removeAssignee(tid); }, [removeAssignee])}
            onRemoveCollaborator={useCallback((tid, idx, e) => {e.stopPropagation(); removeCollaborator(tid, idx); }, [removeCollaborator])}
            onAssignPerson={assignPerson}
            onAddCollaborator={addCollaborator}
            onTaskDeleted={onTaskDeleted}
            // Pass sort controls
            currentSortBy={sortBy}
            currentSortDirection={sortDirection}
            onDateCreatedFilterClick={handleDateCreatedFilterClick}
            onAssignedToFilterClick={handleAssignedToFilterClick}
          />

          {isShowingQuickAdd ? (
            <div ref={quickAddRef}>
              <QuickAddTask
                onSave={onQuickAddSave}
                onCancel={useCallback(() => onSetShowQuickAdd(null), [onSetShowQuickAdd])}
                defaultStatus={group.status}
              />
            </div>
          ) : (
            <AddTaskButton onAddTask={useCallback(() => onSetShowQuickAdd(group.status), [onSetShowQuickAdd, group.status])} />
          )}
        </>
      )}
    </div>
  );
});

TaskGroupSection.displayName = "TaskGroupSection";
export default TaskGroupSection;
