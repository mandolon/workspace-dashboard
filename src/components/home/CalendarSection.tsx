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
      assignedTo: { name: "AL", fullName: "Armando Lopez", avatar: "AL" }
    },
    {
      id: 2,
      date: "Dec 19",
      time: "2:00 PM",
      title: "Site inspection deadline",
      type: "deadline",
      assignedTo: { name: "MP", fullName: "Mark Pinsky", avatar: "MP" }
    },
    {
      id: 3,
      date: "Dec 20",
      time: "10:30 AM",
      title: "Team standup",
      type: "meeting",
      assignedTo: { name: "ALD", fullName: "Alice Dale", avatar: "ALD" }
    },
    {
      id: 4,
      date: "Dec 22",
      time: "All day",
      title: "Design review phase ends",
      type: "deadline",
      assignedTo: { name: "JH", fullName: "James Hall", avatar: "JH" }
    },
    {
      id: 5,
      date: "Dec 23",
      time: "3:00 PM",
      title: "Client presentation prep",
      type: "meeting",
      assignedTo: { name: "AL", fullName: "Armando Lopez", avatar: "AL" }
    },
    {
      id: 6,
      date: "Dec 24",
      time: "11:00 AM",
      title: "Final permit submission",
      type: "deadline",
      assignedTo: { name: "MP", fullName: "Mark Pinsky", avatar: "MP" }
    },
    {
      id: 7,
      date: "Dec 26",
      time: "1:30 PM",
      title: "Construction team briefing",
      type: "meeting",
      assignedTo: { name: "JH", fullName: "James Hall", avatar: "JH" }
    },
    {
      id: 8,
      date: "Dec 27",
      time: "4:00 PM",
      title: "Material delivery coordination",
      type: "deadline",
      assignedTo: { name: "ALD", fullName: "Alice Dale", avatar: "ALD" }
    },
    {
      id: 9,
      date: "Dec 30",
      time: "9:30 AM",
      title: "Progress review meeting",
      type: "meeting",
      assignedTo: { name: "AL", fullName: "Armando Lopez", avatar: "AL" }
    },
    {
      id: 10,
      date: "Jan 2",
      time: "2:15 PM",
      title: "New year planning session",
      type: "meeting",
      assignedTo: { name: "MP", fullName: "Mark Pinsky", avatar: "MP" }
    }
  ];

  return (
    <div className="h-full rounded-lg bg-gray-50/30 p-4">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4" />
        Upcoming
      </h2>
      <div className="space-y-0">
        {/* Header */}
        <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-1 border-b mb-1">
          <div className="col-span-5">Event</div>
          <div className="col-span-1 text-center">Files</div>
          <div className="col-span-3">Date Created</div>
          <div className="col-span-3">Assigned to</div>
        </div>
        
        {/* Event rows */}
        <div className="max-h-[240px] overflow-y-auto space-y-0">
          {upcomingItems.map((item) => {
            const assignee = getCRMUser(item.assignedTo);
            return (
              <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-white/80 rounded border-b border-border/20 last:border-b-0">
                <div className="col-span-5 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'meeting' ? 'bg-blue-500' : 'bg-orange-500'
                  }`} />
                  <span className="text-foreground hover:underline truncate cursor-pointer">
                    {item.title}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {/* Empty for consistency with My Tasks */}
                </div>
                <div className="col-span-3 text-muted-foreground flex items-center">
                  <span className="truncate max-w-[110px] text-xs text-muted-foreground block text-ellipsis">
                    {item.date} {item.time}
                  </span>
                </div>
                <div className="col-span-3 flex items-center">
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
    </div>
  );
};

export default CalendarSection;
