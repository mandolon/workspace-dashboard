
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Paperclip } from "lucide-react";
import { formatDate, getInitials } from "@/utils/taskUtils";
import { getCRMUser } from "@/utils/taskUserCRM";
import { getAvatarColor } from "@/utils/avatarColors";
import { AVATAR_INITIALS_CLASSNAMES } from "@/utils/avatarStyles";
import TaskStatusIcon from "@/components/TaskStatusIcon";

const MyTasksSection = () => {
  // Hardcoded example tasks similar to task board
  const myTasks = [
    {
      id: 1,
      taskId: "T0023",
      title: "Review architectural drawings",
      status: "progress",
      hasAttachment: true,
      dateCreated: "2024-12-15",
      createdBy: "AL",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 2,
      taskId: "T0024", 
      title: "Update project timeline",
      status: "redline",
      hasAttachment: false,
      dateCreated: "2024-12-14",
      createdBy: "MP",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 3,
      taskId: "T0025",
      title: "Client meeting preparation",
      status: "completed",
      hasAttachment: true,
      dateCreated: "2024-12-13",
      createdBy: "ALD",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 4,
      taskId: "T0026",
      title: "Site inspection report",
      status: "progress",
      hasAttachment: false,
      dateCreated: "2024-12-12",
      createdBy: "JH",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 5,
      taskId: "T0027",
      title: "Submit permit applications",
      status: "progress",
      hasAttachment: true,
      dateCreated: "2024-12-11",
      createdBy: "AL",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 6,
      taskId: "T0028",
      title: "Review structural calculations",
      status: "redline",
      hasAttachment: false,
      dateCreated: "2024-12-10",
      createdBy: "MP",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 7,
      taskId: "T0029",
      title: "Coordinate with electrical contractor",
      status: "progress",
      hasAttachment: true,
      dateCreated: "2024-12-09",
      createdBy: "JH",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    },
    {
      id: 8,
      taskId: "T0030",
      title: "Finalize material specifications",
      status: "completed",
      hasAttachment: false,
      dateCreated: "2024-12-08",
      createdBy: "ALD",
      assignee: { name: "You", fullName: "Current User", avatar: "CU" }
    }
  ];

  const handleTaskStatusClick = (taskId: number) => {
    console.log('Task status clicked:', taskId);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-0">
          {/* Header */}
          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-1 border-b mb-1">
            <div className="col-span-5">Name</div>
            <div className="col-span-1 text-center">Files</div>
            <div className="col-span-3">Date Created</div>
            <div className="col-span-3">Created by</div>
          </div>
          
          {/* Task rows */}
          <div className="max-h-[240px] overflow-y-auto space-y-0">
            {myTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30 last:border-b-0">
                <div className="col-span-5 flex items-center gap-2">
                  <TaskStatusIcon 
                    status={task.status} 
                    onClick={() => handleTaskStatusClick(task.id)}
                  />
                  <span className="text-blue-600 hover:underline truncate cursor-pointer">
                    {task.taskId} - {task.title}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {task.hasAttachment && (
                    <Paperclip className="w-4 h-4 text-orange-600" strokeWidth={2} />
                  )}
                </div>
                <div className="col-span-3 text-muted-foreground flex items-center">
                  <span className="truncate max-w-[110px] text-xs text-muted-foreground block text-ellipsis">
                    {formatDate(task.dateCreated)}
                  </span>
                </div>
                <div className="col-span-3 text-muted-foreground flex items-center">
                  <span className="truncate max-w-[110px] text-xs text-muted-foreground block text-ellipsis">
                    {task.createdBy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTasksSection;
