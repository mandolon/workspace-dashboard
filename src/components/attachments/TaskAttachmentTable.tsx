
import React from "react";
import { X } from "lucide-react";
import { TaskAttachment } from "@/contexts/TaskAttachmentContext";

interface TaskAttachmentTableProps {
  attachments: TaskAttachment[];
  onRemove?: (attachmentId: string) => void;
}

const TaskAttachmentTable: React.FC<TaskAttachmentTableProps> = ({
  attachments,
  onRemove,
}) => {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="py-2 px-3 text-left font-medium">Name</th>
            <th className="py-2 px-3 text-left font-medium whitespace-nowrap">
              Date Created
            </th>
            <th className="py-2 px-3 text-left font-medium">by</th>
            {onRemove && <th className="py-2 px-3 text-right font-medium">Action</th>}
          </tr>
        </thead>
        <tbody>
          {attachments.length === 0 ? (
            <tr>
              <td colSpan={onRemove ? 4 : 3} className="px-3 py-4 text-center text-muted-foreground">
                No attachments yet.
              </td>
            </tr>
          ) : (
            attachments.map((attachment) => (
              <tr
                key={attachment.id}
                className="hover:bg-muted/50 border-b transition-colors"
              >
                <td className="px-3 py-2 max-w-[220px] truncate">
                  <span className="inline-block align-middle mr-2">📄</span>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline cursor-pointer truncate"
                    title={attachment.name}
                    download={attachment.name}
                  >
                    {attachment.name}
                  </a>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{attachment.dateCreated}</td>
                <td className="px-3 py-2">{attachment.author}</td>
                {onRemove && (
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => onRemove(attachment.id)}
                      className="p-1 hover:bg-accent rounded"
                      aria-label="Remove attachment"
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskAttachmentTable;
