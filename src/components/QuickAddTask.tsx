
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import TaskStatusIcon from './TaskStatusIcon';
import { getAvailableProjects, getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';
import QuickAddAttachments from './quick-add/QuickAddAttachments';
import QuickAddAssigneePopover from './quick-add/QuickAddAssigneePopover';
import QuickAddProjectDropdown from './quick-add/QuickAddProjectDropdown';
import { TEAM_USERS } from '@/utils/teamUsers';
import { getRandomColor } from '@/utils/taskUtils';

interface QuickAddTaskPerson {
  name: string;
  avatar: string;
  fullName?: string;
  avatarColor?: string;
}

interface QuickAddTaskProps {
  onSave: (taskData: any) => void;
  onCancel: () => void;
  defaultStatus: string;
}

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

  const [assignee, setAssignee] = useState<QuickAddTaskPerson | null>(null);
  const [showAssigneePopover, setShowAssigneePopover] = useState(false);

  const filteredProjects = availableProjects.filter(project =>
    project.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canSave = !!taskName.trim() && !!selectedProject;

  const projectDropdownAnchor = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<{top: number; left: number; width: number} | null>(null);

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const { addAttachments } = useTaskAttachmentContext();

  useEffect(() => {
    if (showProjectDropdown && projectDropdownAnchor.current) {
      const anchorRect = getAbsoluteRect(projectDropdownAnchor.current);
      const dropdownWidth = anchorRect.width < 280 ? 280 : anchorRect.width;
      let top = anchorRect.top + anchorRect.height + 5;
      let left = anchorRect.left;

      const rightEdge = left + dropdownWidth;
      const viewportWidth = window.innerWidth;

      if (rightEdge > viewportWidth - 8) {
        left = viewportWidth - dropdownWidth - 8;
      }
      if (left < 8) left = 8;

      setDropdownStyle({ top, left, width: dropdownWidth });
    }
  }, [showProjectDropdown]);

  useEffect(() => {
    if (showProjectDropdown && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
    }
  }, [showProjectDropdown]);

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

  useEffect(() => {
    return () => {
      setAssignee(null);
    };
  }, []);

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

  return (
    <div className="px-4 py-2 bg-background border border-border rounded transition-colors duration-100">
      <div className="grid grid-cols-12 gap-4 items-center overflow-visible">
        {/* Name column */}
        <div className="col-span-6 flex items-center gap-2 pl-4">
          <TaskStatusIcon status={defaultStatus} onClick={() => {}} />
          <div className="flex-1 relative">
            <button
              ref={projectDropdownAnchor}
              className="block text-left text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-1 transition-colors"
              onClick={() => setShowProjectDropdown((prev) => !prev)}
              style={{ background: "transparent" }}
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
            <QuickAddProjectDropdown
              show={showProjectDropdown}
              dropdownStyle={dropdownStyle}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredProjects={filteredProjects}
              onSelect={handleProjectSelect}
              searchInputRef={searchInputRef}
              onMouseDown={e => e.stopPropagation()}
            />
          </div>
        </div>
        {/* Empty space */}
        <div className="col-span-2"></div>
        {/* Action buttons */}
        <div className="col-span-4 flex items-center justify-end gap-2 overflow-visible">
          <QuickAddAttachments files={attachedFiles} setFiles={setAttachedFiles} />
          <QuickAddAssigneePopover
            assignee={assignee}
            setAssignee={setAssignee}
            showAssigneePopover={showAssigneePopover}
            setShowAssigneePopover={setShowAssigneePopover}
          />
          <Separator orientation="vertical" className="h-4 bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { onCancel(); setAssignee(null); }}
            className="text-xs px-3 py-1 h-6 text-muted-foreground hover:text-foreground bg-background hover:bg-accent transition-colors"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="text-xs px-3 py-1 h-6 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400"
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

