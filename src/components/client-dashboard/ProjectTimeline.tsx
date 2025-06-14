
import React from "react";
const phases = [
  { label: "Concept", complete: true },
  { label: "Design", complete: true },
  { label: "Construction Docs", complete: false },
  { label: "Permitting", complete: false },
  { label: "Construction", complete: false }
];

const ProjectTimeline: React.FC = () => (
  <div className="my-2">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {phases.map((phase, idx) => (
        <div key={phase.label} className="flex items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${phase.complete ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
            {idx + 1}
          </div>
          <div className="ml-2 text-xs font-medium">{phase.label}</div>
          {idx < phases.length - 1 && (
            <div className="w-7 h-1 bg-gray-200 mx-1 rounded" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProjectTimeline;
