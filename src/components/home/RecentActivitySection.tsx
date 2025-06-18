
import React from "react";
import { Clock } from "lucide-react";

const activities = [
  { user: "Matthew P.", text: "Uploaded revised Floor Plan (v2.4)", time: "1h ago" },
  { user: "You", text: "Approved design revisions", time: "3h ago" },
  { user: "Armando L.", text: "Added meeting minutes from last site visit", time: "1d ago" },
  { user: "Matthew P.", text: "Shared Construction Docs – Sheet A200.pdf", time: "2d ago" },
  { user: "Sarah K.", text: "Updated project timeline", time: "3d ago" },
  { user: "John D.", text: "Completed task review", time: "4d ago" }
];

const RecentActivitySection = () => {
  return (
    <div className="h-full rounded-lg p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-3 flex-shrink-0">Recent Activity</h2>
      <div className="space-y-0 flex-1 min-h-0 flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-1 border-b mb-1 flex-shrink-0">
          <div className="col-span-8">Activity</div>
          <div className="col-span-4">Time</div>
        </div>
        
        {/* Activity rows - scrollable */}
        <div className="flex-1 overflow-y-auto space-y-0 min-h-0">
          {activities.map((activity, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/20 last:border-b-0">
              <div className="col-span-8 flex items-center">
                <span className="font-medium text-xs">{activity.user}: </span>
                <span className="text-xs text-muted-foreground ml-1 truncate">{activity.text}</span>
              </div>
              <div className="col-span-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivitySection;
