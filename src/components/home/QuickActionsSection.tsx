
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, FileText, Plus, Users, Settings } from "lucide-react";

const QuickActionsSection = () => {
  const actions = [
    {
      label: "Create Task",
      icon: Plus,
      description: "Add a new task",
      variant: "default" as const
    },
    {
      label: "Schedule Meeting",
      icon: Calendar,
      description: "Book time with team",
      variant: "outline" as const
    },
    {
      label: "Message Team",
      icon: MessageSquare,
      description: "Send a message",
      variant: "outline" as const
    },
    {
      label: "View Projects",
      icon: FileText,
      description: "Browse all projects",
      variant: "outline" as const
    },
    {
      label: "Team Members",
      icon: Users,
      description: "Manage team",
      variant: "outline" as const
    },
    {
      label: "Settings",
      icon: Settings,
      description: "App preferences",
      variant: "outline" as const
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-3 flex flex-col items-center gap-1.5 text-center"
                onClick={() => console.log(`${action.label} clicked`)}
              >
                <Icon className="w-4 h-4" />
                <div>
                  <div className="text-xs font-medium">{action.label}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsSection;
