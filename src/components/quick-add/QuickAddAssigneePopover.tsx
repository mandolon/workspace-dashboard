
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Users, X } from 'lucide-react';
// REMOVE: import { getRandomColor } from '@/utils/taskUtils';
import { getInitials } from '@/utils/taskUtils';
import { getAvatarColor } from '@/utils/avatarColors';
import { TEAM_USERS } from '@/utils/teamUsers';

type QuickAddTaskPerson = {
  name: string;
  avatar: string;
  fullName?: string;
  avatarColor?: string;
};

interface QuickAddAssigneePopoverProps {
  assignee: QuickAddTaskPerson | null;
  setAssignee: (assignee: QuickAddTaskPerson | null) => void;
  showAssigneePopover: boolean;
  setShowAssigneePopover: (show: boolean) => void;
}

const availableAssignees: QuickAddTaskPerson[] = TEAM_USERS.map(member => ({
  name: member.name,
  avatar: member.avatar,
  fullName: member.fullName,
  avatarColor: member.avatar,
}));

const QuickAddAssigneePopover: React.FC<QuickAddAssigneePopoverProps> = ({
  assignee,
  setAssignee,
  showAssigneePopover,
  setShowAssigneePopover
}) => {
  return (
    <div className="relative z-10 flex items-center">
      <Popover open={showAssigneePopover} onOpenChange={setShowAssigneePopover}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={
              `flex items-center justify-center h-8 w-8 min-w-0 min-h-0 rounded-full text-xs text-muted-foreground hover:text-foreground border border-border bg-background transition-colors px-0 py-0`
            }
            type="button"
            aria-label={assignee ? `Assigned to ${assignee.fullName || assignee.name}` : "Assign user"}
            data-testid="assign-button"
          >
            {assignee ? (
              <>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(assignee)}`}
                >
                  {assignee.name}
                </div>
                <button
                  type="button"
                  className="absolute -top-1.5 -right-1 rounded-full bg-muted/90 text-xs text-destructive hover:bg-destructive hover:text-white px-1"
                  style={{ lineHeight: 1, fontSize: 13 }}
                  onClick={e => { e.stopPropagation(); setAssignee(null); }}
                  tabIndex={-1}
                  title="Clear assignee"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              // +/Users icon is nearly circular and SIZED slightly smaller than avatar
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-muted">
                <Users className="w-4 h-4 text-muted-foreground" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-1 w-44 bg-popover z-50 border border-border rounded shadow-xl">
          <div className="text-xs font-semibold pb-1 px-2 text-foreground">Assign to...</div>
          <div className="flex flex-col">
            {availableAssignees.map(person => (
              <button
                key={person.name}
                className="flex items-center gap-2 py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground text-xs text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); setAssignee(person); setShowAssigneePopover(false); }}
                type="button"
              >
                <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-medium ${getAvatarColor(person)}`}>
                  {person.name}
                </div>
                <span>{person.fullName || person.name}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default QuickAddAssigneePopover;

