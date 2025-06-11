
import React, { useState } from 'react';
import { ArrowLeft, Bell, Upload, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskDetailProps {
  task: {
    id: string;
    name: string;
    project: string;
    status: string;
    assignedTo?: string;
    createdBy?: string;
    dateCreated?: string;
    dueDate?: string;
    markComplete?: string;
  };
  onBack: () => void;
}

const TaskDetail = ({ task, onBack }: TaskDetailProps) => {
  const [hasDescription, setHasDescription] = useState(false);

  const attachments = [
    {
      name: "CDO-0063-Planning-Entitlement-Application",
      dateCreated: "Jul 31, 2024",
      createdBy: "Matthew P."
    },
    {
      name: "CDO-0220-Owner-Builder-F...",
      dateCreated: "Aug 17, 2024",
      createdBy: "Armando L."
    },
    {
      name: "Agent-for-Owner-Authorizat...",
      dateCreated: "Aug 11, 2024",
      createdBy: "Armando L."
    },
    {
      name: "James Hall",
      dateCreated: "Aug 2, 2024",
      createdBy: "Matthew P."
    },
    {
      name: "Corina McCoy",
      dateCreated: "Jul 23, 2024",
      createdBy: "Matthew P."
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center px-4 gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{task.project}</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-muted-foreground">{task.project}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <select className="bg-red-600 text-white px-3 py-1 rounded text-xs border-0">
            <option>REDLINE / TO DO</option>
          </select>
          <button className="p-2 hover:bg-accent rounded-md transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {/* Task Header */}
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-1">{task.project}</div>
              <h1 className="text-2xl font-bold">{task.name}</h1>
            </div>

            {/* Add Description */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="addDescription"
                checked={hasDescription}
                onCheckedChange={(checked) => setHasDescription(checked as boolean)}
              />
              <label htmlFor="addDescription" className="text-sm text-muted-foreground">Add description</label>
            </div>

            {/* Task Details Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-20">Created by</span>
                  <select className="bg-background border border-border rounded px-2 py-1 text-sm">
                    <option>Select User</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-20">Assigned to</span>
                  <select className="bg-background border border-border rounded px-2 py-1 text-sm">
                    <option>Select User</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-24">Date Created</span>
                  <input 
                    type="date"
                    className="bg-background border border-border rounded px-2 py-1 text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-24">Mark Complete</span>
                  <input 
                    type="date"
                    className="bg-background border border-border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Attachments</h2>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drop your files here to upload</p>
              </div>

              {/* Attachments List */}
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Name</span>
                  <span>Date Created</span>
                  <span>by</span>
                  <span></span>
                </div>
                
                {attachments.map((attachment, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 text-sm py-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-red-500" />
                      <span className="text-blue-600 hover:underline cursor-pointer">{attachment.name}</span>
                    </div>
                    <span className="text-muted-foreground">{attachment.dateCreated}</span>
                    <span className="text-muted-foreground">{attachment.createdBy}</span>
                    <span className="text-muted-foreground">...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="w-80 border-l border-border p-4">
          <h3 className="font-semibold mb-4">Activity</h3>
          
          <div className="space-y-4">
            <div className="text-sm">
              <div className="font-medium mb-1">Kenneth A.</div>
              <div className="text-muted-foreground text-xs mb-2">
                The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.
              </div>
            </div>

            <div className="text-sm">
              <div className="font-medium mb-1">You</div>
              <div className="text-muted-foreground text-xs mb-2">
                The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Matthew moved task to REDLINE / TO DO
            </div>

            <div className="text-xs text-muted-foreground">
              Armando uploaded CDO-0063-Planning-Entitlement
            </div>
          </div>

          {/* Message Input */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Type your message" 
                className="flex-1 h-8 text-sm"
              />
              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <Button size="sm" className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
