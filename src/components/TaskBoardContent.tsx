
import React from 'react';
import TaskBoardHeader from './TaskBoardHeader';
import TaskBoardFilters from './TaskBoardFilters';
import TaskGroupSection from './TaskGroupSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Task, TaskGroup as TaskGroupType } from '@/types/task'; // Renamed to avoid conflict
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import TaskRowContent from './task-group/TaskRowContent'; // For DragOverlay

interface TaskBoardContentProps {
  taskGroups: TaskGroupType[];
  showQuickAdd: string | null;
  refreshTrigger: number; // Keep for potential re-renders not related to DND
  activeDragTask: Task | null; // For DragOverlay
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
  onTaskArchive: (taskId: number) => void;
  onTaskDeleted: () => void;
  onAddTask: () => void;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

const TaskBoardContent = ({
  taskGroups,
  showQuickAdd,
  refreshTrigger,
  activeDragTask,
  onSetShowQuickAdd,
  onQuickAddSave,
  onTaskClick,
  onTaskArchive,
  onTaskDeleted,
  onAddTask,
  onDragStart,
  onDragEnd,
}: TaskBoardContentProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require pointer to move 8px before initiating drag
      },
    }),
    useSensor(KeyboardSensor)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex-1 bg-background pl-2">
        <div className="h-full flex flex-col">
          <TaskBoardHeader />
          <TaskBoardFilters onAddTask={onAddTask} />

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3"> {/* Reduced space-y */}
              {taskGroups.map((group) => (
                <TaskGroupSection
                  key={`${group.status}-${refreshTrigger}`} // Ensure key is unique and updates if group structure changes
                  group={group}
                  showQuickAdd={showQuickAdd}
                  onSetShowQuickAdd={onSetShowQuickAdd}
                  onQuickAddSave={onQuickAddSave}
                  onTaskClick={onTaskClick}
                  onTaskArchive={onTaskArchive} // This might need re-evaluation with DND
                  onTaskDeleted={onTaskDeleted}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <DragOverlay>
        {activeDragTask ? (
          <div className="bg-card p-2 rounded shadow-xl border border-border">
            {/* This is a simplified representation. Ideally, it would be a clone of TaskRow or TaskRowContent */}
             <TaskRowContent task={activeDragTask} editingTaskId={null} editingValue="" onSetEditingValue={() => {}} onTaskClick={() => {}} onEditClick={() => {}} onSaveEdit={() => {}} onCancelEdit={() => {}} onKeyDown={() => {}} onTaskStatusClick={() => {}} onDeleteClick={() => {}} isDragging={true}/>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoardContent;
