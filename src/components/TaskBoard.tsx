
import React from 'react';
import { Plus, Filter, Search, Eye, Users, Settings, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
          hasAttachment: true,
          status: "redline"
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
          collaborators: [{ name: "MP", avatar: "bg-green-500" }],
          status: "progress"
        },
        {
          id: 3,
          title: "Update 12.9.23",
          project: "Ogden - Thew - 2709 T Street",
          estimatedCompletion: "—",
          dateCreated: "12/9/23",
          dueDate: "—",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: true,
          status: "progress"
        },
        {
          id: 4,
          title: "Alternate Cabin Design",
          project: "Rathbun - USFS Cabin",
          estimatedCompletion: "—",
          dateCreated: "9/13/23",
          dueDate: "9/22/23, 5...",
          assignee: { name: "AL", avatar: "bg-gray-600" },
          hasAttachment: false,
          status: "progress"
        }
      ]
    }
  ];

  const renderStatusIcon = (status: string) => {
    const baseClasses = "w-5 h-5 rounded-full border-2 flex items-center justify-center";
    
    switch (status) {
      case 'redline':
        return (
          <div className={`${baseClasses} border-red-500 bg-red-500`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case 'progress':
        return (
          <div className={`${baseClasses} border-blue-500 bg-blue-500`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case 'completed':
        return (
          <div className={`${baseClasses} border-green-500 bg-green-500`}>
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} border-gray-300`}></div>
        );
    }
  };

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
      <div className="p-6 space-y-8">
        {taskGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            {/* Group Header */}
            <div className="flex items-center gap-3 mb-4">
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
              <div className={`px-3 py-1 rounded text-white text-sm font-medium ${group.color}`}>
                {group.title}
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-muted-foreground font-medium">Name</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Date Created</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Files</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Assigned to</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {renderStatusIcon(task.status)}
                        <div>
                          <div className="font-medium text-sm">{task.project}</div>
                          <div className="text-sm text-muted-foreground">{task.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {task.dateCreated}
                    </TableCell>
                    <TableCell>
                      {task.hasAttachment && (
                        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center -space-x-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${task.assignee.avatar}`}>
                          {task.assignee.name}
                        </div>
                        {task.collaborators?.map((collaborator, index) => (
                          <div
                            key={index}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-background ${collaborator.avatar}`}
                          >
                            {collaborator.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Add Task Button */}
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              <Plus className="w-4 h-4" />
              <span>Add task</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
