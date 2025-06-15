
import React, { useState } from 'react';
import { getInitials } from '@/utils/taskUtils';
import { X, Plus } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TEAM_USERS } from "@/utils/teamUsers";
import { getCRMUser } from '@/utils/taskUserCRM';

interface TaskRowAssigneesProps {
  task: any;
  onRemoveAssignee: (taskId: string, e: React.MouseEvent) => void;
  onRemoveCollaborator: (taskId: string, collaboratorIndex: number, e: React.MouseEvent) => void;
  onAssignPerson: (taskId: string, person: { name: string; avatar: string; fullName?: string; initials?: string }) => void;
  onAddCollaborator: (taskId: string, person: { name: string; avatar: string; fullName?: string; initials?: string }) => void;
}

const TaskRowAssignees = ({
  task,
  onRemoveAssignee,
  onRemoveCollaborator,
  onAssignPerson,
  onAddCollaborator,
}: TaskRowAssigneesProps) => {
  const [open, setOpen] = useState(false);

  // Canonical users, with custom colors if present
  const assignee = getCRMUser(task.assignee);
  const collaborators = (task.collaborators || []).map(getCRMUser);

  // Only TEAM members in availablePeople
  const assignedIds = [
    ...(assignee ? [assignee.name] : []),
    ...(collaborators?.map((c: any) => c?.name) || [])
  ];
  const availablePeople = TEAM_USERS
    .filter(u => u.crmRole === 'Team')
    .filter(u => !assignedIds.includes(u.name));

  // always build a proper TaskUser with initials for any assignment
  const buildTaskUser = (person: any) => {
    return {
      name: person.name,
      fullName: person.fullName,
      avatar: person.avatar ?? person.avatarUrl ?? '',
      initials: person.initials || getInitials(person.fullName || person.name || ''),
    };
  };

  const handleAdd = (person: any) => {
    const properUser = buildTaskUser(person);
    try {
      if (!assignee) {
        onAssignPerson(task.taskId, properUser);
      } else {
        onAddCollaborator(task.taskId, properUser);
      }
    } catch (err) {
      // Display error in UI if possible (if using shadcn/ui toast)
      if (window && "toast" in window) {
        (window as any).toast &&
          (window as any).toast({
            title: "Failed to assign user",
            description: err instanceof Error ? err.message : String(err),
            variant: "destructive",
          });
      }
      // Also log error
      console.error("Assignment error", err);
    }
    setOpen(false);
  };

  const avatarColor = (person: any) => person?.avatarColor || "bg-blue-500";

  return (
    <div className="flex items-center -space-x-1 relative">
      {assignee && (
        <div className="relative group" title={assignee.fullName || assignee.name}>
          <div
            className={`${avatarColor(assignee)} w-7 h-7 rounded-full text-white font-semibold flex items-center justify-center border-2 border-background`}
          >
            {getInitials(assignee.fullName ?? assignee.name)}
          </div>
          <button
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-border p-0 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            style={{lineHeight: 1}}
            onClick={e => { e.stopPropagation(); onRemoveAssignee(task.taskId, e); }}
            title="Remove assignee"
            tabIndex={-1}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {collaborators?.map((collaborator: any, idx: number) => collaborator && (
        <div className="relative group" key={idx} title={collaborator.fullName || collaborator.name}>
          <div
            className={`${avatarColor(collaborator)} w-7 h-7 rounded-full text-white font-semibold flex items-center justify-center border-2 border-background`}
          >
            {getInitials(collaborator.fullName ?? collaborator.name)}
          </div>
          <button
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-border p-0 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            style={{lineHeight: 1}}
            onClick={e => { e.stopPropagation(); onRemoveCollaborator(task.taskId, idx, e); }}
            title="Remove collaborator"
            tabIndex={-1}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Add person"
            className="ml-2 w-[26px] h-[26px] rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground hover:border-foreground transition text-muted-foreground hover:text-foreground bg-white dark:bg-background"
            onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
            tabIndex={0}
          >
            <Plus className="w-[18px] h-[18px]" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-1 w-40 bg-popover z-50 border border-border rounded shadow-xl">
          <div className="text-xs font-semibold pb-1 px-2 text-foreground">Add person</div>
          <div className="flex flex-col">
            {availablePeople.length > 0 ? (
              availablePeople.map(person => {
                const personWithColor = getCRMUser(person) || person;
                return (
                <button
                  key={person.name}
                  className="flex items-center gap-2 py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground text-xs text-foreground transition-colors"
                  onClick={(e) => { e.stopPropagation(); handleAdd(personWithColor); }}
                  type="button"
                >
                  <div className={`w-5 h-5 rounded-full text-white font-semibold flex items-center justify-center ${avatarColor(personWithColor)}`}>
                    {getInitials(personWithColor.fullName || personWithColor.name)}
                  </div>
                  <span>{personWithColor.fullName || personWithColor.name}</span>
                </button>
                )
              })
            ) : (
              <div className="text-xs text-muted-foreground px-2 py-1">Everyone assigned</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskRowAssignees;

