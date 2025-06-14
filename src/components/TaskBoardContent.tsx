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
  onTaskDeleted: () => void;
  onAddTask: () => void;
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
  onAddTask
}: any) => {
  // Memoize the mapped TaskGroupSections for improved performance
  const renderedGroups = React.useMemo(
    () => taskGroups.map((group, groupIndex) => (
      <TaskGroupSection
        key={`${groupIndex}-${refreshTrigger}`}
        group={group}
        showQuickAdd={showQuickAdd}
        onSetShowQuickAdd={onSetShowQuickAdd}
        onQuickAddSave={onQuickAddSave}
        onTaskClick={onTaskClick}
        onTaskArchive={onTaskArchive}
        onTaskDeleted={onTaskDeleted}
        useContext={false} // Supabase-powered board disables context mode
      />
    )),
    [taskGroups, showQuickAdd, refreshTrigger, onSetShowQuickAdd, onQuickAddSave, onTaskClick, onTaskArchive, onTaskDeleted]
  );

  return (
    <div className="flex-1 bg-background pl-2">
      <div className="h-full flex flex-col">
        <TaskBoardHeader />
        <TaskBoardFilters onAddTask={onAddTask} />

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {renderedGroups}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TaskBoardContent;
