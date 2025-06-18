
import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock, FileText, Users, CheckCircle } from 'lucide-react';

const TasksActivityFeed = () => {
  const activities = [
    {
      user: "You",
      action: "completed task review",
      time: "2h ago",
      type: "completed",
      icon: CheckCircle
    },
    {
      user: "Matthew P.",
      action: "uploaded new documents",
      time: "4h ago", 
      type: "upload",
      icon: FileText
    },
    {
      user: "Team Meeting",
      action: "scheduled for tomorrow",
      time: "6h ago",
      type: "meeting",
      icon: Users
    },
    {
      user: "Armando L.",
      action: "updated project timeline",
      time: "1d ago",
      type: "update",
      icon: Clock
    },
    {
      user: "Sarah K.",
      action: "added new milestone",
      time: "2d ago",
      type: "milestone",
      icon: CheckCircle
    },
    {
      user: "Design Review",
      action: "completed successfully",
      time: "3d ago",
      type: "completed",
      icon: CheckCircle
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'completed': return 'bg-green-500';
      case 'upload': return 'bg-blue-500';
      case 'meeting': return 'bg-purple-500';
      case 'update': return 'bg-orange-500';
      case 'milestone': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-6 bg-white border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{activity.user}</span>
                  <span className="text-gray-600 ml-1">{activity.action}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All Activity
        </button>
      </div>
    </Card>
  );
};

export default TasksActivityFeed;
