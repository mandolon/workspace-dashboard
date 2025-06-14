
import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';
import { useTaskContext } from '@/contexts/TaskContext';

interface TaskDetailAttachmentsProps {
  taskId?: string;
}

const TaskDetailAttachments = ({ taskId }: TaskDetailAttachmentsProps) => {
  const { getAttachments, addAttachments, removeAttachment } = useTaskAttachmentContext();
  const { customTasks } = useTaskContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If no taskId, try to get the currently displayed task automatically
  let currentTaskId = taskId;
  if (!currentTaskId && customTasks && customTasks.length > 0) currentTaskId = customTasks[0]?.taskId;

  if (!currentTaskId) return null;
  const attachments = getAttachments(currentTaskId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const files = Array.from(e.target.files);
      addAttachments(currentTaskId!, files, "ME");
      e.target.value = ""; // Reset so same file can be added again
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">Attachments</h2>
      
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-muted/30 cursor-pointer hover:bg-accent/30 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          aria-label="Upload file"
        />
        <span className="text-xs text-muted-foreground flex justify-center items-center gap-1"><Upload className="w-4 h-4" /> Drop your files here to upload</span>
        <div className="text-[10px] text-muted-foreground mt-1">(Click box to select files)</div>
      </div>

      {/* Attachments Table */}
      {attachments.length > 0 && (
        <div className="space-y-1">
          {/* Table Header */}
          <div className="grid grid-cols-13 gap-1 text-xs font-medium text-muted-foreground py-1 border-b">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Date Created</div>
            <div className="col-span-2">by</div>
            <div className="col-span-2 text-right pr-2">Action</div>
          </div>
          
          {/* Table Rows */}
          {attachments.map((attachment) => (
            <div key={attachment.id} className="grid grid-cols-13 gap-1 text-xs py-2 hover:bg-muted/50 rounded-md px-1 -mx-1">
              <div className="col-span-6 flex items-center gap-2">
                <div className="w-4 h-4 text-orange-500">📄</div>
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline cursor-pointer truncate max-w-[170px]"
                  title={attachment.name}
                  download={attachment.name}
                >
                  {attachment.name}
                </a>
              </div>
              <div className="col-span-3 text-muted-foreground">{attachment.dateCreated}</div>
              <div className="col-span-2 text-muted-foreground">{attachment.author}</div>
              <div className="col-span-2 flex items-center justify-end pr-2">
                <button
                  className="p-1 hover:bg-accent rounded"
                  aria-label="Remove attachment"
                  onClick={() => removeAttachment(currentTaskId!, attachment.id)}
                >
                  <X className="w-3 h-3 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {attachments.length === 0 && (
        <div className="text-xs text-muted-foreground text-center mt-2">No attachments yet.</div>
      )}
    </div>
  );
};

export default TaskDetailAttachments;
