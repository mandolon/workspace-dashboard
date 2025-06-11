
import React, { useState } from 'react';
import { X, Calendar, User, Paperclip } from 'lucide-react';
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
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [hasButton, setHasButton] = useState(false);

  const handleCreateTask = () => {
    const taskData = {
      taskName,
      selectedProject,
      selectedStatus,
      addDescription,
      assignedTo,
      dueDate,
      hasButton,
    };
    onCreateTask(taskData);
    onClose();
    // Reset form
    setTaskName('');
    setSelectedProject('');
    setSelectedStatus('');
    setAddDescription(false);
    setAssignedTo('');
    setDueDate('');
    setHasButton(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[900px] bg-background border border-border shadow-lg">
        <DialogHeader className="py-3">
          <DialogTitle className="text-base font-medium">Task</DialogTitle>
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

          {/* Bottom Row: Assignee, Due Date, and Additional Options */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger className="w-28 h-7 text-xs">
                  <User className="w-3 h-3 mr-1" />
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mh">MH</SelectItem>
                  <SelectItem value="al">AL</SelectItem>
                  <SelectItem value="mp">MP</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-32 h-7 text-xs pl-7"
                  placeholder="Due date"
                />
                <Calendar className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>

              <button className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                <Paperclip className="w-3 h-3" />
                <span>1</span>
              </button>
            </div>

            <Button 
              onClick={handleCreateTask}
              className="h-7 px-4 text-xs bg-blue-600 hover:bg-blue-700 text-white"
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
