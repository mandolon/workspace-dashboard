
import React from 'react';
import { Paperclip, Mic } from 'lucide-react';

const TaskDetailActivity = () => {
  const activities = [
    {
      user: "Kenneth A.",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "2h ago",
      type: "comment"
    },
    {
      user: "You",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "4h ago",
      type: "comment"
    },
    {
      user: "Matthew",
      action: "moved task to REDLINE / TO DO",
      time: "1d ago",
      type: "status"
    },
    {
      user: "Armando",
      action: "uploaded CDO-0063-Planning-Entitlement",
      time: "2d ago",
      type: "upload"
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Activity Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Activity</h3>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {getInitials(activity.user)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{activity.user}</div>
              <div className="text-sm text-muted-foreground mt-1 break-words">{activity.action}</div>
              <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Type your message" 
            className="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">
            <Paperclip className="w-4 h-4" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">
            <Mic className="w-4 h-4" />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailActivity;
