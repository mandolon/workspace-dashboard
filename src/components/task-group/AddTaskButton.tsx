
import React from 'react';
import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onAddTask: () => void;
}

const AddTaskButton = ({ onAddTask }: AddTaskButtonProps) => {
  return (
    <div className="px-4 py-2 pl-8"> {/* Keep consistent pl with TaskRowContent drag handle */}
      <button 
        onClick={onAddTask}
        className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors rounded border border-transparent hover:border-border"
      >
        <Plus className="w-3 h-3" strokeWidth="2" />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default AddTaskButton;
