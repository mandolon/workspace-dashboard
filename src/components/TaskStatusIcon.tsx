
import React from 'react';
import { Circle } from 'lucide-react';

interface TaskStatusIconProps {
  status: string;
}

const TaskStatusIcon = ({ status }: TaskStatusIconProps) => {
  switch (status) {
    case 'redline':
      return (
        <Circle className="w-4 h-4 text-red-500" strokeWidth={3} />
      );
    case 'progress':
      return (
        <Circle className="w-4 h-4 text-blue-500" strokeWidth={3} />
      );
    case 'completed':
      return (
        <Circle className="w-4 h-4 text-green-500" strokeWidth={3} />
      );
    default:
      return (
        <Circle className="w-4 h-4 text-gray-300" strokeWidth={3} />
      );
  }
};

export default TaskStatusIcon;
