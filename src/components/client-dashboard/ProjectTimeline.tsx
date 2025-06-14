
import React from "react";

const phases = [
  { label: "Measurements and Documentation", complete: true },
  { label: "Architectural Drawings", complete: true },
  { label: "Planning (if required) and Building Review", complete: false },
  { label: "Permit and Approvals", complete: false }
];

/**
 * Project timeline with custom 4 phases.
 */
const ProjectTimeline: React.FC = () => (
  <div className="w-full max-w-full py-2 px-2">
    <div className="flex flex-row flex-wrap items-center gap-4">
      {phases.map((phase, idx) => (
        <div key={phase.label} className="flex items-center">
          {/* Circle */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
              phase.complete
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {idx + 1}
          </div>
          {/* Label */}
          <div className="ml-2 text-xs font-medium">{phase.label}</div>
          {/* Connector line -- show unless last */}
          {idx < phases.length - 1 && (
            <div className="w-6 h-1 bg-gray-200 mx-1 rounded" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProjectTimeline;
