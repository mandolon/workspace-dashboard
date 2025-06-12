
import React from 'react';
import { Upload } from 'lucide-react';

const TaskDetailAttachments = () => {
  const attachments = [
    {
      name: "CDO-0063-Planning-Entitlement-Application",
      dateCreated: "Jul 31, 2024",
      author: "Matthew P.",
    },
    {
      name: "CDO-0220-Owner-Builder-F...",
      dateCreated: "Aug 17, 2024",
      author: "Armando L.",
    },
    {
      name: "Agent-for-Owner-Authorizat...",
      dateCreated: "Aug 11, 2024",
      author: "Armando L.",
    },
    {
      name: "James Hall",
      dateCreated: "Aug 2, 2024",
      author: "Matthew P.",
    },
    {
      name: "Corina McCoy",
      dateCreated: "Jul 23, 2024",
      author: "Matthew P.",
    }
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">Attachments</h2>
      
      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-muted/30">
        <p className="text-xs text-muted-foreground">Drop your files here to upload</p>
      </div>

      {/* Attachments Table */}
      <div className="space-y-1">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1 border-b">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Date Created</div>
          <div className="col-span-3">by</div>
        </div>
        
        {/* Table Rows */}
        {attachments.map((attachment, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-muted/50 rounded-md px-1 -mx-1">
            <div className="col-span-6 flex items-center gap-2">
              <div className="w-3 h-3 text-orange-500">📄</div>
              <span className="text-blue-600 hover:underline cursor-pointer">{attachment.name}</span>
            </div>
            <div className="col-span-3 text-muted-foreground">{attachment.dateCreated}</div>
            <div className="col-span-3 text-muted-foreground">{attachment.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetailAttachments;
