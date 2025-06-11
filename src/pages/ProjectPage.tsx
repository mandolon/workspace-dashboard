import React, { useState } from 'react';
import { ArrowLeft, Menu, FileText, Calendar, MessageSquare, ExternalLink, Users, Folder } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskGroup from '@/components/TaskGroup';

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Convert URL-friendly projectId back to display name
  const getProjectName = (id: string | undefined) => {
    const projectMap: Record<string, string> = {
      'ogden-thew-2709-t-street': 'Ogden - Thew - 2709 T Street',
      'adams-1063-40th-street': 'Adams - 1063 40th Street',
      'tiverton': '1524 Tiverton',
      'i-street': '2015 10th Street',
    };
    return projectMap[id || ''] || 'Unknown Project';
  };

  const projectName = getProjectName(projectId);

  // Mock data for files
  const files = [
    {
      name: "CDO-0063-Planning-Entitlement-Application - Letter of Agency",
      dateCreated: "Jul 31, 2024",
      author: "Matthew P.",
      type: "pdf"
    },
    {
      name: "CDO-0220-Owner-Builder-F...",
      dateCreated: "Aug 17, 2024", 
      author: "Armando L.",
      type: "pdf"
    },
    {
      name: "Agent-for-Owner-Authorizat...",
      dateCreated: "Aug 11, 2024",
      author: "Armando L.", 
      type: "pdf"
    },
    {
      name: "James Hall",
      dateCreated: "Aug 2, 2024",
      author: "Matthew P.",
      type: "contact"
    },
    {
      name: "Corina McCoy", 
      dateCreated: "Jul 23, 2024",
      author: "Matthew P.",
      type: "contact"
    }
  ];

  // Task data from the overview page
  const taskGroups = [
    {
      title: "To Do",
      count: 7,
      color: "bg-gray-400",
      tasks: [
        {
          id: 1,
          title: "Review building permits",
          project: projectName,
          estimatedCompletion: "2 days",
          dateCreated: "Jul 15, 2024",
          dueDate: "Jul 30, 2024",
          assignee: {
            name: "MP",
            avatar: "bg-blue-500"
          },
          hasAttachment: true
        },
        {
          id: 2,
          title: "Schedule site inspection",
          project: projectName,
          estimatedCompletion: "1 day",
          dateCreated: "Jul 16, 2024",
          dueDate: "Jul 25, 2024",
          assignee: {
            name: "AL",
            avatar: "bg-green-500"
          },
          hasAttachment: false
        }
      ]
    },
    {
      title: "In Progress",
      count: 3,
      color: "bg-blue-500",
      tasks: [
        {
          id: 3,
          title: "Coordinate with city planning",
          project: projectName,
          estimatedCompletion: "3 days",
          dateCreated: "Jul 10, 2024",
          dueDate: "Jul 28, 2024",
          assignee: {
            name: "MP",
            avatar: "bg-blue-500"
          },
          hasAttachment: true,
          collaborators: [
            {
              name: "AL",
              avatar: "bg-green-500"
            }
          ]
        }
      ]
    },
    {
      title: "Done",
      count: 12,
      color: "bg-green-500",
      tasks: [
        {
          id: 4,
          title: "Initial client consultation",
          project: projectName,
          estimatedCompletion: "Completed",
          dateCreated: "Jul 1, 2024",
          dueDate: "Jul 5, 2024",
          assignee: {
            name: "MP",
            avatar: "bg-blue-500"
          },
          hasAttachment: false
        }
      ]
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-3 h-3 text-red-500" />;
      case 'contact':
        return <Users className="w-3 h-3 text-blue-500" />;
      default:
        return <FileText className="w-3 h-3 text-gray-500" />;
    }
  };

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
            <div className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col max-w-5xl mx-auto">
                {/* Header with Breadcrumb */}
                <div className="border-b border-border px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">PinerWorks</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="font-semibold text-sm">{projectName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">Agents</span>
                        <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">2</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
                      <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
                      <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="files" className="flex-1 flex flex-col">
                  <div className="border-b border-border px-4 flex-shrink-0">
                    <TabsList className="h-auto p-0 bg-transparent">
                      <TabsTrigger 
                        value="files" 
                        className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
                      >
                        <FileText className="w-3 h-3" />
                        Files
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tasks" 
                        className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
                      >
                        <Calendar className="w-3 h-3" />
                        Tasks
                      </TabsTrigger>
                      <TabsTrigger 
                        value="message" 
                        className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Message
                      </TabsTrigger>
                      <TabsTrigger 
                        value="invoices" 
                        className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
                      >
                        <FileText className="w-3 h-3" />
                        Invoices
                      </TabsTrigger>
                      <TabsTrigger 
                        value="links" 
                        className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Links
                      </TabsTrigger>
                      <TabsTrigger 
                        value="client" 
                        className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
                      >
                        <Users className="w-3 h-3" />
                        Client
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Files Tab Content */}
                  <TabsContent value="files" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="space-y-0.5">
                      {/* Header Row */}
                      <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
                        <div className="col-span-6">Name</div>
                        <div className="col-span-3">Date Created</div>
                        <div className="col-span-3">by</div>
                      </div>
                      
                      {/* File Rows */}
                      {files.map((file, index) => (
                        <div key={index} className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30">
                          <div className="col-span-6 flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="text-blue-600 hover:underline truncate">{file.name}</span>
                          </div>
                          <div className="col-span-3 text-muted-foreground">{file.dateCreated}</div>
                          <div className="col-span-3 text-muted-foreground">{file.author}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Tasks Tab Content */}
                  <TabsContent value="tasks" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="space-y-8">
                      {taskGroups.map((group, index) => (
                        <TaskGroup
                          key={index}
                          title={group.title}
                          count={group.count}
                          color={group.color}
                          tasks={group.tasks}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  {/* Other Tab Contents (placeholder) */}
                  <TabsContent value="message" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="text-center text-muted-foreground">Message content coming soon...</div>
                  </TabsContent>

                  <TabsContent value="invoices" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="text-center text-muted-foreground">Invoice content coming soon...</div>
                  </TabsContent>

                  <TabsContent value="links" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="text-center text-muted-foreground">Links content coming soon...</div>
                  </TabsContent>

                  <TabsContent value="client" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="text-center text-muted-foreground">Client content coming soon...</div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProjectPage;
