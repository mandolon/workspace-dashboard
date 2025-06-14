
import React from 'react';
import { Plus, Paperclip } from 'lucide-react';

interface TaskRowFilesProps {
  hasAttachment: boolean;
  attachmentCount?: number;
  onAddFileClick?: (e: React.MouseEvent) => void;
}

const TaskRowFiles = ({ hasAttachment, attachmentCount = 0, onAddFileClick }: TaskRowFilesProps) => {
  return (
    <div className="flex items-center gap-2">
      {hasAttachment && (
        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center relative">
          <Paperclip className="w-4 h-4 text-gray-600" />
          {attachmentCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full text-[10px] px-1">{attachmentCount}</span>
          )}
        </div>
      )}
      <button 
        className="p-1 hover:bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        style={{ minWidth: 28, minHeight: 28 }}
        onClick={e => {
          e.stopPropagation();
          onAddFileClick?.(e);
        }}
        aria-label="Add file"
      >
        <Plus className="w-4 h-4" strokeWidth="2" />
      </button>
    </div>
  );
};

export default TaskRowFiles;
