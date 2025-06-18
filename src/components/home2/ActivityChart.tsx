
import React from 'react';
import { Card } from "@/components/ui/card";

const ActivityChart = () => {
  const tabs = ['Activity', 'Tasks', 'Progress'];
  const [activeTab, setActiveTab] = React.useState('Activity');

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-100 to-cyan-200 border-cyan-300">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                  activeTab === tab 
                    ? 'bg-white text-cyan-700 shadow-sm' 
                    : 'text-cyan-700 hover:bg-white/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium">
            Week
          </div>
        </div>
        
        <div className="text-right mb-4">
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-800">1,456</span>
            <span className="text-xs text-gray-600">Active Tasks</span>
          </div>
        </div>
      </div>

      {/* Mock Chart Area */}
      <div className="h-24 bg-gradient-to-r from-cyan-200 to-cyan-300 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent rounded-b-lg"></div>
        
        {/* Mock chart elements */}
        <div className="absolute bottom-2 left-4 w-8 h-12 bg-white/40 rounded-sm"></div>
        <div className="absolute bottom-2 left-16 w-8 h-8 bg-white/40 rounded-sm"></div>
        <div className="absolute bottom-2 left-28 w-8 h-16 bg-white/40 rounded-sm"></div>
        <div className="absolute bottom-2 right-16 w-8 h-10 bg-white/40 rounded-sm"></div>
        <div className="absolute bottom-2 right-4 w-8 h-14 bg-white/40 rounded-sm"></div>
        
        {/* Days of week */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-cyan-700 font-medium p-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
            <span key={day} className={index === 3 ? 'bg-slate-800 text-white px-2 py-1 rounded-full' : ''}>{day}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ActivityChart;
