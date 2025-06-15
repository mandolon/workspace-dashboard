import React from "react";
import { useUser } from "@/contexts/UserContext";
import { useTaskBoard } from "@/hooks/useTaskBoard";

const statusColors = {
  live: "bg-green-500",
  connecting: "bg-yellow-400",
  polling: "bg-orange-400",
};
const statusLabels = {
  live: "Live sync",
  connecting: "Connecting...",
  polling: "Polling",
};

const TaskBoardHeader = () => {
  const { supabaseTasksLoading, connectionStatus } = useTaskBoard();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
      <h2 className="text-lg font-bold tracking-tight">Task Board</h2>
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition ${
            statusColors[connectionStatus as keyof typeof statusColors]
          } text-white`}
          title={
            connectionStatus === "live"
              ? "Instant task syncing"
              : connectionStatus === "polling"
                ? "Delayed polling sync"
                : "Connecting to live updates"
          }
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${statusColors[
              connectionStatus as keyof typeof statusColors
            ]}`}
          />
          {statusLabels[connectionStatus as keyof typeof statusLabels]}
        </span>
        {/* ... add any other header tools here ... */}
      </div>
    </div>
  );
};

export default TaskBoardHeader;
