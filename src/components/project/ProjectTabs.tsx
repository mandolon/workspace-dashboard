
import React from 'react';
import { FileText, Calendar, MessageSquare, ExternalLink, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FilesTab from './FilesTab';
import TasksTab from './TasksTab';
import MessagesTab from './MessagesTab';
import InvoicesTab from './InvoicesTab';

interface ProjectTabsProps {
  projectName: string;
}

const ProjectTabs = ({ projectName }: ProjectTabsProps) => {
  return (
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

      {/* Tab Contents */}
      <TabsContent value="files">
        <FilesTab />
      </TabsContent>

      <TabsContent value="tasks">
        <TasksTab projectName={projectName} />
      </TabsContent>

      <TabsContent value="invoices">
        <InvoicesTab />
      </TabsContent>

      <TabsContent value="links" className="flex-1 overflow-y-auto p-4 mt-0">
        <div className="text-center text-muted-foreground">Links content coming soon...</div>
      </TabsContent>

      <TabsContent value="client" className="flex-1 overflow-y-auto p-4 mt-0">
        <div className="text-center text-muted-foreground">Client content coming soon...</div>
      </TabsContent>

      <TabsContent value="chat">
        <MessagesTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
