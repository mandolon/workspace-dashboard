
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
        <div className="space-y-0">
          {/* Header */}
          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-1 border-b mb-1">
            <div className="col-span-3">Date</div>
            <div className="col-span-9">Event</div>
          </div>
          
          {/* Calendar items */}
          <div className="max-h-[240px] overflow-y-auto space-y-0">
            {upcomingItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30 last:border-b-0">
                <div className="col-span-3 flex flex-col">
                  <span className="font-medium text-xs">{item.date}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
                <div className="col-span-9 flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'meeting' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <span className="text-xs truncate">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
