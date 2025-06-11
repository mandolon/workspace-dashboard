import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Mail, Shield } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const TeamsContent = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Stephanie Sharkey',
      email: 'steph56@gmail.com',
      role: 'Architect',
      lastActive: 'Jul 31, 2024',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Joshua Jones',
      email: 'jjones@aol.com',
      role: 'Engineer',
      lastActive: 'Aug 17, 2024',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Rhonda Rhodes',
      email: 'rhodes@outlook.com',
      role: 'Consultant',
      lastActive: 'Aug 11, 2024',
      status: 'Active'
    },
    {
      id: '4',
      name: 'James Hall',
      email: 'j.hall367@outlook.com',
      role: 'Designer',
      lastActive: 'Aug 2, 2024',
      status: 'Inactive'
    },
    {
      id: '5',
      name: 'Corina McCoy',
      email: 'mc.coy@aol.com',
      role: 'Designer',
      lastActive: 'Jul 23, 2024',
      status: 'Pending'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Inactive':
        return 'text-gray-600 bg-gray-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="pl-7 pr-3 py-1 border border-border rounded text-xs w-48"
            />
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1">
          <Plus className="w-3 h-3" />
          Add Member
        </button>
      </div>

      {/* Table */}
      <div className="space-y-0.5">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Last Active</div>
          <div className="col-span-2">Status</div>
        </div>
        
        {/* Member Rows */}
        {teamMembers.map((member) => (
          <div key={member.id} className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group">
            <div className="col-span-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium">{member.name}</span>
              </div>
            </div>
            <div className="col-span-3 flex items-center gap-1 text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span className="text-blue-600 hover:underline">{member.email}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span>{member.role}</span>
            </div>
            <div className="col-span-2 flex items-center text-muted-foreground">
              <span>{member.lastActive}</span>
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                {member.status}
              </span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-3 bg-accent/30 rounded border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Total: {teamMembers.length} members
          </span>
          <div className="flex items-center gap-4">
            <span className="text-green-600">
              Active: {teamMembers.filter(m => m.status === 'Active').length}
            </span>
            <span className="text-yellow-600">
              Pending: {teamMembers.filter(m => m.status === 'Pending').length}
            </span>
            <span className="text-gray-600">
              Inactive: {teamMembers.filter(m => m.status === 'Inactive').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsContent;
