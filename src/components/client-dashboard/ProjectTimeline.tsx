
import React, { useState } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronRight, Dot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- DATA STRUCTURE ---
// Each project can define its own phases + milestones array.
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

// --- SUBCOMPONENT: MilestoneItem ---
const MilestoneItem: React.FC<{ milestone: { name: string; complete: boolean } }> = ({ milestone }) => (
  <div className="flex items-center gap-2 py-1 pl-1">
    {milestone.complete ? (
      <CheckCircle className="w-4 h-4 text-green-500" aria-label="Completed" />
    ) : (
      <Circle className="w-4 h-4 text-gray-400" aria-label="Not completed" />
    )}
    <span className={cn("text-sm", milestone.complete ? "text-muted-foreground line-through" : "text-foreground")}>
      {milestone.name}
    </span>
  </div>
);

// --- SUBCOMPONENT: PhaseCard ---
const PhaseCard: React.FC<{
  phase: typeof projectPhases[number];
  defaultOpen?: boolean;
}> = ({ phase, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen || phase.complete); // Completed phases open by default

  // Progress = % milestones complete
  const completedCount = phase.milestones.filter(m => m.complete).length;
  const percentComplete = Math.round((completedCount / phase.milestones.length) * 100);

  return (
    <Card className={cn("mb-4 border-l-4", 
      phase.complete ? "border-green-500 bg-green-50 dark:bg-green-900/10"
      : completedCount > 0 ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
      : "border-gray-200 dark:bg-neutral-900/20"
    )}>
      <CardHeader className="flex flex-row items-center p-4 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-2 w-full">
          {/* Expand/collapse arrow */}
          {open 
            ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
            : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          {/* Phase completion icon */}
          {phase.complete ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : completedCount > 0 ? (
            <Dot className="w-5 h-5 text-blue-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
          <div>
            <CardTitle className="text-base font-semibold">{phase.title}</CardTitle>
            <div className="flex items-center gap-2 text-xs mt-0.5">
              <span>
                {phase.complete
                  ? "Complete"
                  : completedCount > 0
                    ? `${completedCount} of ${phase.milestones.length} milestones complete`
                    : "Not started"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      {open && (
        <CardContent className="py-2 pt-0 pl-4">
          <Progress className="mb-2" value={percentComplete} />
          <div>
            {phase.milestones.map(milestone => (
              <MilestoneItem key={milestone.name} milestone={milestone} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

// --- MAIN EXPORT: ProjectTimeline ---
const ProjectTimeline: React.FC = () => (
  <div className="w-full py-2 flex flex-col gap-2">
    <div className="mb-2">
      <h3 className="font-semibold text-base text-foreground mb-4">Project Timeline</h3>
    </div>
    {projectPhases.map((phase, idx) => (
      <PhaseCard
        key={phase.id}
        phase={phase}
        defaultOpen={idx === 0}
      />
    ))}
  </div>
);

export default ProjectTimeline;

