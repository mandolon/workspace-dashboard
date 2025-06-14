
import React from "react";
import AppLayout from "@/components/layout/AppLayout";

const activeProject = {
  name: "Adams - 1063 40th Street",
  status: "In Progress",
  manager: "Armando Lopez",
  lastUpdate: "June 10, 2025",
};

const ClientDashboard = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome back!</h1>
        <div className="bg-accent/40 rounded border border-border p-6 mb-8 shadow-sm">
          <div className="mb-2">
            <span className="text-lg font-semibold">Active Project</span>
          </div>
          <div className="text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">Project Name: </span>
              <span className="font-medium">{activeProject.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status: </span>
              <span className="font-medium">{activeProject.status}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Project Manager: </span>
              <span className="font-medium">{activeProject.manager}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated: </span>
              <span className="font-medium">{activeProject.lastUpdate}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">What can you do?</div>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>See project details and status updates</li>
            <li>Contact your project manager</li>
            <li>Download your invoice when available</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientDashboard;
