
import React, { useState } from 'react';
import { Users, Search, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import TaskStatusIcon from './TaskStatusIcon';

interface QuickAddTaskProps {
  onSave: (taskData: any) => void;
  onCancel: () => void;
  defaultStatus: string;
}

const QuickAddTask = ({ onSave, onCancel, defaultStatus }: QuickAddTaskProps) => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    'Adams - 1063 40th St.',
    'Thew - 2709 T St.',
    'Tran - 1524 Tiverton Ave.',
    'Craig - 2015 10th St.',
    'Kelly - 2200 I Street',
    'Adamo - 6605 S. Land P...'
  ];

  const filteredProjects = projects.filter(project =>
    project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!taskName.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: taskName,
      project: selectedProject || 'No Project',
      estimatedCompletion: '—',
      dateCreated: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: '2-digit' 
      }),
      dueDate: '—',
      assignee: { name: 'ME', avatar: 'bg-gray-500' },
      hasAttachment: false,
      status: defaultStatus
    };

    onSave(newTask);
    setTaskName('');
    setSelectedProject('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
    setShowProjectDropdown(false);
    setSearchTerm('');
  };

  const handleStatusIconClick = () => {
    // Do nothing for quick add - the status is set and not changeable during quick add
    console.log('Status icon clicked in quick add');
  };

  return (
    <div className="px-4 py-2 bg-accent/50 border border-border rounded">
      {/* Task Input Row - Aligned with table columns */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Name column - made wider */}
        <div className="col-span-6 flex items-center gap-2 pl-4">
          <TaskStatusIcon status={defaultStatus} onClick={handleStatusIconClick} />
          <div className="flex-1 relative">
            <button
              className="block text-left text-xs text-blue-600 hover:text-blue-700 mb-1"
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            >
              {selectedProject || 'Select List...'}
            </button>
            <Input
              placeholder="Task Name or type '/' for commands"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="font-medium text-xs text-foreground h-auto p-0 border-0 shadow-none focus-visible:ring-0 bg-transparent placeholder:font-medium placeholder:text-xs placeholder:text-muted-foreground"
              autoFocus
            />
            
            {showProjectDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10">
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-7 text-xs h-7 border-0 shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {filteredProjects.map((project, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-accent border-b border-border/30 last:border-b-0"
                      onClick={() => handleProjectSelect(project)}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty space columns */}
        <div className="col-span-2"></div>

        {/* Action buttons group */}
        <div className="col-span-4 flex items-center justify-end gap-2">
          {/* File attachment and assign buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 text-xs px-2 py-1 h-6 text-muted-foreground hover:text-foreground border border-border rounded"
              onClick={(e) => {
                e.stopPropagation();
                // Handle file attachment
              }}
            >
              <Paperclip className="w-3 h-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 text-xs px-2 py-1 h-6 text-muted-foreground hover:text-foreground border border-border rounded"
            >
              <Users className="w-3 h-3" />
            </Button>
          </div>

          {/* Separator */}
          <Separator orientation="vertical" className="h-4" />

          {/* Cancel and Save buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-xs px-3 py-1 h-6 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            
            <Button
              size="sm"
              onClick={handleSave}
              className="text-xs px-3 py-1 h-6 bg-blue-600 hover:bg-blue-700"
              disabled={!taskName.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddTask;
