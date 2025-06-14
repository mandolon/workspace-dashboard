
import React from 'react';
import { Plus } from 'lucide-react';

interface TaskRowFilesProps {
  hasAttachment: boolean;
}

const TaskRowFiles = ({ hasAttachment }: TaskRowFilesProps) => {
  return (
    <div className="flex items-center gap-1">
      {hasAttachment && (
        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      )}
      <button 
        className="p-0.5 hover:bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          // Handle file attachment
        }}
      >
        <Plus className="w-2 h-2" strokeWidth="2" />
      </button>
    </div>
  );
};

export default TaskRowFiles;
