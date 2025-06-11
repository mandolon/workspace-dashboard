
import React, { useState } from 'react';
import { ArrowLeft, Menu, FileText, Calendar, MessageSquare, ExternalLink, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

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
      // Add more mappings as needed
    };
    return projectMap[id || ''] || 'Unknown Project';
  };

  const projectName = getProjectName(projectId);

  // Mock data for files based on your screenshot
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

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'contact':
        return <Users className="w-4 h-4 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
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
              <div className="h-full flex flex-col max-w-6xl mx-auto">
                {/* Header */}
                <div className="border-b border-border px-6 py-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigate('/')} 
                      className="p-1 hover:bg-accent rounded"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">PinerWorks</span>
                      <span className="text-sm text-muted-foreground">/</span>
                      <h1 className="text-lg font-semibold">{projectName}</h1>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-border px-6 flex-shrink-0">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                      <FileText className="w-4 h-4" />
                      Files
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      <Calendar className="w-4 h-4" />
                      Tasks
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      <FileText className="w-4 h-4" />
                      Invoices
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-4 h-4" />
                      Links
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      <Users className="w-4 h-4" />
                      Client
                    </button>
                  </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-1">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground py-2 border-b">
                      <div className="col-span-6">Name</div>
                      <div className="col-span-3">Date Created</div>
                      <div className="col-span-3">by</div>
                    </div>
                    
                    {/* File Rows */}
                    {files.map((file, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 text-sm py-3 hover:bg-accent/50 rounded cursor-pointer border-b border-border/50">
                        <div className="col-span-6 flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <span className="text-blue-600 hover:underline truncate">{file.name}</span>
                        </div>
                        <div className="col-span-3 text-muted-foreground text-sm">{file.dateCreated}</div>
                        <div className="col-span-3 text-muted-foreground text-sm">{file.author}</div>
                      </div>
                    ))}
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

export default ProjectPage;
