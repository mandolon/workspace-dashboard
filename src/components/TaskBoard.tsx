import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, Eye, Users, Settings, ChevronDown, MoreHorizontal, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TaskDialog from './TaskDialog';

const TaskBoard = () => {
  const navigate = useNavigate();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [customTasks, setCustomTasks] = useState<any[]>([]);

  const defaultTaskGroups = [
    {
      title: "TASK/ REDLINE",
      count: 1,
      color: "bg-red-500",
      status: "redline",
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
      status: "progress",
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

  // Combine default tasks with custom tasks and group by status
  const getTaskGroups = () => {
    const allTasks = [...defaultTaskGroups.flatMap(group => group.tasks), ...customTasks];
    
    const groupedTasks = {
      redline: allTasks.filter(task => task.status === 'redline'),
      progress: allTasks.filter(task => task.status === 'progress'),
      completed: allTasks.filter(task => task.status === 'completed')
    };

    const taskGroups = [];

    if (groupedTasks.redline.length > 0) {
      taskGroups.push({
        title: "TASK/ REDLINE",
        count: groupedTasks.redline.length,
        color: "bg-red-500",
        status: "redline",
        tasks: groupedTasks.redline
      });
    }

    if (groupedTasks.progress.length > 0) {
      taskGroups.push({
        title: "PROGRESS/ UPDATE",
        count: groupedTasks.progress.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: groupedTasks.progress
      });
    }

    if (groupedTasks.completed.length > 0) {
      taskGroups.push({
        title: "COMPLETED",
        count: groupedTasks.completed.length,
        color: "bg-green-500",
        status: "completed",
        tasks: groupedTasks.completed
      });
    }

    return taskGroups;
  };

  const renderStatusIcon = (status: string) => {
    const baseClasses = "w-4 h-4 rounded-full border-2 flex items-center justify-center";
    
    switch (status) {
      case 'redline':
        return (
          <div className={`${baseClasses} border-red-500 bg-red-500`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        );
      case 'progress':
        return (
          <div className={`${baseClasses} border-blue-500 bg-blue-500`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        );
      case 'completed':
        return (
          <div className={`${baseClasses} border-green-500 bg-green-500`}>
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
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

  const handleCreateTask = (taskData: any) => {
    console.log('Creating task:', taskData);
    setCustomTasks(prev => [taskData, ...prev]);
  };

  const handleTaskClick = (task: any) => {
    navigate(`/task/${task.id}`);
  };

  const handleCloseTaskDetail = () => {
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
  };

  const taskGroups = getTaskGroups();

  return (
    <div className="flex-1 bg-background pl-2">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">Tasks</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">Agents</span>
                <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">2</span>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
              <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
              <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-b border-border px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-xs font-medium text-foreground">Overview</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">To Do</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">Calendar</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">Weekly Update</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">Board</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">Table</button>
              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Plus className="w-3 h-3" />
                View
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-700">
                <Search className="w-3 h-3" />
                Search
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-700">
                <Eye className="w-3 h-3" />
                Hide
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-700">
                <Settings className="w-3 h-3" />
                Customize
              </button>
              <button 
                onClick={() => setIsTaskDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
              >
                Add Task
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              Group: Status
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-700 text-xs">
              Subtasks
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-700 text-xs">
              Columns
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-700 text-xs">
                <Filter className="w-3 h-3" />
                Filter
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-700 text-xs">
                Closed
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-700 text-xs">
                Assignee
              </button>
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-7 pr-3 py-1 border border-border rounded text-xs w-48"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Task Groups */}
        <div className="p-4 space-y-4">
          {taskGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              {/* Group Header */}
              <div className="flex items-center gap-2 mb-2">
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
                <div className={`px-2 py-0.5 rounded text-white text-xs font-medium ${group.color}`}>
                  {group.title}
                </div>
              </div>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-muted-foreground font-medium text-xs py-2">Name</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs py-2">Date Created</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs py-2">Files</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs py-2">Assigned to</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs py-2">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.tasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-accent/50 group cursor-pointer" onClick={() => handleTaskClick(task)}>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          {renderStatusIcon(task.status)}
                          <div>
                            <div className="font-medium text-xs">{task.title}</div>
                            <div className="text-xs text-muted-foreground">{task.project}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2">
                        {task.dateCreated}
                      </TableCell>
                      <TableCell className="py-2">
                        {task.hasAttachment && (
                          <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center -space-x-1">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${task.assignee.avatar}`}>
                              {task.assignee.name}
                            </div>
                            {task.collaborators?.map((collaborator, index) => (
                              <div
                                key={index}
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background ${collaborator.avatar}`}
                              >
                                {collaborator.name}
                              </div>
                            ))}
                          </div>
                          <button 
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit action
                            }}
                          >
                            <Edit className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <button 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle more options
                          }}
                        >
                          <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Add Task Button */}
              <button 
                onClick={() => setIsTaskDialogOpen(true)}
                className="flex items-center gap-1 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3 h-3" />
                <span>Add task</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default TaskBoard;
