
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
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-semibold">Activity</h3>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {getInitials(activity.user)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs">{activity.user}</div>
              <div className="text-xs text-muted-foreground mt-0.5 break-words">{activity.action}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Type your message" 
            className="flex-1 border border-border rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">
            <Paperclip className="w-3 h-3" />
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">
            <Mic className="w-3 h-3" />
          </button>
          <button className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailActivity;
