
import React from 'react';
import { Card } from "@/components/ui/card";
import { useUser } from '@/contexts/UserContext';

const UserProfile = () => {
  const { currentUser } = useUser();

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
          {currentUser?.name?.charAt(0) || 'U'}
        </div>
        <h3 className="font-semibold text-gray-900">{currentUser?.name || 'User'}</h3>
        <p className="text-sm text-gray-600 mb-4">Project Manager</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Active Projects</span>
            <span className="font-semibold text-gray-900">12</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Team Members</span>
            <span className="font-semibold text-gray-900">8</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Completion Rate</span>
            <span className="font-semibold text-green-600">94%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
