
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp, Users, Calendar, Star } from 'lucide-react';

const EngagementMetrics = () => {
  const metrics = [
    {
      title: "Today",
      value: "24",
      icon: TrendingUp,
      color: "bg-red-500",
      trend: "up"
    },
    {
      title: "This Week", 
      value: "156",
      icon: Calendar,
      color: "bg-orange-500",
      trend: "down"
    },
    {
      title: "This Month",
      value: "423",
      icon: Users,
      color: "bg-yellow-500",
      trend: "up"
    },
    {
      title: "Completed",
      value: "89",
      icon: Star,
      color: "bg-green-500",
      trend: "up"
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Engagement</h3>
        <p className="text-sm text-gray-600">
          General statistics of task engagement processes.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
          
          return (
            <Card key={index} className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-full ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                </div>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {metric.title}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Your New Metrics</div>
            <div className="text-xs opacity-90">Track your progress</div>
          </div>
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
            <ArrowUp className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EngagementMetrics;
