
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
      <DialogContent className="sm:max-w-md bg-background border border-border shadow-lg">
        <DialogHeader className="py-6">
          <DialogTitle className="text-lg font-semibold">Task</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-8">
          {/* Project and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-full">
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
            
            <div className="space-y-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
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
          <div className="space-y-2">
            <Label htmlFor="taskName" className="text-sm font-medium">Task Name</Label>
            <Input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full"
            />
          </div>

          {/* Add Description Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="addDescription"
              checked={addDescription}
              onCheckedChange={(checked) => setAddDescription(checked as boolean)}
            />
            <Label htmlFor="addDescription" className="text-sm">Add description</Label>
          </div>

          {/* Assigned to, Due Date, and Button Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Assigned to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mh">MH</SelectItem>
                  <SelectItem value="al">AL</SelectItem>
                  <SelectItem value="mp">MP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasButton"
                  checked={hasButton}
                  onCheckedChange={(checked) => setHasButton(checked as boolean)}
                />
                <Label htmlFor="hasButton" className="text-sm">Button</Label>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attachments</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Paperclip className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop your files here to{' '}
                <button className="text-blue-600 hover:underline">upload</button>
              </p>
            </div>
          </div>
        </div>

        {/* Create Task Button */}
        <div className="flex justify-end pt-6 pb-6">
          <Button 
            onClick={handleCreateTask}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
