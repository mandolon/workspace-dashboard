
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
            <div className="h-12 border-b border-border flex items-center px-3 flex-shrink-0">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="w-3 h-3" />
              </button>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="relative max-w-sm w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-1.5 bg-accent/50 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs font-medium">
                  New
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs font-medium">
                  Upgrade
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col max-w-5xl mx-auto">
                {/* Header */}
                <div className="border-b border-border px-4 py-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate('/')} 
                      className="p-0.5 hover:bg-accent rounded"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">PinerWorks</span>
                      <span className="text-xs text-muted-foreground">/</span>
                      <h1 className="text-sm font-semibold">{projectName}</h1>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-border px-4 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium border-b-2 border-blue-600 text-blue-600">
                      <FileText className="w-3 h-3" />
                      Files
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground hover:text-foreground">
                      <Calendar className="w-3 h-3" />
                      Tasks
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground hover:text-foreground">
                      <MessageSquare className="w-3 h-3" />
                      Message
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground hover:text-foreground">
                      <FileText className="w-3 h-3" />
                      Invoices
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-3 h-3" />
                      Links
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground hover:text-foreground">
                      <Users className="w-3 h-3" />
                      Client
                    </button>
                  </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto p-4">
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
