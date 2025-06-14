
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskStatusIconProps {
  status: string;
  onClick: () => void;
}

const TaskStatusIcon = ({ status, onClick }: TaskStatusIconProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'completed') {
      setIsAnimating(true);
      setTimeout(() => {
        onClick();
        // Reset animation state after a short delay if needed, or let it be reset by status change
        // setIsAnimating(false); // Consider this if animation needs reset without status change
      }, 150);
    } else {
      onClick();
    }
  };

  const getStatusIcon = () => {
    if (status === 'completed') {
      return (
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center transition-all duration-200">
          <Check className="w-2.5 h-2.5 text-white" strokeWidth="3" />
        </div>
      );
    }

    if (status === 'redline') {
      return (
        <div className={cn(
          "w-4 h-4 border-2 border-red-500 rounded-full cursor-pointer hover:bg-red-50 transition-all duration-200",
          isAnimating && "animate-[scale-in_0.3s_ease-out] bg-green-500 border-green-500"
        )}>
          {isAnimating && (
            <div className="w-full h-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white animate-[fade-in_0.2s_ease-out_0.1s_both]" strokeWidth="3" />
            </div>
          )}
        </div>
      );
    }

    if (status === 'progress') {
      return (
        <div className={cn(
          "w-4 h-4 border-2 border-blue-500 rounded-full cursor-pointer hover:bg-blue-50 transition-all duration-200",
          isAnimating && "animate-[scale-in_0.3s_ease-out] bg-green-500 border-green-500"
        )}>
          {isAnimating && (
            <div className="w-full h-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white animate-[fade-in_0.2s_ease-out_0.1s_both]" strokeWidth="3" />
            </div>
          )}
        </div>
      );
    }

    // Default status icon - now dashed
    return (
      <div className={cn(
        "w-4 h-4 border-2 border-gray-300 border-dashed rounded-full cursor-pointer hover:bg-gray-50 transition-all duration-200",
         isAnimating && "animate-[scale-in_0.3s_ease-out] bg-green-500 border-green-500 !border-solid" // Ensure border becomes solid on animation
      )}>
        {isAnimating && (
            <div className="w-full h-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white animate-[fade-in_0.2s_ease-out_0.1s_both]" strokeWidth="3" />
            </div>
          )}
      </div>
    );
  };

  return (
    <button onClick={handleClick} className="p-0.5 hover:bg-accent rounded transition-colors flex-shrink-0">
      {getStatusIcon()}
    </button>
  );
};

export default TaskStatusIcon;

