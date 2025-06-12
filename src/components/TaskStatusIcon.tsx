
import React from 'react';
import { Circle, Check } from 'lucide-react';

interface TaskStatusIconProps {
  status: string;
  onClick?: () => void;
}

const TaskStatusIcon = ({ status, onClick }: TaskStatusIconProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  switch (status) {
    case 'redline':
      return (
        <div 
          className="relative w-4 h-4 cursor-pointer group"
          onClick={handleClick}
        >
          <Circle className="w-4 h-4 text-red-500 group-hover:fill-red-500 transition-all duration-200" strokeWidth={3} />
        </div>
      );
    case 'progress':
      return (
        <div 
          className="relative w-4 h-4 cursor-pointer group"
          onClick={handleClick}
        >
          <Circle className="w-4 h-4 text-blue-500 group-hover:fill-blue-500 transition-all duration-200" strokeWidth={3} />
        </div>
      );
    case 'completed':
      return (
        <div 
          className="relative w-4 h-4 cursor-pointer group animate-scale-in"
          onClick={handleClick}
        >
          <Circle className="w-4 h-4 text-green-500 fill-green-500 transition-all duration-200" strokeWidth={3} />
          <Check className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
        </div>
      );
    default:
      return (
        <div 
          className="relative w-4 h-4 cursor-pointer group"
          onClick={handleClick}
        >
          <Circle className="w-4 h-4 text-gray-300 group-hover:fill-gray-300 transition-all duration-200" strokeWidth={3} />
        </div>
      );
  }
};

export default TaskStatusIcon;
