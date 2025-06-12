
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ProjectTabForm from './client/ProjectTabForm';

const ProjectTab = () => {
  const form = ProjectTabForm({ onSave: () => {} });

  return (
    <div className="h-full flex flex-col">
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
