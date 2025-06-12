
import React from 'react';
import { Plus, Search } from 'lucide-react';

interface TeamsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddMember: () => void;
}

const TeamsSearchBar = ({ searchTerm, onSearchChange, onAddMember }: TeamsSearchBarProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search members..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-7 pr-3 py-1 border border-border rounded text-xs w-48"
          />
        </div>
      </div>
      <button 
        onClick={onAddMember}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1"
      >
        <Plus className="w-3 h-3" />
        Add Member
      </button>
    </div>
  );
};

export default TeamsSearchBar;
