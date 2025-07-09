import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ClientProjectSettings = () => {
  return (
    <div className="p-4 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Details */}
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Project Details</h3>
          </div>
          
          <div>
            <Label htmlFor="projectName" className="text-xs">Project Name</Label>
            <Input id="projectName" defaultValue="Adams - 1063 40th Street" className="h-8 text-sm" />
          </div>
          
          <div>
            <Label htmlFor="projectId" className="text-xs">Project ID</Label>
            <Input id="projectId" defaultValue="adams-1063-40th-street" className="h-8 text-sm" />
          </div>
          
          <div>
            <Label htmlFor="projectType" className="text-xs">Project Type</Label>
            <Select defaultValue="renovation">
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="renovation">Renovation</SelectItem>
                <SelectItem value="construction">New Construction</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status" className="text-xs">Status</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                In Progress
              </Badge>
              <Select defaultValue="in-progress">
                <SelectTrigger className="h-8 text-sm flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Timeline & Budget */}
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Timeline & Budget</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="startDate" className="text-xs">Start Date</Label>
              <Input id="startDate" type="date" defaultValue="2024-01-01" className="h-8 text-sm" />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-xs">End Date</Label>
              <Input id="endDate" type="date" defaultValue="2024-03-31" className="h-8 text-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="budget" className="text-xs">Total Budget</Label>
              <Input id="budget" defaultValue="$75,000" className="h-8 text-sm" />
            </div>
            <div>
              <Label htmlFor="spent" className="text-xs">Amount Spent</Label>
              <Input id="spent" defaultValue="$27,450" className="h-8 text-sm" />
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <Label className="text-xs">Budget Progress</Label>
            <div className="mt-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>36.6% used</span>
                <span>$47,550 remaining</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '36.6%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Team Assignment */}
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Team Assignment</h3>
          </div>
          
          <div>
            <Label htmlFor="projectManager" className="text-xs">Project Manager</Label>
            <Select defaultValue="john-smith">
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="john-smith">John Smith</SelectItem>
                <SelectItem value="sarah-davis">Sarah Davis</SelectItem>
                <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="contractor" className="text-xs">Lead Contractor</Label>
            <Select defaultValue="mike-johnson">
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                <SelectItem value="tom-wilson">Tom Wilson</SelectItem>
                <SelectItem value="lisa-brown">Lisa Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="architect" className="text-xs">Architect</Label>
            <Select defaultValue="sarah-davis">
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="sarah-davis">Sarah Davis</SelectItem>
                <SelectItem value="robert-clark">Robert Clark</SelectItem>
                <SelectItem value="jennifer-taylor">Jennifer Taylor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Project Description</h3>
          </div>
          
          <Textarea 
            placeholder="Detailed project description..."
            className="min-h-24 text-sm"
            defaultValue="Complete kitchen renovation including new cabinetry, countertops, appliances, and flooring. Modern design with open concept layout connecting to living area. High-end finishes with quartz countertops and stainless steel appliances."
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-6 gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save Changes</Button>
      </div>
    </div>
  );
};

export default ClientProjectSettings;