
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskAttachmentTable from '../attachments/TaskAttachmentTable';

interface TaskDetailAttachmentsProps {
  taskId?: string;
}

const TaskDetailAttachments = ({ taskId }: TaskDetailAttachmentsProps) => {
  const { getAttachments, addAttachments, removeAttachment } = useTaskAttachmentContext();
  const { customTasks } = useTaskContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  let currentTaskId = taskId;
  if (!currentTaskId && customTasks && customTasks.length > 0) currentTaskId = customTasks[0]?.taskId;
  if (!currentTaskId) return null;
  const attachments = getAttachments(currentTaskId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const files = Array.from(e.target.files);
      addAttachments(currentTaskId!, files, "ME");
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">Attachments</h2>
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
        <span className="text-xs text-muted-foreground flex justify-center items-center gap-1">
          <Upload className="w-4 h-4" /> Drop your files here to upload
        </span>
        <div className="text-[10px] text-muted-foreground mt-1">(Click box to select files)</div>
      </div>
      <TaskAttachmentTable
        attachments={attachments}
        onRemove={(id) => removeAttachment(currentTaskId!, id)}
      />
    </div>
  );
};

export default TaskDetailAttachments;
