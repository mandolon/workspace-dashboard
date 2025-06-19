
import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock } from 'lucide-react';

const TasksActivityFeed = () => {
  const activities = [
    { user: "Matthew P.", text: "Uploaded revised Floor Plan (v2.4)", time: "1h ago" },
    { user: "You", text: "Approved design revisions", time: "3h ago" },
    { user: "Armando L.", text: "Added meeting minutes from last site visit", time: "1d ago" },
    { user: "Matthew P.", text: "Shared Construction Docs – Sheet A200.pdf", time: "2d ago" },
    { user: "Sarah K.", text: "Updated project timeline", time: "3d ago" },
    { user: "John D.", text: "Completed task review", time: "4d ago" }
  ];

  return (
    <Card className="p-6 bg-white border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-gray-600">{activity.user.charAt(0)}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm">
                <span className="font-medium text-gray-900">{activity.user}: </span>
                <span className="text-gray-600">{activity.text}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TasksActivityFeed;
