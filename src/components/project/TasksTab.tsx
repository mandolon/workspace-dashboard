
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, MoreHorizontal } from 'lucide-react';

interface TasksTabProps {
  projectName: string;
}

const TasksTab = ({ projectName }: TasksTabProps) => {
  const navigate = useNavigate();

  // Flatten all tasks from groups into a single array
  const allTasks = [
    {
      id: 1,
      title: "Planning set finalized, set up CD's",
      dateCreated: "Jan 12, 2023",
      dueDate: "June 15",
      assignee: { name: "MP", avatar: "bg-blue-500" },
      hasAttachment: true,
      status: "redline"
    },
    {
      id: 2,
      title: "Update - 12.27.23",
      dateCreated: "Jan 12, 2023",
      dueDate: "June 15",
      assignee: { name: "MP", avatar: "bg-blue-500" },
      hasAttachment: true,
      status: "progress"
    },
    {
      id: 3,
      title: "Update 12.9.23",
      dateCreated: "Jan 12, 2023",
      dueDate: "June 15",
      assignee: { name: "MP", avatar: "bg-blue-500" },
      hasAttachment: true,
      status: "progress"
    },
    {
      id: 4,
      title: "Alternate Cabin Design",
      dateCreated: "Jan 12, 2023",
      dueDate: "June 15",
      assignee: { name: "MP", avatar: "bg-green-500" },
      hasAttachment: true,
      status: "completed"
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
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20" strokeWidth="2">
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
      <div className="space-y-0.5">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Date Created</div>
          <div className="col-span-3">Assigned to</div>
        </div>
        
        {/* Task Rows */}
        {allTasks.map((task) => (
          <div 
            key={task.id} 
            className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group"
            onClick={() => handleTaskClick(task)}
          >
            <div className="col-span-6 flex items-center gap-2">
              {renderStatusIcon(task.status)}
              <span className="text-blue-600 hover:underline truncate">{task.title}</span>
            </div>
            <div className="col-span-3 text-muted-foreground">{task.dateCreated}</div>
            <div className="col-span-3 flex items-center justify-between">
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
                <Edit className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksTab;
