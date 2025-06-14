
import React from 'react';

interface TaskDetailTitleSectionProps {
  isEditing: boolean;
  editingValue: string;
  setEditingValue: (v: string) => void;
  startEditingTask: (task: any) => void;
  saveTaskEdit: (id: number | string) => void;
  cancelTaskEdit: () => void;
  task: any;
}

const TaskDetailTitleSection: React.FC<TaskDetailTitleSectionProps> = ({
  isEditing,
  editingValue,
  setEditingValue,
  startEditingTask,
  saveTaskEdit,
  cancelTaskEdit,
  task
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTaskEdit(task.id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelTaskEdit();
    }
  };
  const handleBlur = () => {
    saveTaskEdit(task.id);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0 max-w-[calc(100%-130px)] mr-4">
        {isEditing ? (
          <input
            type="text"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="text-2xl font-semibold opacity-60 bg-transparent border-none outline-none focus:ring-0 px-1 py-0.5 -mx-1 -my-0.5 rounded transition-colors truncate w-full"
            autoFocus
          />
        ) : (
          <h1
            className="text-2xl font-semibold cursor-pointer hover:bg-accent/50 rounded px-1 py-0.5 -mx-1 -my-0.5 transition-colors truncate"
            onClick={() => startEditingTask(task)}
            title="Click to edit title"
          >
            {task.title}
          </h1>
        )}
      </div>
      <div className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2">
        REDLINE / TO DO
      </div>
    </div>
  );
};

export default TaskDetailTitleSection;
