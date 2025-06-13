
import React from 'react';
import { Paperclip, Mic } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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

      {/* Activity Table */}
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {activities.map((activity, index) => {
              const isUserMessage = activity.user === "You";
              
              return (
                <TableRow key={index} className="hover:bg-muted/30 border-0">
                  <TableCell className="w-12 p-3 align-top">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {getInitials(activity.user)}
                    </div>
                  </TableCell>
                  <TableCell className="w-20 p-3 align-top">
                    <div className={`font-medium text-xs ${isUserMessage ? 'text-blue-600' : ''}`}>
                      {activity.user}
                    </div>
                  </TableCell>
                  <TableCell className="p-3 align-top">
                    <div className="text-xs text-muted-foreground break-words">
                      {activity.action}
                    </div>
                  </TableCell>
                  <TableCell className="w-16 p-3 align-top text-right">
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
