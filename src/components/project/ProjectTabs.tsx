
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Calendar, MessageSquare, ExternalLink, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import FilesTab from './FilesTab';
import TasksTab from './TasksTab';
import MessagesTab from './MessagesTab';
import InvoicesTab from './InvoicesTab';
import ClientTab from './ClientTab';

interface ProjectTabsProps {
  projectName: string;
}

const ProjectTabs = ({ projectName }: ProjectTabsProps) => {
  const location = useLocation();
  
  // Check if we're returning from a task detail with a specific tab
  const defaultTab = location.state?.returnToTab || 'files';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
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
          <TabsTrigger 
            value="chat" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <MessageSquare className="w-3 h-3" />
            Chat
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Scrollable Tab Container */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <Tabs defaultValue={defaultTab} className="h-full">
            <TabsContent value="files" className="mt-0 h-full">
              <FilesTab />
            </TabsContent>

            <TabsContent value="tasks" className="mt-0 h-full">
              <TasksTab projectName={projectName} />
            </TabsContent>

            <TabsContent value="invoices" className="mt-0 h-full">
              <InvoicesTab />
            </TabsContent>

            <TabsContent value="links" className="mt-0 h-full">
              <div className="text-center text-muted-foreground p-4">Links content coming soon...</div>
            </TabsContent>

            <TabsContent value="client" className="mt-0 h-full">
              <ClientTab />
            </TabsContent>

            <TabsContent value="chat" className="mt-0 h-full">
              <MessagesTab />
            </TabsContent>
          </Tabs>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProjectTabs;
