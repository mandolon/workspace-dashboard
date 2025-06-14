import React, { useState } from "react";
import { CheckCircle, Circle, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// New minimalist timeline indicator colors
const STATUS_COLORS = {
  complete: "bg-green-500 border-green-500",
  current: "bg-blue-500 border-blue-500",
  upcoming: "bg-gray-300 border-gray-300",
};

const TEXT_COLORS = {
  complete: "text-green-700 dark:text-green-400",
  current: "text-blue-700 dark:text-blue-400",
  upcoming: "text-gray-500 dark:text-gray-400",
};

const projectPhases = [
  {
    id: "phase-1",
    title: "Measurements & Documentation",
    complete: true,
    milestones: [
      { id: "m1", name: "Initial site visit and measurements", complete: true },
      { id: "m2", name: "Photo documentation", complete: true },
      { id: "m3", name: "Existing conditions report", complete: true },
    ],
  },
  {
    id: "phase-2",
    title: "Architectural Drawings",
    complete: true,
    milestones: [
      { id: "m1", name: "Conceptual design sketches", complete: true },
      { id: "m2", name: "Detailed floor plans", complete: true },
      { id: "m3", name: "3D renderings & elevations", complete: true },
    ],
  },
  {
    id: "phase-3",
    title: "Planning (if required) and Building Review",
    complete: false,
    milestones: [
      { id: "m1", name: "City planning department consultation", complete: true },
      { id: "m2", name: "Building code review", complete: false },
      { id: "m3", name: "Structural engineering review", complete: false },
    ],
  },
  {
    id: "phase-4",
    title: "Permit and Approvals",
    complete: false,
    milestones: [
      { id: "m1", name: "Submit permit application", complete: false },
      { id: "m2", name: "City review period", complete: false },
      { id: "m3", name: "Final permit approval", complete: false },
    ],
  }
];

// Minimal Timeline Milestone
const MilestoneTimelineItem: React.FC<{
  milestone: { name: string; complete: boolean };
  isLast: boolean;
}> = ({ milestone, isLast }) => {
  const color = milestone.complete ? STATUS_COLORS.complete : STATUS_COLORS.upcoming;
  const text = milestone.complete ? TEXT_COLORS.complete : TEXT_COLORS.upcoming;
  return (
    <div className="flex items-start relative pl-7 pb-2 last:pb-0 group">
      <span
        className={cn(
          "absolute left-1 top-1 w-3 h-3 border-2 rounded-full",
          color
        )}
        aria-hidden="true"
      />
      {!isLast && (
        <span className="absolute left-[7.5px] top-4 w-px h-4 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
      )}
      <span className={cn("text-xs sm:text-sm", text, "pl-1")}>
        {milestone.complete ? (
          <span className="mr-1 inline-block align-middle"><CheckCircle className="w-3 h-3 inline text-green-500" /></span>
        ) : (
          <span className="mr-1 inline-block align-middle"><Circle className="w-3 h-3 inline text-gray-400" /></span>
        )}
        {milestone.name}
      </span>
    </div>
  );
};

// Minimal Timeline Phase
const PhaseTimelineItem: React.FC<{
  phase: typeof projectPhases[number];
  isLast: boolean;
  defaultOpen?: boolean;
}> = ({ phase, isLast, defaultOpen }) => {
  // In progress if any milestone complete but not all
  const completedCount = phase.milestones.filter(m => m.complete).length;
  const isCurrent = completedCount > 0 && !phase.complete;
  const dotColor = phase.complete
    ? STATUS_COLORS.complete
    : isCurrent
    ? STATUS_COLORS.current
    : STATUS_COLORS.upcoming;

  const textColor = phase.complete
    ? TEXT_COLORS.complete
    : isCurrent
    ? TEXT_COLORS.current
    : TEXT_COLORS.upcoming;

  const statusText = phase.complete
    ? "Complete"
    : isCurrent
    ? `${completedCount} of ${phase.milestones.length} complete`
    : "Not started";

  const [open, setOpen] = useState(defaultOpen || isCurrent);

  return (
    <div className="relative flex gap-4">
      {/* Main vertical timeline dot/line */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "w-4 h-4 rounded-full border-2",
            dotColor,
            open ? "" : "opacity-80"
          )}
          aria-label={statusText}
        />
        {!isLast && (
          <span
            className="w-px flex-1 bg-gray-200 dark:bg-gray-700"
            style={{ minHeight: '32px' }}
            aria-hidden="true"
          />
        )}
      </div>
      {/* Phase Content */}
      <div className="flex-1 pb-5">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className={cn(
            "flex items-center gap-2 py-1 group bg-transparent text-left w-full",
            open ? "" : "opacity-80"
          )}
          aria-expanded={open}
        >
          {open ? (
            <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <span className={cn("font-medium text-sm sm:text-base", textColor)}>
            {phase.title}
          </span>
          <span className="ml-2 text-xs text-gray-400 hidden sm:inline">
            {statusText}
          </span>
        </button>
        {open && (
          <div className="mt-2 pl-1">
            {phase.milestones.map((milestone, idx) => (
              <MilestoneTimelineItem
                key={milestone.id}
                milestone={milestone}
                isLast={idx === phase.milestones.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectTimeline: React.FC = () => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle className="text-lg">Project Timeline</CardTitle>
      <CardDescription className="text-xs">
        Current and past project milestones
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-0 pl-3 border-l border-gray-200 dark:border-gray-700">
      {projectPhases.map((phase, idx) => (
        <PhaseTimelineItem
          key={phase.id}
          phase={phase}
          isLast={idx === projectPhases.length - 1}
          defaultOpen={idx === 0}
        />
      ))}
    </CardContent>
  </Card>
);

export default ProjectTimeline;
