
import React from 'react';
import TaskBoardHeader from './TaskBoardHeader';
import TaskBoardFilters from './TaskBoardFilters';
import TaskGroupSection from './TaskGroupSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Task, TaskGroup } from '@/types/task';

interface TaskBoardContentProps {
  taskGroups: TaskGroup[];
  showQuickAdd: string | null;
  refreshTrigger: number;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive: (taskId: number) => void;
  onTaskDeleted: (task: any) => void; // Accepts a Task now
  onAddTask: () => void;
  // Handlers for assignment (Supabase only)
  assignPerson: (taskId: string, person: any) => void;
  removeAssignee: (taskId: string) => void;
  addCollaborator: (taskId: string, person: any) => void;
  removeCollaborator: (taskId: string, idx: number) => void;
}

const TaskBoardContent = ({
  taskGroups,
  showQuickAdd,
  refreshTrigger,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive,
  onTaskDeleted,
  onAddTask,
  assignPerson,
  removeAssignee,
  addCollaborator,
  removeCollaborator,
}: any) => {
  const renderedGroups = React.useMemo(
    () =>
      taskGroups.map((group) => (
        <TaskGroupSection
          key={group.status} // Use stable group.status instead of groupIndex-refreshTrigger
          group={group}
          showQuickAdd={showQuickAdd}
          onSetShowQuickAdd={onSetShowQuickAdd}
          onQuickAddSave={onQuickAddSave}
          onTaskClick={onTaskClick}
          onTaskArchive={onTaskArchive}
          onTaskDeleted={onTaskDeleted}
          useContext={false}
          assignPerson={assignPerson}
          removeAssignee={removeAssignee}
          addCollaborator={addCollaborator}
          removeCollaborator={removeCollaborator}
        />
      )),
    [
      taskGroups,
      showQuickAdd,
      refreshTrigger,
      onSetShowQuickAdd,
      onQuickAddSave,
      onTaskClick,
      onTaskArchive,
      onTaskDeleted,
      assignPerson,
      removeAssignee,
      addCollaborator,
      removeCollaborator
    ]
  );

  return (
    <div className="flex-1 bg-background pl-2">
      <div className="h-full flex flex-col">
        <TaskBoardHeader />
        <TaskBoardFilters onAddTask={onAddTask} />
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">{renderedGroups}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TaskBoardContent;

