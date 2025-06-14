
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

const TaskDetailDescription: React.FC = () => (
  <div className="space-y-2">
    <label className="text-xs text-muted-foreground">Description</label>
    <Textarea
      placeholder="Add description..."
      className="min-h-[80px] text-xs"
    />
  </div>
);

export default TaskDetailDescription;
