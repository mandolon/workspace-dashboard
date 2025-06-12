
import React from 'react';
import { Upload, Paperclip } from 'lucide-react';

const TaskDetailAttachments = () => {
  const attachments = [
    {
      name: "CDO-0063-Planning-Entitlement-Application",
      dateCreated: "Jul 31, 2024",
      author: "Matthew P.",
      icon: "📄"
    },
    {
      name: "CDO-0220-Owner-Builder-F...",
      dateCreated: "Aug 17, 2024",
      author: "Armando L.",
      icon: "📄"
    },
    {
      name: "Agent-for-Owner-Authorizat...",
      dateCreated: "Aug 11, 2024",
      author: "Armando L.",
      icon: "📄"
    },
    {
      name: "James Hall",
      dateCreated: "Aug 2, 2024",
      author: "Matthew P.",
      icon: "📄"
    },
    {
      name: "Corina McCoy",
      dateCreated: "Jul 23, 2024",
      author: "Matthew P.",
      icon: "📄"
    }
  ];

  return (
    <div className="p-4 border-b border-border">
      <h3 className="font-semibold mb-4">Attachments</h3>
      
      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drop your files here to upload</p>
      </div>

      {/* Attachments Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Date Created</div>
          <div className="col-span-3">by</div>
        </div>
        
        {attachments.map((attachment, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 text-sm py-2 hover:bg-accent/50 rounded">
            <div className="col-span-6 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-orange-500" />
              <span className="truncate text-blue-600">{attachment.name}</span>
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
