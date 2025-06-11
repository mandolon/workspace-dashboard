
import React, { useState } from 'react';
import { ArrowLeft, Upload, Paperclip, Send, Menu } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Updated task data to match TaskBoard.tsx
  const getTaskData = (id: string | undefined) => {
    console.log('TaskDetailPage - taskId from URL:', id);
    
    const tasks: Record<string, any> = {
      '1': {
        id: id,
        title: "Planning set finalized, set up CD's",
        project: "Piner Haus Garage",
        status: "REDLINE / TO DO"
      },
      '2': {
        id: id,
        title: "Update - 12.27.23",
        project: "Rathbun - USFS Cabin",
        status: "REDLINE / TO DO"
      },
      '3': {
        id: id,
        title: "Update 12.9.23",
        project: "Ogden - Thew - 2709 T Street",
        status: "REDLINE / TO DO"
      },
      '4': {
        id: id,
        title: "Alternate Cabin Design",
        project: "Rathbun - USFS Cabin",
        status: "REDLINE / TO DO"
      }
    };
    
    const selectedTask = tasks[id || '1'] || {
      id: id,
      title: "Planning set finalized, set up CD's",
      project: "Piner Haus Garage",
      status: "REDLINE / TO DO"
    };
    
    console.log('TaskDetailPage - selected task:', selectedTask);
    return selectedTask;
  };

  const task = getTaskData(taskId);
  const [selectedProject, setSelectedProject] = useState(task.project);
  const [description, setDescription] = useState('');

  // Available projects for the dropdown
  const availableProjects = [
    "Piner Haus Garage",
    "Rathbun - USFS Cabin", 
    "Ogden - Thew - 2709 T Street",
    "Adams - 1063 40th Street"
  ];

  const handleProjectChange = (newProject: string) => {
    setSelectedProject(newProject);
    console.log('Project changed to:', newProject);
  };

  const attachments = [
    {
      name: "CDO-0063-Planning-Entitlement-Application",
      dateCreated: "Jul 31, 2024",
      author: "Matthew P.",
    },
    {
      name: "CDO-0220-Owner-Builder-F...",
      dateCreated: "Aug 17, 2024",
      author: "Armando L.",
    },
    {
      name: "Agent-for-Owner-Authorizat...",
      dateCreated: "Aug 11, 2024",
      author: "Armando L.",
    },
    {
      name: "James Hall",
      dateCreated: "Aug 2, 2024",
      author: "Matthew P.",
    },
    {
      name: "Corina McCoy",
      dateCreated: "Jul 23, 2024",
      author: "Matthew P.",
    }
  ];

  const activities = [
    {
      user: "Kenneth A.",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "2h ago"
    },
    {
      user: "You",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "4h ago"
    },
    {
      user: "Matthew",
      action: "moved task to REDLINE / TO DO",
      time: "1d ago"
    },
    {
      user: "Armando",
      action: "uploaded CDO-0063-Planning-Entitlement",
      time: "2d ago"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={15} 
          minSize={15} 
          maxSize={35}
          collapsedSize={4}
          collapsible={true}
          onCollapse={() => setSidebarCollapsed(true)}
          onExpand={() => setSidebarCollapsed(false)}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            {/* Top Bar */}
            <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="relative max-w-md w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
                  New
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
                  Upgrade
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Main Content */}
              <div className="flex-1 max-w-4xl flex flex-col">
                {/* Header */}
                <div className="border-b border-border px-6 py-3 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigate('/tasks')} 
                      className="p-1 hover:bg-accent rounded"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <Select value={selectedProject} onValueChange={handleProjectChange}>
                      <SelectTrigger className="w-auto border-none shadow-none p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProjects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="ml-auto">
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {task.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4 space-y-6">
                    {/* Task Title */}
                    <div>
                      <h1 className="text-xl font-semibold mb-2">{task.title}</h1>
                      <Select value={selectedProject} onValueChange={handleProjectChange}>
                        <SelectTrigger className="w-auto border-none shadow-none p-0 h-auto text-sm text-muted-foreground hover:text-foreground bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProjects.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2">
                        <textarea 
                          placeholder="Add description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full min-h-[120px] border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-vertical"
                        />
                      </div>
                    </div>

                    {/* Task Details Form */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Created by</label>
                        <select className="w-full border border-border rounded px-2 py-1 text-sm">
                          <option>Select User</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Date Created</label>
                        <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-border rounded px-2 py-1 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Assigned to</label>
                        <select className="w-full border border-border rounded px-2 py-1 text-sm">
                          <option>Select User</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Mark Complete</label>
                        <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-border rounded px-2 py-1 text-sm" />
                      </div>
                    </div>

                    {/* Attachments */}
                    <div>
                      <h2 className="text-base font-semibold mb-3">Attachments</h2>
                      
                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Drop your files here to upload</p>
                      </div>

                      {/* Attachments Table */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground py-2 border-b">
                          <div className="col-span-6">Name</div>
                          <div className="col-span-3">Date Created</div>
                          <div className="col-span-3">by</div>
                        </div>
                        
                        {attachments.map((attachment, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 text-sm py-2 hover:bg-accent/50 rounded">
                            <div className="col-span-6 flex items-center gap-2">
                              <Paperclip className="w-4 h-4 text-orange-500" />
                              <span className="text-blue-600 hover:underline cursor-pointer text-xs">{attachment.name}</span>
                            </div>
                            <div className="col-span-3 text-muted-foreground text-xs">{attachment.dateCreated}</div>
                            <div className="col-span-3 text-muted-foreground text-xs">{attachment.author}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Sidebar */}
              <div className="w-80 border-l border-border bg-background flex flex-col">
                <div className="p-4 border-b border-border flex-shrink-0">
                  <h3 className="font-semibold text-sm">Activity</h3>
                </div>
                
                {/* Scrollable Activity Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3 mb-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="text-xs">
                        <div className="font-medium">{activity.user}</div>
                        <div className="text-muted-foreground mt-1 text-xs leading-relaxed">{activity.action}</div>
                        <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input - Fixed at bottom */}
                <div className="p-4 border-t border-border flex-shrink-0">
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Type your message" 
                      className="w-full border border-border rounded px-3 py-2 text-xs"
                    />
                    <div className="flex items-center justify-between">
                      <button className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Paperclip className="w-3 h-3" />
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs flex items-center gap-1">
                        <Send className="w-3 h-3" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TaskDetailPage;
