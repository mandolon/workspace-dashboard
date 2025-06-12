
import React from 'react';
import { Paperclip } from 'lucide-react';

const TaskDetailActivity = () => {
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
  );
};

export default TaskDetailActivity;
