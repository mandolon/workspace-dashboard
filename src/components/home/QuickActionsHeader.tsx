
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MessageSquare, FileText } from "lucide-react";

const QuickActionsHeader = () => {
  const quickActions = [
    {
      label: "Task",
      icon: Plus,
      variant: "default" as const
    },
    {
      label: "Meeting",
      icon: Calendar,
      variant: "outline" as const
    },
    {
      label: "Message",
      icon: MessageSquare,
      variant: "outline" as const
    },
    {
      label: "Project",
      icon: FileText,
      variant: "outline" as const
    }
  ];

  return (
    <div className="flex items-center gap-1">
      {quickActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button
            key={index}
            variant={action.variant}
            size="sm"
            className="h-7 px-2 text-xs gap-1"
            onClick={() => console.log(`Quick ${action.label} clicked`)}
          >
            <Icon className="w-3 h-3" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
};

export default QuickActionsHeader;
