import React, { useState, useRef, useEffect } from 'react';
import { Users, Search, Paperclip, PaperclipIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import TaskStatusIcon from './TaskStatusIcon';
import { getAvailableProjects, getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { createPortal } from 'react-dom';

interface QuickAddTaskProps {
  onSave: (taskData: any) => void;
  onCancel: () => void;
  defaultStatus: string;
}

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

  const filteredProjects = availableProjects.filter(project =>
    project.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canSave = !!taskName.trim() && !!selectedProject;

  const projectDropdownAnchor = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<{top: number; left: number; width: number} | null>(null);

  // FILE UPLOAD state and handling
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dropdown for file list display
  const [showFilesDropdown, setShowFilesDropdown] = useState(false);
  const filesDropdownButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleSave = () => {
    if (!canSave) return;

    // Convert display name to project ID
    const projectId = selectedProject ? getProjectIdFromDisplayName(selectedProject) : 'unknown-project';

    // Attachments: For new/unsaved tasks, we'll store attachments as files, then they should be attached when the task is fully created
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
      assignee: { name: 'ME', avatar: 'bg-gray-500' },
      hasAttachment: attachedFiles.length > 0,
      attachments: attachedFiles, // <--- pass the files here!
      status: defaultStatus
    };

    onSave(newTask);
    setTaskName('');
    setSelectedProject('');
    setAttachedFiles([]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      // Allow multiple selection, merge with current
      setAttachedFiles(prev => [...prev, ...Array.from(e.target.files)]);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (idx: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Render list of attached files (dropdown)
  const renderFilesDropdown = () => {
    if (!showFilesDropdown || attachedFiles.length === 0) return null;
    return createPortal(
      <div
        className="absolute right-0 mt-2 z-[1001] bg-white border shadow-lg rounded min-w-[180px] overflow-hidden animate-fade-in"
        style={{
          top: filesDropdownButtonRef.current
            ? filesDropdownButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 2
            : undefined,
          left: filesDropdownButtonRef.current
            ? filesDropdownButtonRef.current.getBoundingClientRect().left + window.scrollX - 120
            : undefined,
        }}
        onMouseLeave={() => setShowFilesDropdown(false)}
      >
        {attachedFiles.map((file, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent transition-colors border-b last:border-b-0">
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate flex-1 text-blue-600 hover:underline"
              title={file.name}
              download={file.name}
              onClick={e => e.stopPropagation()}
            >
              {file.name}
            </a>
            <button
              onClick={() => handleRemoveFile(idx)}
              className="text-destructive hover:bg-destructive hover:text-white rounded p-0.5"
              aria-label="Remove file"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>,
      document.body
    );
  };

  // Visual state: icon solid/fill when files attached
  const hasFiles = attachedFiles.length > 0;

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
          {/* File attachment and assign buttons */}
          <div className="flex items-center gap-2 relative">
            {/* Paperclip label and badge */}
            <button
              ref={filesDropdownButtonRef}
              size="sm"
              type="button"
              className={`flex items-center justify-center border border-border rounded px-2 py-1 h-6 bg-white relative transition-colors
                ${hasFiles ? 'bg-accent hover:bg-accent/70 text-blue-700' : 'text-muted-foreground hover:text-blue-700 hover:bg-accent'}`}
              title={hasFiles ? (attachedFiles.length === 1 ? attachedFiles[0].name : `${attachedFiles.length} files`) : "Attach files"}
              onClick={hasFiles
                ? (e) => {
                    e.stopPropagation();
                    // Show dropdown with list, but don't open file dialog (unless you want both)
                    setShowFilesDropdown(v => !v);
                  }
                : (e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }
              }
              aria-label="Attach file(s)"
              tabIndex={0}
              onMouseDown={e => e.preventDefault()}
              onDoubleClick={e => fileInputRef.current?.click()}
            >
              <Paperclip
                className="w-3 h-3"
                strokeWidth={hasFiles ? 2.5 : 2}
                fill={hasFiles ? "currentColor" : "none"}
                style={{
                  color: hasFiles ? "#2563eb" : undefined, // tailwind blue-700
                }}
              />
              {hasFiles && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full text-[10px] px-1 leading-none z-10 border border-white">
                  {attachedFiles.length}
                </span>
              )}
            </button>

            {/* Hidden file input, always allow multi */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              aria-label="Attach file(s)"
            />
            {/* Show file names as inline chips if only one file, or if showFilesDropdown not used */}
            {hasFiles && !showFilesDropdown && attachedFiles.length === 1 && (
              <span
                className="inline-flex items-center gap-0.5 bg-muted px-2 py-0.5 rounded text-xs font-medium"
                title={attachedFiles[0].name}
              >
                {attachedFiles[0].name}
                <button onClick={() => handleRemoveFile(0)} className="ml-0.5 text-destructive" type="button" aria-label="Remove file">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {renderFilesDropdown()}
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 text-xs px-2 py-1 h-6 text-muted-foreground hover:text-foreground border border-border rounded"
              type="button"
            >
              <Users className="w-3 h-3" />
            </Button>
          </div>

          {/* Separator, Cancel, Save buttons */}
          <Separator orientation="vertical" className="h-4" />
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
