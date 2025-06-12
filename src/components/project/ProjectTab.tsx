
import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getClientData } from '@/data/projectClientData';
import ProjectTabForm from './client/ProjectTabForm';

const ProjectTab = () => {
  const { projectId } = useParams();
  const clientData = getClientData(projectId);
  const form = ProjectTabForm({ onSave: () => {} });

  return (
    <div className="h-full flex flex-col">
      {/* Project Actions Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Left side - Status and Date Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>5/8/23, 5 Weeks</span>
            </div>
            <Select value="in-progress" onValueChange={() => {}}>
              <SelectTrigger className="w-32 h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right side - Agents and Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Agents</span>
              <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">2</span>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
            <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
            <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4 max-w-4xl mx-auto">
            {form.sections}
            {/* Add some padding at the bottom to ensure last item is visible */}
            <div className="h-20" />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      {/* Fixed Save Button - Always Visible */}
      <div className="flex-shrink-0 p-4 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button onClick={form.handleSave} className="px-6 py-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
