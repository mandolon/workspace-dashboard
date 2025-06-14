
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

// Remove all color usage, except system text-muted-foreground.
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

// Minimal, compact milestone item (no colors)
const MilestoneTimelineItem: React.FC<{
  milestone: { name: string; complete: boolean };
  isLast: boolean;
}> = ({ milestone, isLast }) => (
  <div className="flex items-center relative pl-4 pb-0.5 last:pb-0 group">
    <span className="absolute left-0 top-1">
      {milestone.complete ? (
        <CheckCircle className="w-3 h-3 text-muted-foreground" aria-label="Complete" />
      ) : (
        <Circle className="w-3 h-3 text-muted-foreground" aria-label="Incomplete" />
      )}
    </span>
    <span className={cn("text-xs ml-5", milestone.complete ? "text-foreground" : "text-muted-foreground")}>
      {milestone.name}
    </span>
    {!isLast && (
      <span
        className="absolute left-[6px] top-4 w-px h-3 bg-muted"
        aria-hidden="true"
      />
    )}
  </div>
);

// Compact, colorless phase/timeline section
const PhaseTimelineItem: React.FC<{
  phase: typeof projectPhases[number];
  isLast: boolean;
  defaultOpen?: boolean;
}> = ({ phase, isLast, defaultOpen }) => {
  const completedCount = phase.milestones.filter(m => m.complete).length;
  const isCurrent = completedCount > 0 && !phase.complete;

  const statusText = phase.complete
    ? "Complete"
    : isCurrent
      ? `${completedCount} of ${phase.milestones.length} done`
      : "Not started";

  const [open, setOpen] = useState(defaultOpen || isCurrent);

  return (
    <div className={cn("relative flex gap-3", !isLast && "mb-2")}>
      {/* Vertical line and chevron */}
      <div className="flex flex-col items-center min-w-[16px]">
        <button
          type="button"
          aria-label={open ? "Collapse phase" : "Expand phase"}
          onClick={() => setOpen(o => !o)}
          className="bg-transparent border-none outline-none cursor-pointer p-0"
        >
          {open ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {!isLast && (
          <span className="w-px flex-1 bg-muted" style={{ minHeight: '20px' }} />
        )}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0 pb-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">{phase.title}</span>
          <span className="text-xs text-muted-foreground">{statusText}</span>
        </div>
        {open && (
          <div className="mt-1 space-y-0.5">
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
    <CardHeader className="pb-2 pt-4 px-4">
      <CardTitle className="text-base font-semibold">Project Timeline</CardTitle>
      <CardDescription className="text-xs text-muted-foreground">
        Current and past project milestones
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-0 px-4 pb-2">
      <div className="border-l border-muted pl-2">
        {projectPhases.map((phase, idx) => (
          <PhaseTimelineItem
            key={phase.id}
            phase={phase}
            isLast={idx === projectPhases.length - 1}
            defaultOpen={idx === 0}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ProjectTimeline;
