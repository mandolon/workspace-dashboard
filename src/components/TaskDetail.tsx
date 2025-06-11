
import React from 'react';
import { X, ArrowLeft, Upload, Paperclip } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';

interface TaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: number;
    title: string;
    project: string;
    estimatedCompletion: string;
    dateCreated: string;
    dueDate: string;
    assignee: {
      name: string;
      avatar: string;
    };
    hasAttachment: boolean;
    collaborators?: Array<{
      name: string;
      avatar: string;
    }>;
  } | null;
}

const TaskDetail = ({ isOpen, onClose, task }: TaskDetailProps) => {
  if (!task) return null;

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

  const activities = [
    {
      user: "Kenneth A.",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "2h ago"
    },
    {
      user: "You",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "4h ago"
    },
    {
      user: "Matthew",
      action: "moved task to REDLINE / TO DO",
      time: "1d ago"
    },
    {
      user: "Armando",
      action: "uploaded CDO-0063-Planning-Entitlement",
      time: "2d ago"
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-0">
        {/* Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={onClose} className="p-1 hover:bg-accent rounded">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground">{task.project}</span>
            <span className="text-sm text-muted-foreground">-</span>
            <span className="text-sm text-muted-foreground">{task.project}</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                REDLINE / TO DO
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Task Title and Details */}
          <div className="p-4 border-b border-border">
            <div className="text-sm text-muted-foreground mb-1">{task.project}</div>
            <h2 className="text-lg font-semibold mb-4">{task.title}</h2>
            
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">Add description</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Created by</label>
                <select className="w-full border border-border rounded px-2 py-1 mt-1">
                  <option>Select User</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground">Date Created</label>
                <input type="date" className="w-full border border-border rounded px-2 py-1 mt-1" />
              </div>
              <div>
                <label className="text-muted-foreground">Assigned to</label>
                <select className="w-full border border-border rounded px-2 py-1 mt-1">
                  <option>Select User</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground">Mark Complete</label>
                <input type="date" className="w-full border border-border rounded px-2 py-1 mt-1" />
              </div>
            </div>
          </div>

          {/* Attachments */}
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

          {/* Activity */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Activity</h3>
            
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{activity.user}</div>
                    <div className="text-sm text-muted-foreground mt-1">{activity.action}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="mt-6 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type your message" 
                className="flex-1 border border-border rounded px-3 py-2 text-sm"
              />
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetail;
