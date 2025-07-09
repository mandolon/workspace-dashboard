import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, Users, Settings } from 'lucide-react';

const ClientProjectSettings = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" defaultValue="Adams - 1063 40th Street" />
            </div>
            
            <div>
              <Label htmlFor="projectId">Project ID</Label>
              <Input id="projectId" defaultValue="adams-1063-40th-street" />
            </div>
            
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Select defaultValue="renovation">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="construction">New Construction</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="in-progress">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Timeline & Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline & Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" defaultValue="2024-01-01" />
            </div>
            
            <div>
              <Label htmlFor="endDate">Expected End Date</Label>
              <Input id="endDate" type="date" defaultValue="2024-03-31" />
            </div>
            
            <div>
              <Label htmlFor="budget">Total Budget</Label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <Input id="budget" defaultValue="75,000" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="spent">Amount Spent</Label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <Input id="spent" defaultValue="27,450" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="projectManager">Project Manager</Label>
              <Select defaultValue="john-smith">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="sarah-davis">Sarah Davis</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="contractor">Lead Contractor</Label>
              <Select defaultValue="mike-johnson">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  <SelectItem value="tom-wilson">Tom Wilson</SelectItem>
                  <SelectItem value="lisa-brown">Lisa Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="architect">Architect</Label>
              <Select defaultValue="sarah-davis">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah-davis">Sarah Davis</SelectItem>
                  <SelectItem value="robert-clark">Robert Clark</SelectItem>
                  <SelectItem value="jennifer-taylor">Jennifer Taylor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Project Description */}
        <Card>
          <CardHeader>
            <CardTitle>Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Detailed project description..."
              className="min-h-32"
              defaultValue="Complete kitchen renovation including new cabinetry, countertops, appliances, and flooring. Modern design with open concept layout connecting to living area."
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mt-6 gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default ClientProjectSettings;