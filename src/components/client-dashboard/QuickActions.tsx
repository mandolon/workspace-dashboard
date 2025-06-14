
import React from "react";
import { Calendar, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions: React.FC = () => (
  <div className="flex gap-3 flex-wrap">
    <Button variant="outline" className="flex gap-2 items-center" size="sm">
      <Calendar className="w-4 h-4" />
      Schedule Meeting
    </Button>
    <Button variant="outline" className="flex gap-2 items-center" size="sm">
      <MessageSquare className="w-4 h-4" />
      Message Team
    </Button>
    <Button variant="outline" className="flex gap-2 items-center" size="sm">
      <FileText className="w-4 h-4" />
      Download Package
    </Button>
  </div>
);

export default QuickActions;
