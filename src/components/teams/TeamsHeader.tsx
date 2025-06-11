
import React from 'react';
import { Users } from 'lucide-react';

const TeamsHeader = () => {
  return (
    <div className="border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <Users className="w-5 h-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">Team Management</h1>
      </div>
    </div>
  );
};

export default TeamsHeader;
