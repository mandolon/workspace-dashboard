
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskGroupSection from '../TaskGroupSection';

interface TaskBoardContentProps {
  taskGroups: any[];
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: any) => void;
  onTaskArchive: (taskId: number) => void;
}

const TaskBoardContent = ({
  taskGroups,
  showQuickAdd,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive
}: TaskBoardContentProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {taskGroups.map((group, groupIndex) => (
          <TaskGroupSection
            key={groupIndex}
            group={group}
            showQuickAdd={showQuickAdd}
            onSetShowQuickAdd={onSetShowQuickAdd}
            onQuickAddSave={onQuickAddSave}
            onTaskClick={onTaskClick}
            onTaskArchive={onTaskArchive}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TaskBoardContent;
