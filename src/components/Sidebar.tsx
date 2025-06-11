
import React, { useState } from 'react';
import { 
  Home, 
  Inbox, 
  MessageSquare, 
  Users, 
  FileText, 
  BarChart3, 
  FileImage, 
  ClipboardList, 
  Target, 
  Clock,
  MoreHorizontal,
  Star,
  Plus,
  ChevronDown,
  ChevronRight,
  UserPlus,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const [openSections, setOpenSections] = useState({
    spaces: true,
    inProgress: true,
    onHold: false,
    completed: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const mainNavItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Inbox, label: 'Inbox', active: false },
    { icon: MessageSquare, label: 'Chat', active: false },
    { icon: Users, label: 'Teams', active: false },
    { icon: FileText, label: 'Docs', active: false },
    { icon: BarChart3, label: 'Dashboards', active: true },
    { icon: FileImage, label: 'Whiteboards', active: false },
    { icon: ClipboardList, label: 'Forms', active: false },
    { icon: Target, label: 'Goals', active: false },
    { icon: Clock, label: 'Timesheets', active: false },
    { icon: MoreHorizontal, label: 'More', active: false },
  ];

  const workspaces = [
    { name: 'PinerWorks', active: true, locked: true },
  ];

  const inProgressProjects = [
    'Adams - 1063 40th Street',
    'Ogden - Thew - 2709 T Street',
    '1524 Tiverton',
    '2015 10th Street',
    '2200 I Street',
    'Adamo - 6605 S. Land Park Dr.',
    'McVarish - Salmina - 6251 El Dorado Street',
    'Andre - 2119 H Street',
    'Fleming-Veisze - 1111 33rd Street',
    'Ganson - 2125 I Street',
    'DeCarlo - 1141 Swanston Dr',
    'Green - 920 U Street',
    'Kubein - Plymouth Project',
    'McLeod-Joffe - 2436 59th Street',
    'Piner Haus Garage',
    'Rathbun - USFS Cabin',
    'Vasquez -Gutierrez - 2508 55th Street',
    'Wilcox - 1808 U Street',
    '14401 Grand Island Road'
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

  if (isCollapsed) {
    return (
      <div className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col w-16">
        <div className="p-4 border-b border-sidebar-border">
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">R</span>
          </div>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {mainNavItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center p-2 rounded-md text-sm cursor-pointer transition-colors",
                item.active 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-4 h-4" />
            </div>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col w-64">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">R</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">rehome</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 overflow-auto">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors",
                item.active 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Favorites Section */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Favorites
            </span>
            <Star className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>

        {/* Spaces Section */}
        <div className="mt-6 px-4">
          <Collapsible open={openSections.spaces} onOpenChange={() => toggleSection('spaces')}>
            <div className="flex items-center justify-between mb-2">
              <CollapsibleTrigger className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground">
                <MoreHorizontal className="w-3 h-3" />
                <span>Spaces</span>
              </CollapsibleTrigger>
              <div className="flex items-center gap-1">
                <Plus className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
              </div>
            </div>
            <CollapsibleContent>
              <div className="space-y-1">
                {workspaces.map((workspace, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded text-sm cursor-pointer",
                      workspace.active 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <div className="w-3 h-3 bg-blue-500 rounded-sm flex-shrink-0"></div>
                    <span className="truncate flex-1">{workspace.name}</span>
                    {workspace.locked && <div className="w-3 h-3 text-muted-foreground">🔒</div>}
                    <Plus className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* In Progress Projects */}
          <Collapsible open={openSections.inProgress} onOpenChange={() => toggleSection('inProgress')}>
            <div className="mt-4">
              <CollapsibleTrigger className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-sidebar-accent/50 rounded">
                {openSections.inProgress ? (
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-sm font-medium">In Progress</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 mt-1 space-y-0.5">
                  {inProgressProjects.map((project, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-2 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-muted-foreground rounded-sm flex-shrink-0"></div>
                      <span className="truncate text-xs">{project}</span>
                      {(project === 'Ogden - Thew - 2709 T Street' || project === 'Piner Haus Garage' || project === 'Rathbun - USFS Cabin') && (
                        <span className="text-xs text-muted-foreground ml-auto">{project === 'Ogden - Thew - 2709 T Street' ? '1' : project === 'Rathbun - USFS Cabin' ? '2' : '1'}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* On Hold Projects */}
          <Collapsible open={openSections.onHold} onOpenChange={() => toggleSection('onHold')}>
            <div className="mt-2">
              <CollapsibleTrigger className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-sidebar-accent/50 rounded">
                {openSections.onHold ? (
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                <span className="text-sm font-medium">On Hold</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 mt-1 space-y-0.5">
                  {onHoldProjects.map((project, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-2 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-muted-foreground rounded-sm flex-shrink-0"></div>
                      <span className="truncate text-xs">{project}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Completed Projects */}
          <Collapsible open={openSections.completed} onOpenChange={() => toggleSection('completed')}>
            <div className="mt-2">
              <CollapsibleTrigger className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-sidebar-accent/50 rounded">
                {openSections.completed ? (
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span className="text-sm font-medium">Completed</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 mt-1 space-y-0.5">
                  {completedProjects.map((project, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-2 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-muted-foreground rounded-sm flex-shrink-0"></div>
                      <span className="truncate text-xs">{project}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground">
            <UserPlus className="w-4 h-4" />
            <span>Invite</span>
          </button>
          <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
