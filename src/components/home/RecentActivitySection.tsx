
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-[300px] overflow-y-auto space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-start py-2 border-b border-border/30 last:border-b-0">
              <div className="flex-1">
                <span className="font-medium text-sm">{activity.user}: </span>
                <span className="text-sm text-muted-foreground">{activity.text}</span>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground ml-3">
                <Clock className="w-3 h-3" />
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitySection;
