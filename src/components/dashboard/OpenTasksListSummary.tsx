
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTasksWithProjectNames } from "@/data/taskData";

const OpenTasksListSummary = () => {
  const tasks = getTasksWithProjectNames();
  const openTasks = tasks.filter(
    (task) =>
      task.status !== "completed" &&
      !task.archived &&
      !task.deletedAt
  );

  return (
    <Card className="border border-blue-200 bg-blue-25">
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-xs font-semibold text-blue-700">
          Open Task List
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        {openTasks.length === 0 ? (
          <div className="text-muted-foreground text-xs">No open tasks</div>
        ) : (
          <ul className="space-y-1">
            {openTasks.map((task) => (
              <li
                key={task.taskId}
                className="text-xs text-blue-700 truncate px-1 py-0.5 rounded hover:bg-blue-100 transition-colors"
                title={task.title}
              >
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default OpenTasksListSummary;
