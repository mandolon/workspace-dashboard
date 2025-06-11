
import React from 'react';
import { Plus, Filter, Search, Eye, Users, Settings } from 'lucide-react';
import TaskGroup from './TaskGroup';

const TaskBoard = () => {
  const taskGroups = [
    {
      title: "TASK/ REDLINE",
      count: 1,
      color: "bg-red-500",
      tasks: [
        {
          id: 1,
          title: "Planning set finalized, set up CD's",
          project: "Piner Haus Garage",
          estimatedCompletion: "—",
          dateCreated: "8/10/22",
          dueDate: "—",
          assignee: { name: "MH", avatar: "bg-purple-500" },
          hasAttachment: true
        }
      ]
    },
    {
      title: "PROGRESS/ UPDATE",
      count: 3,
      color: "bg-blue-500",
      tasks: [
        {
          id: 2,
          title: "Update - 12.27.23",
          project: "Rathbun - USFS Cabin",
          estimatedCompletion: "—",
          dateCreated: "12/27/23",
          dueDate: "—",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: true,
          collaborators: [{ name: "MP", avatar: "bg-green-500" }]
        },
        {
          id: 3,
          title: "Update 12.9.23",
          project: "Ogden - Thew - 2709 T Street",
          estimatedCompletion: "—",
          dateCreated: "12/9/23",
          dueDate: "—",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: true
        },
        {
          id: 4,
          title: "Alternate Cabin Design",
          project: "Rathbun - USFS Cabin",
          estimatedCompletion: "—",
          dateCreated: "9/13/23",
          dueDate: "9/22/23, 5...",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: false
        }
      ]
    }
  ];

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span className="font-semibold">PinerWorks</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-semibold">In Progress</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Agents</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">2</span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">Ask AI</button>
            <button className="text-sm text-gray-600 hover:text-gray-700">Share</button>
            <button className="text-sm text-gray-600 hover:text-gray-700">Chat</button>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-foreground">Overview</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">To Do</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">Calendar</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">Weekly Update</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">Board</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">Table</button>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Plus className="w-3 h-3" />
              View
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700">
              <Search className="w-4 h-4" />
              Search
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700">
              <Eye className="w-4 h-4" />
              Hide
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700">
              <Settings className="w-4 h-4" />
              Customize
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1">
              Add Task
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm">
            Group: Status
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-700 text-sm">
            Subtasks
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-700 text-sm">
            Columns
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-700 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-700 text-sm">
              Closed
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-700 text-sm">
              Assignee
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-1.5 border border-border rounded text-sm w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Task Groups */}
      <div className="p-6 space-y-6">
        {taskGroups.map((group, index) => (
          <TaskGroup key={index} {...group} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
