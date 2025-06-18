
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from 'lucide-react';

const CalendarSection = () => {
  const upcomingItems = [
    {
      id: 1,
      date: "Dec 18",
      time: "9:00 AM",
      title: "Client meeting - Project Review",
      type: "meeting"
    },
    {
      id: 2,
      date: "Dec 19",
      time: "2:00 PM",
      title: "Site inspection deadline",
      type: "deadline"
    },
    {
      id: 3,
      date: "Dec 20",
      time: "10:30 AM",
      title: "Team standup",
      type: "meeting"
    },
    {
      id: 4,
      date: "Dec 22",
      time: "All day",
      title: "Design review phase ends",
      type: "deadline"
    },
    {
      id: 5,
      date: "Dec 23",
      time: "3:00 PM",
      title: "Client presentation prep",
      type: "meeting"
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Upcoming
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {upcomingItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-2 px-2 hover:bg-accent/50 rounded border-b border-border/30 last:border-b-0">
              {/* Date and Time on the left */}
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-xs font-medium">{item.date}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
              
              {/* Event details in the center */}
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'meeting' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <span className="text-sm font-medium text-foreground">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
