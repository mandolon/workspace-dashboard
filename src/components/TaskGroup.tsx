import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  name: string;
  project: string;
  status: string;
  assignedTo?: string;
  dueDate?: string;
  hasAttachment?: boolean;
}

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TaskGroup = ({ title, tasks, onTaskClick }: TaskGroupProps) => {
  return (
    <div className="flex-shrink-0 w-80">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-sm font-semibold">{title}</h2>
        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskGroup;
