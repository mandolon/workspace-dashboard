
import React from 'react';
import { Card } from "@/components/ui/card";
import { Check, AlertCircle, Clock } from 'lucide-react';

const PerformanceCard = () => {
  const myTasks = [
    { title: "Review architectural drawings", status: "In Progress" },
    { title: "Update project timeline", status: "Red Line" },
    { title: "Client meeting preparation", status: "Completed" },
    { title: "Site inspection report", status: "In Progress" },
    { title: "Submit permit applications", status: "In Progress" }
  ];

  return (
    <Card className="p-6 bg-white border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">My Tasks</h3>
        <div className="space-y-3">
          {myTasks.slice(0, 3).map((task, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-sm text-gray-900 truncate flex-1">{task.title}</span>
              <span className="text-xs text-gray-600 ml-2">{task.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceCard;
