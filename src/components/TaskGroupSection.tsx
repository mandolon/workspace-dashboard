import React, { useState, useRef, useEffect } from 'react';
import TaskGroupHeader from './task-group/TaskGroupHeader';
import TaskTable from './task-group/TaskTable';
import AddTaskButton from './task-group/AddTaskButton';
import QuickAddTask from './QuickAddTask';
import { useTaskManagement } from '@/hooks/useTaskManagement.tsx';

interface Task {
  id: number;
  title: string;
  project: string;
  estimatedCompletion: string;
  dateCreated: string;
  dueDate: string;
  assignee: { name: string; avatar: string; fullName?: string } | null;
  hasAttachment: boolean;
  collaborators?: Array<{ name: string; avatar: string; fullName?: string }>;
  status: string;
  archived?: boolean;
}

interface TaskGroup {
  title: string;
  count: number;
  color: string;
  status: string;
  tasks: Task[];
}

interface TaskGroupSectionProps {
  group: TaskGroup;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive?: (taskId: number) => void;
}

const TaskGroupSection = ({ 
  group, 
  showQuickAdd, 
  onSetShowQuickAdd, 
  onQuickAddSave, 
  onTaskClick,
  onTaskArchive
}: TaskGroupSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const quickAddRef = useRef<HTMLDivElement>(null);

  const {
    tasks,
    editingTaskId,
    editingValue,
    setEditingValue,
    handleTaskNameClick,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleKeyDown,
    handleRemoveAssignee,
    handleRemoveCollaborator,
    handleAssignPerson,
    handleAddCollaborator,
    handleTaskStatusClick
  } = useTaskManagement(group.tasks, onTaskArchive);

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

  // Filter out archived tasks from display
  const visibleTasks = tasks.filter(task => !task.archived);

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
            tasks={visibleTasks}
            editingTaskId={editingTaskId}
            editingValue={editingValue}
            onSetEditingValue={setEditingValue}
            onTaskClick={onTaskClick}
            onTaskNameClick={handleTaskNameClick}
            onEditClick={handleEditClick}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onKeyDown={handleKeyDown}
            onTaskStatusClick={handleTaskStatusClick}
            onRemoveAssignee={handleRemoveAssignee}
            onRemoveCollaborator={handleRemoveCollaborator}
            onAssignPerson={handleAssignPerson}
            onAddCollaborator={handleAddCollaborator}
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
