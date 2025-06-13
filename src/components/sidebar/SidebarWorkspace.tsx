
import React, { useState, useMemo, useCallback } from 'react';
import { Folder, MoreHorizontal, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarProjectSection from './SidebarProjectSection';
import { projectStatusData } from '@/data/projectStatus';

interface Workspace {
  name: string;
  active: boolean;
  locked: boolean;
}

interface SidebarWorkspaceProps {
  workspace: Workspace;
  refreshTrigger?: number;
}

const SidebarWorkspace = React.memo(({ workspace, refreshTrigger }: SidebarWorkspaceProps) => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    inProgress: true,
    onHold: false,
    completed: false,
  });

  const toggleSection = useCallback((section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleWorkspaceClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Use centralized project data
  const inProgressProjects = useMemo(() => projectStatusData.inProgress, []);
  const onHoldProjects = useMemo(() => projectStatusData.onHold, []);
  const completedProjects = useMemo(() => projectStatusData.completed, []);

  const toggleInProgress = useCallback(() => toggleSection('inProgress'), [toggleSection]);
  const toggleOnHold = useCallback(() => toggleSection('onHold'), [toggleSection]);
  const toggleCompleted = useCallback(() => toggleSection('completed'), [toggleSection]);

  return (
    <div>
      <div 
        onClick={handleWorkspaceClick}
        className="flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer hover:bg-sidebar-accent/50"
      >
        <Folder className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="truncate flex-1 text-sm">{workspace.name}</span>
        {workspace.locked && <div className="w-3 h-3 text-muted-foreground text-xs flex-shrink-0">🔒</div>}
        <div className="flex items-center gap-1 flex-shrink-0">
          <MoreHorizontal className="w-3 h-3 text-muted-foreground hover:text-foreground" />
          <Plus className="w-3 h-3 text-muted-foreground hover:text-foreground" />
        </div>
      </div>

      <SidebarProjectSection
        title="in Progress"
        projects={inProgressProjects}
        isOpen={openSections.inProgress}
        onToggle={toggleInProgress}
        refreshTrigger={refreshTrigger}
      />

      <SidebarProjectSection
        title="on Hold"
        projects={onHoldProjects}
        isOpen={openSections.onHold}
        onToggle={toggleOnHold}
        refreshTrigger={refreshTrigger}
      />

      <SidebarProjectSection
        title="Completed"
        projects={completedProjects}
        isOpen={openSections.completed}
        onToggle={toggleCompleted}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
});

SidebarWorkspace.displayName = 'SidebarWorkspace';

export default SidebarWorkspace;
