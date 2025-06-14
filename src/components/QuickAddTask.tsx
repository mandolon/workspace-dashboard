import React, { useState, useRef, useEffect } from 'react';
import { Users, Search, Paperclip, PaperclipIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import TaskStatusIcon from './TaskStatusIcon';
import { getAvailableProjects, getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { createPortal } from 'react-dom';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';
import QuickAddAttachments from './quick-add/QuickAddAttachments';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { availablePeople, getRandomColor } from '@/utils/taskUtils';

interface QuickAddTaskProps {
  onSave: (taskData: any) => void;
  onCancel: () => void;
  defaultStatus: string;
}

// Define the type for people used in assignment popover/assignee
type QuickAddTaskPerson = {
  name: string;
  avatar: string;
  fullName?: string;
  avatarColor?: string;
};

// Helper to get absolute coordinates of an element (for positioning the dropdown)
function getAbsoluteRect(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height
  };
}

const QuickAddTask = ({ onSave, onCancel, defaultStatus }: QuickAddTaskProps) => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const taskNameInputRef = useRef<HTMLInputElement>(null);

  const availableProjects = getAvailableProjects();

  // ================== ASSIGNEE STATE AND LOGIC ==================
  const [assignee, setAssignee] = useState<QuickAddTaskPerson | null>(null);
  const [showAssigneePopover, setShowAssigneePopover] = useState(false);

  const filteredProjects = availableProjects.filter(project =>
    project.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canSave = !!taskName.trim() && !!selectedProject;

  const projectDropdownAnchor = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<{top: number; left: number; width: number} | null>(null);

  // Replaces direct file state and logic with new component state
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Access the attachment context for syncing files after saving the task
  const { addAttachments } = useTaskAttachmentContext();

  // Handle smart positioning for the dropdown (ensure it is visible in the viewport)
  useEffect(() => {
    if (showProjectDropdown && projectDropdownAnchor.current) {
      const anchorRect = getAbsoluteRect(projectDropdownAnchor.current);
      const dropdownWidth = anchorRect.width < 280 ? 280 : anchorRect.width;
      let top = anchorRect.top + anchorRect.height + 5;
      let left = anchorRect.left;

      const rightEdge = left + dropdownWidth;
      const viewportWidth = window.innerWidth;

      if (rightEdge > viewportWidth - 8) {
        left = viewportWidth - dropdownWidth - 8; // 8px padding
      }
      if (left < 8) left = 8;

      setDropdownStyle({ top, left, width: dropdownWidth });
    }
  }, [showProjectDropdown]);

  // Focus the search input when dropdown opens
  useEffect(() => {
    if (showProjectDropdown && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
    }
  }, [showProjectDropdown]);

  // Scroll dropdown into view if needed
  useEffect(() => {
    if (showProjectDropdown && dropdownStyle) {
      const el = document.getElementById('quick-add-project-list-dropdown');
      if (el) {
        const rect = el.getBoundingClientRect();
        if(rect.bottom > window.innerHeight) {
          window.scrollBy({ top: rect.bottom - window.innerHeight + 12, behavior: "smooth" });
        } else if (rect.top < 0) {
          window.scrollBy({ top: rect.top - 12, behavior: "smooth" });
        }
      }
    }
  }, [showProjectDropdown, dropdownStyle]);

  // Reset assignee on cancel/save
  useEffect(() => {
    return () => {
      setAssignee(null);
    };
  }, []);

  // handler for Save (unchanged, but add assignee)
  const handleSave = () => {
    if (!canSave) return;
    const projectId = selectedProject ? getProjectIdFromDisplayName(selectedProject) : 'unknown-project';
    const newTask = {
      id: Date.now(),
      title: taskName,
      projectId: projectId,
      project: selectedProject || 'No Project',
      estimatedCompletion: '—',
      dateCreated: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: '2-digit' 
      }),
      dueDate: '—',
      assignee: assignee ? assignee : { name: 'ME', avatar: 'bg-gray-500' },
      hasAttachment: attachedFiles.length > 0,
      attachments: attachedFiles,
      status: defaultStatus,
    };

    onSave(newTask);

    // Sync attachments to the AttachmentContext
    if (attachedFiles.length > 0) {
      addAttachments(String(newTask.id), attachedFiles, assignee?.name || "ME");
    }
    setTaskName('');
    setSelectedProject('');
    setAttachedFiles([]);
    setAssignee(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (canSave) {
        handleSave();
      }
    }
  };

  const handleProjectSelect = (
    project: { displayName: string; projectId: string },
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSelectedProject(project.displayName);
    setShowProjectDropdown(false);
    setSearchTerm('');
    taskNameInputRef.current?.focus();
  };

  const handleStatusIconClick = () => {
    // Do nothing for quick add - the status is set and not changeable during quick add
  };

  // Render the dropdown in a portal (to body)
  const renderProjectDropdown = () => {
    if (!showProjectDropdown || !dropdownStyle) return null;
    return createPortal(
      <div
        id="quick-add-project-list-dropdown"
        className="bg-background border border-border rounded-md shadow-lg z-[1000] max-h-60 overflow-auto"
        style={{
          position: 'absolute',
          top: dropdownStyle.top,
          left: dropdownStyle.left,
          width: dropdownStyle.width,
          minWidth: 240,
        }}
        onMouseDown={e => {
          // Prevent outside click handler from firing when interacting with dropdown
          e.stopPropagation();
        }}
      >
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-6 text-[11px] h-6 py-1 border-0 shadow-none focus-visible:ring-0"  // made smaller font and height
              ref={searchInputRef}
              onMouseDown={e => e.stopPropagation()}
            />
          </div>
        </div>
        <div className="max-h-32 overflow-y-auto">
          {filteredProjects.map((project) => (
            <button
              key={project.projectId}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-accent border-b border-border/30 last:border-b-0"
              onClick={(e) => handleProjectSelect(project, e)}
              onMouseDown={e => e.stopPropagation()} // <= stop container outside click as well
            >
              {project.displayName}
            </button>
          ))}
          {filteredProjects.length === 0 && (
            <div className="text-xs text-muted-foreground px-3 py-2" onMouseDown={e => e.stopPropagation()}>
              No lists found.
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  };

  // ============= ASSIGNEE POPOVER UI ================
  const renderAssigneePopover = (
    <Popover open={showAssigneePopover} onOpenChange={setShowAssigneePopover}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1 text-xs px-2 py-1 h-6 text-muted-foreground hover:text-foreground border border-border rounded relative"
          type="button"
          aria-label={assignee ? `Assigned to ${assignee.fullName || assignee.name}` : "Assign user"}
        >
          {assignee ? (
            <>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${assignee.avatarColor ? assignee.avatarColor : getRandomColor(assignee.name)}`}
              >
                {assignee.name}
              </div>
              <span className="max-w-[64px] truncate">{assignee.fullName || assignee.name}</span>
              <button
                type="button"
                className="ml-1 rounded-full bg-muted/90 text-xs text-destructive hover:bg-destructive hover:text-white px-1"
                style={{ lineHeight: 1, fontSize: 13 }}
                onClick={e => { e.stopPropagation(); setAssignee(null); }}
                tabIndex={-1}
                title="Clear assignee"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              <Users className="w-3 h-3" />
              <span>Assign</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-1 w-44 bg-popover z-50">
        <div className="text-xs font-semibold pb-1 px-2">Assign to...</div>
        <div className="flex flex-col">
          {availablePeople.map(person => (
            <button
              key={person.name}
              className="flex items-center gap-2 py-1 px-2 rounded hover:bg-accent text-xs text-foreground"
              onClick={() => { setAssignee(person as QuickAddTaskPerson); setShowAssigneePopover(false); }}
              type="button"
            >
              <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-medium ${person.avatarColor ? person.avatarColor : getRandomColor(person.name)}`}>
                {person.name}
              </div>
              <span>{person.fullName || person.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="px-4 py-2 bg-accent/50 border border-border rounded">
      <div className="grid grid-cols-12 gap-4 items-center overflow-visible">
        {/* Name column */}
        <div className="col-span-6 flex items-center gap-2 pl-4">
          <TaskStatusIcon status={defaultStatus} onClick={() => {}} />
          <div className="flex-1 relative">
            <button
              ref={projectDropdownAnchor}
              className="block text-left text-xs text-blue-600 hover:text-blue-700 mb-1"
              onClick={() => setShowProjectDropdown((prev) => !prev)}
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
              ref={taskNameInputRef}
            />
            {renderProjectDropdown()}
          </div>
        </div>
        {/* Empty space */}
        <div className="col-span-2"></div>
        {/* Action buttons */}
        <div className="col-span-4 flex items-center justify-end gap-2">
          {/* Attachments refactored out */}
          <QuickAddAttachments files={attachedFiles} setFiles={setAttachedFiles} />
          {/* User Assignment (NOW WORKING) */}
          {renderAssigneePopover}
          {/* Separator, Cancel, Save buttons */}
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { onCancel(); setAssignee(null); }}
            className="text-xs px-3 py-1 h-6 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="text-xs px-3 py-1 h-6 bg-blue-600 hover:bg-blue-700"
            disabled={!canSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddTask;
