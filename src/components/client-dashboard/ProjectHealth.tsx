
import React from "react";

const ProjectHealth: React.FC = () => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-600">60%</div>
      <div className="text-xs text-muted-foreground">Progress</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-green-600">$105k</div>
      <div className="text-xs text-muted-foreground">Budget Remaining</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-yellow-500">Aug 15</div>
      <div className="text-xs text-muted-foreground">Next Milestone</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-rose-600">2</div>
      <div className="text-xs text-muted-foreground">Actions Needed</div>
    </div>
  </div>
);

export default ProjectHealth;
