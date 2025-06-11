import React from 'react';
import { Calendar, User, Paperclip } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  project: string;
  status: string;
  assignedTo?: string;
  dueDate?: string;
  hasAttachment?: boolean;
}

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-gray-500">{task.project}</div>
          <div className="text-sm font-medium text-gray-900">{task.name}</div>
        </div>
        {task.hasAttachment && (
          <Paperclip className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          {task.assignedTo && (
            <div className="flex items-center mr-2">
              <User className="w-3 h-3 mr-1" />
              {task.assignedTo}
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {task.dueDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
