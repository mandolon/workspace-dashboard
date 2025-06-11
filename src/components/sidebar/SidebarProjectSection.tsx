
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProjectSectionProps {
  title: string;
  projects: string[];
  isOpen: boolean;
  onToggle: () => void;
  isActive?: boolean;
}

const SidebarProjectSection = ({ 
  title, 
  projects, 
  isOpen, 
  onToggle, 
  isActive = false 
}: SidebarProjectSectionProps) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectName: string) => {
    // Convert project name to URL-friendly format
    const projectId = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    navigate(`/project/${projectId}`);
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
          <div className="ml-5 mt-1 space-y-1">
            {projects.slice(0, 4).map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project)}
                className="flex items-center gap-2 px-2 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded cursor-pointer"
              >
                <div className="w-2 h-2 bg-muted-foreground rounded-sm flex-shrink-0"></div>
                <span className="truncate text-xs flex-1">{project}</span>
                {project === 'Ogden - Thew - 2709 T Street' && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">1</span>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default SidebarProjectSection;
