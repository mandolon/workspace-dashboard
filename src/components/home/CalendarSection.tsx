
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from 'lucide-react';
import { getInitials } from "@/utils/taskUtils";
import { getCRMUser } from "@/utils/taskUserCRM";
import { getAvatarColor } from "@/utils/avatarColors";
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";

const CalendarSection = () => {
  const upcomingItems = [
    {
      id: 1,
      date: "Dec 18",
      time: "9:00 AM",
      title: "Client meeting - Project Review",
      type: "meeting",
      assignedTo: { name: "AL", fullName: "Armando Lopez" }
    },
    {
      id: 2,
      date: "Dec 19",
      time: "2:00 PM",
      title: "Site inspection deadline",
      type: "deadline",
      assignedTo: { name: "MP", fullName: "Mark Pinsky" }
    },
    {
      id: 3,
      date: "Dec 20",
      time: "10:30 AM",
      title: "Team standup",
      type: "meeting",
      assignedTo: { name: "ALD", fullName: "Alice Dale" }
    },
    {
      id: 4,
      date: "Dec 22",
      time: "All day",
      title: "Design review phase ends",
      type: "deadline",
      assignedTo: { name: "JH", fullName: "James Hall" }
    },
    {
      id: 5,
      date: "Dec 23",
      time: "3:00 PM",
      title: "Client presentation prep",
      type: "meeting",
      assignedTo: { name: "AL", fullName: "Armando Lopez" }
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
            <div className="col-span-6">Event</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-2">Assigned to</div>
          </div>
          
          {/* Event rows */}
          <div className="max-h-[240px] overflow-y-auto space-y-0">
            {upcomingItems.map((item) => {
              const assignee = getCRMUser(item.assignedTo);
              return (
                <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30 last:border-b-0">
                  <div className="col-span-6 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'meeting' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <span className="text-sm font-medium text-foreground truncate">{item.title}</span>
                  </div>
                  <div className="col-span-2 text-muted-foreground flex items-center">
                    {item.date}
                  </div>
                  <div className="col-span-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                  <div className="col-span-2 flex items-center">
                    {assignee && (
                      <div className="flex items-center gap-1">
                        <div className={`w-6 h-6 rounded-full ${AVATAR_INITIALS_CLASSNAMES} text-white ${getAvatarColor(assignee)}`}>
                          {getInitials(assignee.fullName ?? assignee.name)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
