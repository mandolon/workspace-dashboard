
import React from 'react';
import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onAddTask: () => void;
}

const AddTaskButton = ({ onAddTask }: AddTaskButtonProps) => {
  return (
    <div className="px-6 py-1">
      <button 
        onClick={onAddTask}
        className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Plus className="w-3 h-3" strokeWidth="2" />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default AddTaskButton;
