
import React from 'react';
import { Card } from "@/components/ui/card";
import { Plus, Calendar, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EngagementMetrics = () => {
  const quickActions = [
    { label: "Task", icon: Plus },
    { label: "Meeting", icon: Calendar },
    { label: "Message", icon: MessageSquare },
    { label: "Project", icon: FileText }
  ];

  return (
    <Card className="p-6 bg-white border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
        <p className="text-sm text-gray-600">
          Quickly create new items and manage your workflow.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 text-center border-gray-200 hover:bg-gray-50"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default EngagementMetrics;
