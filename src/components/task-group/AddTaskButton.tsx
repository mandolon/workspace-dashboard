
import React from 'react';
import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onAddTask: () => void;
}

const AddTaskButton = ({ onAddTask }: AddTaskButtonProps) => {
  return (
    <div className="px-4 py-1 pl-8"> {/* Adjusted padding */}
      <button 
        onClick={onAddTask}
        className="flex items-center gap-1.5 px-1 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors group" /* Simplified classes */
      >
        <Plus className="w-3 h-3 text-gray-400 group-hover:text-gray-500" strokeWidth="2" />
        <span className="text-gray-500 group-hover:text-gray-700">Add Task</span>
      </button>
    </div>
  );
};

export default AddTaskButton;

