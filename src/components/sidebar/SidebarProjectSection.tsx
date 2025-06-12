import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, MoreHorizontal, Edit, Copy, Archive, Trash2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { getProjectDisplayName } from '@/data/projectClientData';

interface SidebarProjectSectionProps {
  title: string;
  projects: string[];
  isOpen: boolean;
  onToggle: () => void;
  isActive?: boolean;
  refreshTrigger?: number;
}

const SidebarProjectSection = ({ 
  title, 
  projects, 
  isOpen, 
  onToggle, 
  isActive = false,
  refreshTrigger 
}: SidebarProjectSectionProps) => {
  const navigate = useNavigate();
  const [projectDisplayNames, setProjectDisplayNames] = useState<Record<string, string>>({});

  // Update project display names when refresh trigger changes
  useEffect(() => {
    const updatedNames: Record<string, string> = {};
    projects.forEach(project => {
      const projectId = project.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      updatedNames[project] = getProjectDisplayName(projectId) || project;
    });
    setProjectDisplayNames(updatedNames);
  }, [projects, refreshTrigger]);

  const handleProjectClick = (projectName: string) => {
    // Convert project name to URL-friendly format
    const projectId = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    navigate(`/project/${projectId}`);
  };

  const handleMenuAction = (action: string, projectName: string) => {
    console.log(`${action} for project: ${projectName}`);
    
    switch (action) {
      case 'rename':
        // Handle rename
        break;
      case 'duplicate':
        // Handle duplicate
        break;
      case 'archive':
        // Handle archive
        break;
      case 'delete':
        // Handle delete
        break;
      case 'move-to-progress':
        // Handle move to in progress
        break;
      case 'move-to-hold':
        // Handle move to on hold
        break;
      case 'move-to-completed':
        // Handle move to completed
        break;
    }
  };

  const handleMoreClick = (e: React.MouseEvent, contextMenuRef: React.RefObject<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Simulate a right-click to open the context menu
    if (contextMenuRef.current) {
      const rightClickEvent = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY,
      });
      contextMenuRef.current.dispatchEvent(rightClickEvent);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="ml-3 mt-1">
        <CollapsibleTrigger className={cn(
          "flex items-center gap-2 px-2 py-1.5 w-full text-left rounded",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "hover:bg-sidebar-accent/50"
        )}>
          {isOpen ? (
            <ChevronDown className="w-3 h-3 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
          )}
          <span className="text-sm truncate">{title}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-0 mt-1 space-y-1">
            {projects.map((project, index) => {
              const contextMenuRef = useRef<HTMLDivElement>(null);
              const displayName = projectDisplayNames[project] || project;
              
              return (
                <ContextMenu key={index}>
                  <ContextMenuTrigger asChild>
                    <div
                      ref={contextMenuRef}
                      className="flex items-center gap-2 px-2 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded cursor-pointer group"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-sm flex-shrink-0"></div>
                      <span className="truncate text-xs flex-1">{displayName}</span>
                      {project === 'Ogden - Thew - 2709 T Street' && (
                        <span className="text-xs text-muted-foreground flex-shrink-0">1</span>
                      )}
                      <button
                        onClick={(e) => handleMoreClick(e, contextMenuRef)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-0.5 hover:bg-sidebar-accent rounded"
                      >
                        <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-56">
                    <ContextMenuItem onClick={() => handleMenuAction('rename', project)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Rename
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleMenuAction('duplicate', project)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Move to
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        {title !== 'in Progress' && (
                          <ContextMenuItem onClick={() => handleMenuAction('move-to-progress', project)}>
                            In Progress
                          </ContextMenuItem>
                        )}
                        {title !== 'on Hold' && (
                          <ContextMenuItem onClick={() => handleMenuAction('move-to-hold', project)}>
                            On Hold
                          </ContextMenuItem>
                        )}
                        {title !== 'Completed' && (
                          <ContextMenuItem onClick={() => handleMenuAction('move-to-completed', project)}>
                            Completed
                          </ContextMenuItem>
                        )}
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => handleMenuAction('archive', project)}>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </ContextMenuItem>
                    <ContextMenuItem 
                      className="text-red-600 focus:text-red-600" 
                      onClick={() => handleMenuAction('delete', project)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default SidebarProjectSection;
