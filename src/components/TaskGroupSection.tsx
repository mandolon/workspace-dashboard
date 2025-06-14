
import React, { useState, useRef, useEffect } from 'react';
import TaskGroupHeader from './task-group/TaskGroupHeader';
import TaskTable from './task-group/TaskTable';
import AddTaskButton from './task-group/AddTaskButton';
import QuickAddTask from './QuickAddTask';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task, TaskGroup } from '@/types/task';

interface TaskGroupSectionProps {
  group: TaskGroup;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive?: (taskId: number) => void;
  onTaskDeleted?: () => void;
}

const TaskGroupSection = ({ 
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

  // Handle click outside to cancel quick add
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showQuickAdd === group.status && quickAddRef.current && !quickAddRef.current.contains(event.target as Node)) {
        onSetShowQuickAdd(null);
      }
    };

    if (showQuickAdd === group.status) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showQuickAdd, group.status, onSetShowQuickAdd]);

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

  const handleTaskNameClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startEditingTask(task);
  };

  const handleEditClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startEditingTask(task);
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number) => {
    if (e.key === 'Enter') {
      saveTaskEdit(taskId);
    } else if (e.key === 'Escape') {
      cancelTaskEdit();
    }
  };

  const handleRemoveAssignee = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeAssignee(taskId);
  };

  const handleRemoveCollaborator = (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeCollaborator(taskId, collaboratorIndex);
  };

  const handleAssignPerson = (taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    assignPerson(taskId, person);
  };

  const handleAddCollaborator = (taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    addCollaborator(taskId, person);
  };

  const handleTaskStatusClick = (taskId: number) => {
    toggleTaskStatus(taskId);
  };

  // Filter out archived and deleted tasks from display
  const visibleTasks = group.tasks.filter(task => !task.archived && !task.deletedAt);

  return (
    <div className="space-y-2">
      <TaskGroupHeader
        group={group}
        isExpanded={isExpanded}
        onToggleExpanded={() => setIsExpanded(!isExpanded)}
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
            onTaskNameClick={handleTaskNameClick}
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

          {showQuickAdd === group.status ? (
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
      )}
    </div>
  );
};

export default TaskGroupSection;
