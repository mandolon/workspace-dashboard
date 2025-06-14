
import React from "react";

interface ProjectHeroProps {
  imageUrl: string; // kept for prop compatibility, but not used
  address: string;
  projectName: string;
  status: string;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ address, projectName, status }) => (
  <div className="w-full rounded-lg bg-card shadow-md p-5 mb-2">
    <h2 className="text-2xl font-bold text-primary mb-1">{projectName}</h2>
    <div className="text-base text-muted-foreground">{address}</div>
    <div className="mt-2">
      <span className="inline-block py-1 px-3 bg-blue-600 text-white text-xs font-medium rounded">
        {status}
      </span>
    </div>
  </div>
);

export default ProjectHero;
