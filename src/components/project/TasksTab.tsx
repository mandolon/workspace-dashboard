
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Plus, Edit, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TasksTabProps {
  projectName: string;
}

const TasksTab = ({ projectName }: TasksTabProps) => {
  const navigate = useNavigate();

  const taskGroups = [
    {
      title: "TASK/ REDLINE",
      count: 1,
      color: "bg-red-500",
      tasks: [
        {
          id: 1,
          title: "Planning set finalized, set up CD's",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-blue-500" },
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
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-blue-500" },
          hasAttachment: true,
          status: "progress"
        },
        {
          id: 3,
          title: "Update 12.9.23",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-blue-500" },
          hasAttachment: true,
          status: "progress"
        },
        {
          id: 4,
          title: "Alternate Cabin Design",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-green-500" },
          hasAttachment: true,
          status: "completed"
        }
      ]
    }
  ];

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

  const handleTaskClick = (task: any) => {
    navigate(`/task/${task.id}`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 mt-0">
      <div className="space-y-4">
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
            <button className="flex items-center gap-1 px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
              <Plus className="w-3 h-3" />
              <span>Add task</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksTab;
