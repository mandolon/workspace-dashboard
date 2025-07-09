import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientProjectSettings = () => {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Setting</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Project Name</TableCell>
            <TableCell>
              <Input defaultValue="Adams - 1063 40th Street" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Project ID</TableCell>
            <TableCell>
              <Input defaultValue="adams-1063-40th-street" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Project Type</TableCell>
            <TableCell>
              <Select defaultValue="renovation">
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="construction">New Construction</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  In Progress
                </Badge>
                <Select defaultValue="in-progress">
                  <SelectTrigger className="h-8 flex-1">
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
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Start Date</TableCell>
            <TableCell>
              <Input type="date" defaultValue="2024-01-01" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">End Date</TableCell>
            <TableCell>
              <Input type="date" defaultValue="2024-03-31" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total Budget</TableCell>
            <TableCell>
              <Input defaultValue="$75,000" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Amount Spent</TableCell>
            <TableCell>
              <Input defaultValue="$27,450" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Budget Progress</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>36.6% used</span>
                  <span>$47,550 remaining</span>
                </div>
                <Progress value={36.6} className="h-2" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Project Manager</TableCell>
            <TableCell>
              <Select defaultValue="john-smith">
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="sarah-davis">Sarah Davis</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lead Contractor</TableCell>
            <TableCell>
              <Select defaultValue="mike-johnson">
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  <SelectItem value="tom-wilson">Tom Wilson</SelectItem>
                  <SelectItem value="lisa-brown">Lisa Brown</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Architect</TableCell>
            <TableCell>
              <Select defaultValue="sarah-davis">
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="sarah-davis">Sarah Davis</SelectItem>
                  <SelectItem value="robert-clark">Robert Clark</SelectItem>
                  <SelectItem value="jennifer-taylor">Jennifer Taylor</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Project Description</TableCell>
            <TableCell>
              <Textarea 
                placeholder="Detailed project description..."
                className="min-h-24"
                defaultValue="Complete kitchen renovation including new cabinetry, countertops, appliances, and flooring. Modern design with open concept layout connecting to living area. High-end finishes with quartz countertops and stainless steel appliances."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientProjectSettings;