
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTasksWithProjectNames } from "@/data/taskData";

const OpenTasksSummaryCard = () => {
  // Open = "not completed" and not deleted or archived
  const tasks = getTasksWithProjectNames();
  const openTasksCount = tasks.filter(
    (task) =>
      task.status !== "completed" &&
      !task.archived &&
      !task.deletedAt
  ).length;

  return (
    <Card className="border border-blue-400 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-blue-800">
          Open Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-blue-900">{openTasksCount}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {openTasksCount === 1 ? "Task is open" : "Tasks are open"}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTasksSummaryCard;
