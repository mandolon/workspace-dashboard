
import React from 'react';
import { Calendar, User, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface TaskDialogActionsProps {
  assignedTo: string;
  setAssignedTo: (value: string) => void;
  dueDate: Date | undefined;
  setDueDate: (date: Date | undefined) => void;
  taskName: string;
  onCreateTask: () => void;
}

const TaskDialogActions = ({
  assignedTo,
  setAssignedTo,
  dueDate,
  setDueDate,
  taskName,
  onCreateTask
}: TaskDialogActionsProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Select value={assignedTo} onValueChange={setAssignedTo}>
          <SelectTrigger className="w-28 h-7 text-xs">
            <User className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MH">MH</SelectItem>
            <SelectItem value="AL">AL</SelectItem>
            <SelectItem value="MP">MP</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-32 h-7 text-xs pl-7 justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              <Calendar className="w-3 h-3 absolute left-2" />
              {dueDate ? format(dueDate, "PPP") : "Due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <button className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
          <Paperclip className="w-3 h-3" />
          <span>0</span>
        </button>
      </div>

      <Button 
        onClick={onCreateTask}
        disabled={!taskName.trim()}
        className="h-7 px-4 text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
      >
        Create Task
      </Button>
    </div>
  );
};

export default TaskDialogActions;
