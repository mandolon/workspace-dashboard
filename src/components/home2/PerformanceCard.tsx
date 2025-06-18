
import React from 'react';
import { Card } from "@/components/ui/card";
import { Check, AlertCircle, Clock } from 'lucide-react';

const PerformanceCard = () => {
  const achievements = [
    {
      icon: Check,
      text: "Project milestone completed",
      color: "bg-green-500"
    },
    {
      icon: AlertCircle,
      text: "Design review scheduled",
      color: "bg-blue-500"
    },
    {
      icon: Clock,
      text: "Client meeting confirmed",
      color: "bg-orange-500"
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-6">Performance</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-3xl font-bold">84%</div>
            <div className="text-sm text-slate-300">Tasks Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">67%</div>
            <div className="text-sm text-slate-300">On Schedule</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full ${achievement.color} flex items-center justify-center`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-slate-200">{achievement.text}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PerformanceCard;
