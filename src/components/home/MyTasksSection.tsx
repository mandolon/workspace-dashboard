
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRealtimeTasks } from "@/hooks/useRealtimeTasks";
import { useUser } from "@/contexts/UserContext";
import { formatDate } from "@/utils/taskUtils";
import TaskStatusIcon from "@/components/TaskStatusIcon";

const MyTasksSection = () => {
  const { tasks, loading } = useRealtimeTasks();
  const { currentUser } = useUser();

  // Filter tasks assigned to current user
  const myTasks = tasks.filter(task => {
    if (!currentUser) return false;
    
    const myNames = [currentUser.name, (currentUser as any).fullName].filter(Boolean);
    return (
      // Match on assignee's name or fullName
      (task.assignee && (
        myNames.includes(task.assignee?.fullName) ||
        myNames.includes(task.assignee?.name)
      )) ||
      // Or if a collaborator matches
      (task.collaborators && task.collaborators.some(
        c => myNames.includes(c.fullName) || myNames.includes(c.name)
      ))
    );
  }).slice(0, 6); // Show only first 6 tasks

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Loading tasks...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {myTasks.length === 0 ? (
          <div className="text-sm text-muted-foreground">No tasks assigned</div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {myTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-b-0">
                <TaskStatusIcon status={task.status} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{task.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(task.dateCreated)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyTasksSection;
