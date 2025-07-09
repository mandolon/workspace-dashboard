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
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-48">Setting</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-b">
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project Name</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="Adams - 1063 40th Street" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project ID</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="adams-1063-40th-street" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project Type</TableCell>
            <TableCell className="py-2">
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
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Status</TableCell>
            <TableCell className="py-2">
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
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Start Date</TableCell>
            <TableCell className="py-2">
              <Input type="date" defaultValue="2024-01-01" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">End Date</TableCell>
            <TableCell className="py-2">
              <Input type="date" defaultValue="2024-03-31" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Total Budget</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="$75,000" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Amount Spent</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="$27,450" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Budget Progress</TableCell>
            <TableCell className="py-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>36.6% used</span>
                  <span>$47,550 remaining</span>
                </div>
                <Progress value={36.6} className="h-2" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project Manager</TableCell>
            <TableCell className="py-2">
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
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Lead Contractor</TableCell>
            <TableCell className="py-2">
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
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Architect</TableCell>
            <TableCell className="py-2">
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
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project Description</TableCell>
            <TableCell className="py-2">
              <Textarea 
                placeholder="Detailed project description..."
                className="min-h-24"
                defaultValue="Complete kitchen renovation including new cabinetry, countertops, appliances, and flooring. Modern design with open concept layout connecting to living area. High-end finishes with quartz countertops and stainless steel appliances."
              />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2"></TableCell>
            <TableCell className="py-2">
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