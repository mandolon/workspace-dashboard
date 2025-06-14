
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskBoardContent from './TaskBoardContent';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task, TaskGroup } from '@/types/task';

interface DragDropTaskBoardProps {
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

const DragDropTaskBoard = ({
  taskGroups,
  showQuickAdd,
  refreshTrigger,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive,
  onTaskDeleted,
  onAddTask
}: DragDropTaskBoardProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { updateTaskById } = useTaskContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = taskGroups
      .flatMap(group => group.tasks)
      .find(task => task.id === active.id);
    
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as number;
    const newStatus = over.id as string;

    if (activeTask && activeTask.status !== newStatus) {
      updateTaskById(taskId, { status: newStatus });
    }

    setActiveTask(null);
  };

  // Get all task IDs for sortable context
  const allTaskIds = taskGroups.flatMap(group => 
    group.tasks.map(task => task.id)
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={allTaskIds} strategy={verticalListSortingStrategy}>
        <TaskBoardContent
          taskGroups={taskGroups}
          showQuickAdd={showQuickAdd}
          refreshTrigger={refreshTrigger}
          onSetShowQuickAdd={onSetShowQuickAdd}
          onQuickAddSave={onQuickAddSave}
          onTaskClick={onTaskClick}
          onTaskArchive={onTaskArchive}
          onTaskDeleted={onTaskDeleted}
          onAddTask={onAddTask}
        />
      </SortableContext>
      
      <DragOverlay>
        {activeTask ? (
          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
            <div className="text-xs text-muted-foreground">{activeTask.project}</div>
            <div className="font-medium text-sm">{activeTask.title}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragDropTaskBoard;
