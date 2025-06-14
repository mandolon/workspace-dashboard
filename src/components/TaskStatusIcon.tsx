
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskStatusIconProps {
  status: string;
  onClick: () => void;
  isDashed?: boolean; // Added isDashed prop
}

const TaskStatusIcon = ({ status, onClick, isDashed }: TaskStatusIconProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset animation state if status changes externally
  useEffect(() => {
    setIsAnimating(false);
  }, [status]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'completed') {
      setIsAnimating(true);
      setTimeout(() => {
        onClick();
        // setIsAnimating(false); // Reset animation after onClick if needed, or rely on status change
      }, 150);
    } else {
      onClick();
    }
  };

  const getStatusIcon = () => {
    const baseClasses = "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border-2";
    const hoverBase = "hover:bg-gray-100 dark:hover:bg-gray-700";

    if (status === 'completed') {
      return (
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-green-500">
          <Check className="w-2.5 h-2.5 text-white" strokeWidth="3" />
        </div>
      );
    }

    const isRedline = status === 'redline';
    const isProgress = status === 'progress';
    
    let borderColor = 'border-gray-400'; // Default for 'todo' or other statuses
    let hoverBg = 'hover:bg-gray-50';
    if (isRedline) {
      borderColor = 'border-red-500';
      hoverBg = 'hover:bg-red-50';
    } else if (isProgress) {
      borderColor = 'border-blue-500';
      hoverBg = 'hover:bg-blue-50';
    }

    if (isAnimating) {
      return (
        <div className={cn(
          baseClasses,
          "animate-[scale-in_0.3s_ease-out] bg-green-500 border-green-500"
        )}>
          <div className="w-full h-full flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white animate-[fade-in_0.2s_ease-out_0.1s_both]" strokeWidth="3" />
          </div>
        </div>
      );
    }

    return (
       <div className={cn(
          baseClasses,
          borderColor,
          hoverBg,
          isDashed && "border-dashed", // Apply dashed border conditionally
        )} />
    );
  };

  return (
    <div onClick={handleClick} className="flex items-center justify-center w-5 h-5"> 
      {getStatusIcon()}
    </div>
  );
};

export default TaskStatusIcon;
