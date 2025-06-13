
import React, { useState } from 'react';
import { X, Calendar, User, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { addTask, getNextTaskId } from '@/data/taskData';
import { getProjectDisplayName } from '@/data/projectClientData';

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (taskData: any) => void;
}

const TaskDialog = ({ isOpen, onClose, onCreateTask }: TaskDialogProps) => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  // Project mapping from display names to project IDs
  const projectMapping = {
    'piner-haus': 'piner-piner-haus-garage',
    'rathbun-cabin': 'rathbun-usfs-cabin', 
    'ogden-thew': 'ogden-thew-2709-t-street',
    'adams-40th': 'adams-1063-40th-street'
  };

  const handleCreateTask = () => {
    if (!taskName.trim()) {
      return;
    }

    // Map the selected project to the correct project ID
    const projectId = projectMapping[selectedProject as keyof typeof projectMapping] || selectedProject;

    const taskData = {
      title: taskName,
      projectId: projectId,
      project: getProjectDisplayName(projectId), // Add the missing project display name
      status: selectedStatus || 'progress',
      description: addDescription ? description : '',
      assignee: assignedTo ? {
        name: assignedTo,
        avatar: assignedTo === 'MH' ? 'bg-purple-500' : 
                assignedTo === 'AL' ? 'bg-gray-600' : 
                assignedTo === 'MP' ? 'bg-green-500' : 'bg-blue-500'
      } : null,
      dueDate: dueDate ? format(dueDate, 'MM/dd/yy') : '—',
      dateCreated: format(new Date(), 'MM/dd/yy'),
      estimatedCompletion: '—',
      hasAttachment: false,
      collaborators: []
    };
    
    // Use the centralized addTask function
    const newTask = addTask(taskData);
    onCreateTask(newTask);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTaskName('');
    setSelectedProject('');
    setSelectedStatus('');
    setAddDescription(false);
    setDescription('');
    setAssignedTo('');
    setDueDate(undefined);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl w-[900px] bg-background border border-border shadow-lg">
        <DialogHeader className="py-3">
          <DialogTitle className="text-base font-medium">
            Task - {getNextTaskId()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-2">
          {/* Project and Status Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="piner-haus">Piner Haus Garage</SelectItem>
                  <SelectItem value="rathbun-cabin">Rathbun - USFS Cabin</SelectItem>
                  <SelectItem value="ogden-thew">Ogden - Thew - 2709 T Street</SelectItem>
                  <SelectItem value="adams-40th">Adams - 1063 40th Street</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="redline">Task/Redline</SelectItem>
                  <SelectItem value="progress">Progress/Update</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Task Name */}
          <div>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name or type '/' for commands"
              className="h-8 text-sm"
            />
          </div>

          {/* Add Description Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="addDescription"
              checked={addDescription}
              onCheckedChange={(checked) => setAddDescription(checked as boolean)}
            />
            <Label htmlFor="addDescription" className="text-sm text-muted-foreground">Add description</Label>
          </div>

          {/* Description Field (if enabled) */}
          {addDescription && (
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
                className="w-full h-20 px-3 py-2 text-sm border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          )}

          {/* Bottom Row: Assignee, Due Date, and Additional Options */}
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
              onClick={handleCreateTask}
              disabled={!taskName.trim()}
              className="h-7 px-4 text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
