import React, { useState } from 'react';
import { ArrowLeft, Menu, FileText, Calendar, MessageSquare, ExternalLink, Users, Folder, ChevronDown, Plus, MoreHorizontal, Edit, Paperclip, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messageInput, setMessageInput] = useState('');

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

  // Mock data for messages
  const messages = [
    {
      id: 1,
      user: "Kenneth A.",
      avatar: "KA",
      message: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      timestamp: "Today, November 19, 2024",
      isCurrentUser: false
    },
    {
      id: 2,
      user: "You",
      avatar: "Y",
      message: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      timestamp: "",
      isCurrentUser: true
    },
    {
      id: 3,
      user: "Kenneth A.",
      avatar: "KA",
      message: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      timestamp: "",
      isCurrentUser: false
    }
  ];

  // Task data grouped by status with colored indicators
  const taskGroups = [
    {
      title: "TASK/ REDLINE",
      count: 1,
      color: "bg-red-500",
      tasks: [
        {
          id: 1,
          title: "Planning set finalized, set up CD's",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-blue-500" },
          hasAttachment: true,
          status: "redline"
        }
      ]
    },
    {
      title: "PROGRESS/ UPDATE",
      count: 3,
      color: "bg-blue-500",
      tasks: [
        {
          id: 2,
          title: "Update - 12.27.23",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-blue-500" },
          hasAttachment: true,
          status: "progress"
        },
        {
          id: 3,
          title: "Update 12.9.23",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-blue-500" },
          hasAttachment: true,
          status: "progress"
        },
        {
          id: 4,
          title: "Alternate Cabin Design",
          project: projectName,
          dateCreated: "Jan 12, 2023",
          dueDate: "June 15",
          assignee: { name: "MP", avatar: "bg-green-500" },
          hasAttachment: true,
          status: "completed"
        }
      ]
    }
  ];

  const renderStatusIcon = (status: string) => {
    const baseClasses = "w-4 h-4 rounded-full border-2 flex items-center justify-center";
    
    switch (status) {
      case 'redline':
        return (
          <div className={`${baseClasses} border-red-500 bg-red-500`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        );
      case 'progress':
        return (
          <div className={`${baseClasses} border-blue-500 bg-blue-500`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        );
      case 'completed':
        return (
          <div className={`${baseClasses} border-green-500 bg-green-500`}>
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} border-gray-300`}></div>
        );
    }
  };

  const handleTaskClick = (task: any) => {
    navigate(`/task/${task.id}`);
  };

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

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

                  {/* Tasks Tab Content - Grouped by status with colored circles */}
                  <TabsContent value="tasks" className="flex-1 overflow-y-auto p-4 mt-0">
                    <div className="space-y-4">
                      {taskGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-2">
                          {/* Group Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            <div className={`px-2 py-0.5 rounded text-white text-xs font-medium ${group.color}`}>
                              {group.title}
                            </div>
                          </div>

                          {/* Table */}
                          <Table>
                            <TableHeader>
                              <TableRow className="border-b border-border">
                                <TableHead className="text-muted-foreground font-medium text-xs py-2">Name</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-xs py-2">Date Created</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-xs py-2">Files</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-xs py-2">Assigned to</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-xs py-2">Priority</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {group.tasks.map((task) => (
                                <TableRow key={task.id} className="hover:bg-accent/50 group cursor-pointer" onClick={() => handleTaskClick(task)}>
                                  <TableCell className="py-2">
                                    <div className="flex items-center gap-2">
                                      {renderStatusIcon(task.status)}
                                      <div>
                                        <div className="font-medium text-xs">{task.title}</div>
                                        <div className="text-xs text-muted-foreground">{task.project}</div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-xs text-muted-foreground py-2">
                                    {task.dateCreated}
                                  </TableCell>
                                  <TableCell className="py-2">
                                    {task.hasAttachment && (
                                      <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="py-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center -space-x-1">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${task.assignee.avatar}`}>
                                          {task.assignee.name}
                                        </div>
                                      </div>
                                      <button 
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Handle edit action
                                        }}
                                      >
                                        <Edit className="w-3 h-3 text-muted-foreground" />
                                      </button>
                                    </div>
                                  </TableCell>
                                  <TableCell className="py-2">
                                    <button 
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle more options
                                      }}
                                    >
                                      <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
                                    </button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>

                          {/* Add Task Button */}
                          <button className="flex items-center gap-1 px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
                            <Plus className="w-3 h-3" />
                            <span>Add task</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Messages Tab Content */}
                  <TabsContent value="message" className="flex-1 flex flex-col mt-0">
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6 max-w-3xl">
                        {messages.map((message, index) => (
                          <div key={message.id} className="space-y-4">
                            {/* Show timestamp if it exists */}
                            {message.timestamp && (
                              <div className="text-center">
                                <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border">
                                  {message.timestamp}
                                </span>
                              </div>
                            )}
                            
                            <div className={`flex gap-3 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                              {!message.isCurrentUser && (
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                  <AvatarFallback className="bg-blue-500 text-white text-xs font-medium">
                                    {message.avatar}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={`max-w-lg ${message.isCurrentUser ? 'order-first' : ''}`}>
                                {!message.isCurrentUser && (
                                  <div className="text-sm font-medium mb-1">{message.user}</div>
                                )}
                                <div className={`p-3 rounded-lg text-sm ${
                                  message.isCurrentUser 
                                    ? 'bg-blue-500 text-white ml-auto' 
                                    : 'bg-muted'
                                }`}>
                                  {message.message}
                                </div>
                              </div>
                              
                              {message.isCurrentUser && (
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                  <AvatarFallback className="bg-green-500 text-white text-xs font-medium">
                                    {message.avatar}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Message Input */}
                    <div className="border-t border-border p-4">
                      <div className="max-w-3xl">
                        <div className="flex items-end gap-2">
                          <div className="flex-1 relative">
                            <textarea
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="Message"
                              className="w-full p-3 pr-10 border border-border rounded-lg resize-none min-h-[44px] max-h-32 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                              rows={1}
                            />
                            <button 
                              className="absolute right-2 bottom-2 p-1 text-muted-foreground hover:text-foreground"
                              onClick={() => {/* Handle attachment */}}
                            >
                              <Paperclip className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={handleSendMessage}
                            disabled={!messageInput.trim()}
                            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Other Tab Contents (placeholder) */}
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
