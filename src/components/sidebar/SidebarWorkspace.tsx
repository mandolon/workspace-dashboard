import React, { useState } from 'react';
import { Folder, MoreHorizontal, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarProjectSection from './SidebarProjectSection';

interface Workspace {
  name: string;
  active: boolean;
  locked: boolean;
}

interface SidebarWorkspaceProps {
  workspace: Workspace;
  refreshTrigger?: number;
}

const SidebarWorkspace = ({ workspace, refreshTrigger }: SidebarWorkspaceProps) => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    inProgress: true,
    onHold: false,
    completed: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleWorkspaceClick = () => {
    navigate('/');
  };

  const inProgressProjects = [
    'Adams - 1063 40th Street',
    'Ogden - Thew - 2709 T Street',
    'Henderson - 1524 Tiverton',
    'Peterson - 2015 10th Street',
    'Johnson - 2200 I Street',
    'Adamo - 6605 S. Land Park Dr.',
    'McVarish - Salmina - 6251 El Dorado Street',
    'Andre - 2119 H Street',
    'Fleming - Veisze - 1111 33rd Street',
    'Ganson - 2125 I Street',
    'DeCarlo - 1141 Swanston Dr',
    'Green - 920 U Street',
    'Kubein - Plymouth Project',
    'McLeod - Joffe - 2436 59th Street',
    'Piner - Piner Haus Garage',
    'Rathbun - USFS Cabin',
    'Vasquez - Gutierrez - 2508 55th Street',
    'Wilcox - 1808 U Street',
    'Donaldson - 2717 58th Street',
    'Unknown - 14401 Grand Island Road'
  ];

  const onHoldProjects = [
    'Project Alpha',
    'Project Beta'
  ];

  const completedProjects = [
    'Finished Project 1',
    'Finished Project 2',
    'Finished Project 3'
  ];

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
        onToggle={() => toggleSection('inProgress')}
        refreshTrigger={refreshTrigger}
      />

      <SidebarProjectSection
        title="on Hold"
        projects={onHoldProjects}
        isOpen={openSections.onHold}
        onToggle={() => toggleSection('onHold')}
        refreshTrigger={refreshTrigger}
      />

      <SidebarProjectSection
        title="Completed"
        projects={completedProjects}
        isOpen={openSections.completed}
        onToggle={() => toggleSection('completed')}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default SidebarWorkspace;
