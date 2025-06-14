
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectHero from "@/components/client-dashboard/ProjectHero";
import ProjectTimeline from "@/components/client-dashboard/ProjectTimeline";
import ActivityFeed from "@/components/client-dashboard/ActivityFeed";
import DocumentsGallery from "@/components/client-dashboard/DocumentsGallery";
import ProjectTeam from "@/components/client-dashboard/ProjectTeam";
import QuickActions from "@/components/client-dashboard/QuickActions";
import ProjectHealth from "@/components/client-dashboard/ProjectHealth";

/**
 * Tweaked layout for better responsiveness & visual clarity.
 */
const activeProject = {
  name: "Adams - 1063 40th Street",
  address: "1063 40th Street, Sacramento, CA",
  status: "Design Development",
  imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
};

const ClientDashboard = () => {
  return (
    <AppLayout>
      <div className="w-full max-w-5xl mx-auto py-6 px-2 sm:px-4">
        <div className="space-y-6">
          {/* Project Hero */}
          <ProjectHero
            imageUrl={activeProject.imageUrl}
            address={activeProject.address}
            projectName={activeProject.name}
            status={activeProject.status}
          />

          {/* Project Health */}
          <ProjectHealth />

          {/* Two-column grid below Project Health */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-2">
            <div className="space-y-6 lg:col-span-2">
              {/* Activity Feed */}
              <ActivityFeed />
              {/* Project Timeline */}
              <ProjectTimeline />
            </div>
            <div className="space-y-6">
              {/* QuickActions (Schedule Meeting, etc.) */}
              <QuickActions />
              {/* Team Information */}
              <ProjectTeam />
            </div>
          </div>

          {/* Documents Gallery as full width below the grid */}
          <DocumentsGallery />
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientDashboard;

