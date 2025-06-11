
import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
    setShowProjectDropdown(false);
    setSearchTerm('');
  };

  return (
    <div className="border border-border rounded-md p-3 bg-background space-y-3">
      {/* Task Name Input */}
      <div>
        <Input
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="text-sm"
          autoFocus
        />
      </div>

      {/* Project Selector */}
      <div className="relative">
        <button
          className="w-full text-left px-3 py-2 border border-border rounded-md text-sm text-blue-600 hover:bg-accent"
          onClick={() => setShowProjectDropdown(!showProjectDropdown)}
        >
          {selectedProject || 'Select Project...'}
        </button>
        
        {showProjectDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 text-xs h-8"
                />
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filteredProjects.map((project, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-accent border-b border-border/30 last:border-b-0"
                  onClick={() => handleProjectSelect(project)}
                >
                  {project}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="flex items-center gap-1 text-xs px-3 py-1"
        >
          <Users className="w-3 h-3" />
          Assign
        </Button>
        
        <div className="flex-1"></div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="text-xs px-3 py-1"
        >
          Cancel
        </Button>
        
        <Button
          size="sm"
          onClick={handleSave}
          className="text-xs px-3 py-1"
          disabled={!taskName.trim()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default QuickAddTask;
