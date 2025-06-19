
import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

const ActivityChart = () => {
  const upcomingItems = [
    { date: "Dec 18", time: "9:00 AM", title: "Client meeting - Project Review" },
    { date: "Dec 19", time: "2:00 PM", title: "Site inspection deadline" },
    { date: "Dec 20", time: "10:30 AM", title: "Team standup" },
    { date: "Dec 22", time: "All day", title: "Design review phase ends" }
  ];

  return (
    <Card className="p-6 bg-white border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Upcoming Events
        </h3>
        
        <div className="space-y-3">
          {upcomingItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-b-0">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                <div className="text-xs text-gray-600">{item.date} {item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ActivityChart;
