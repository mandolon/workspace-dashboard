
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectHero from "@/components/client-dashboard/ProjectHero";
import ProjectTimeline from "@/components/client-dashboard/ProjectTimeline";
import ActivityFeed from "@/components/client-dashboard/ActivityFeed";
import DocumentsGallery from "@/components/client-dashboard/DocumentsGallery";
import ProjectTeam from "@/components/client-dashboard/ProjectTeam";
import QuickActions from "@/components/client-dashboard/QuickActions";
import ProjectHealth from "@/components/client-dashboard/ProjectHealth";

const activeProject = {
  name: "Adams - 1063 40th Street",
  address: "1063 40th Street, Sacramento, CA",
  status: "Design Development",
  imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" // prop kept for backward compatibility
};

const ClientDashboard = () => {
  return (
    <AppLayout>
      <div className="w-full max-w-5xl mx-auto py-6 px-2 sm:px-4">
        <div className="space-y-4">
          {/* Simple Text Project Hero */}
          <ProjectHero
            imageUrl={activeProject.imageUrl}
            address={activeProject.address}
            projectName={activeProject.name}
            status={activeProject.status}
          />

          {/* Project Stats */}
          <ProjectHealth />

          {/* Quick Actions */}
          <QuickActions />

          {/* Project Timeline */}
          <ProjectTimeline />

          {/* Lower Section: Activity feed & documents; team */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="md:col-span-2 space-y-6">
              <ActivityFeed />
              <DocumentsGallery />
            </div>
            <div className="md:col-span-1">
              <ProjectTeam />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientDashboard;
