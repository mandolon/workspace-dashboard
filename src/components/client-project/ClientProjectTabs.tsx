import React from 'react';
import { FileText, Calendar, MessageSquare, ExternalLink, Users, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientProjectFiles from './ClientProjectFiles';
import ClientProjectTasks from './ClientProjectTasks';
import ClientProjectMessages from './ClientProjectMessages';
import ClientProjectInvoices from './ClientProjectInvoices';
import ClientProjectClient from './ClientProjectClient';
import ClientProjectSettings from './ClientProjectSettings';

interface ClientProjectTabsProps {
  projectName: string;
  projectId: string;
  onDataChange?: () => void;
}

const ClientProjectTabs = ({ projectName, projectId, onDataChange }: ClientProjectTabsProps) => {
  return (
    <div className="h-full">
      <Tabs defaultValue="files" className="h-full flex flex-col">
        <div className="border-b border-border px-6 flex-shrink-0">
          <TabsList className="h-auto p-0 bg-transparent gap-6">
            <TabsTrigger 
              value="files" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Files
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="invoices" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger 
              value="links" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Links
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Project
            </TabsTrigger>
            <TabsTrigger 
              value="client" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <Users className="w-4 h-4" />
              Client
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="files" className="mt-0 h-full">
            <ClientProjectFiles />
          </TabsContent>

          <TabsContent value="tasks" className="mt-0 h-full">
            <ClientProjectTasks projectName={projectName} projectId={projectId} />
          </TabsContent>

          <TabsContent value="invoices" className="mt-0 h-full">
            <ClientProjectInvoices />
          </TabsContent>

          <TabsContent value="links" className="mt-0 h-full">
            <div className="p-6 text-center text-muted-foreground">Links content coming soon...</div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0 h-full">
            <ClientProjectSettings />
          </TabsContent>

          <TabsContent value="client" className="mt-0 h-full">
            <ClientProjectClient onDataChange={onDataChange} />
          </TabsContent>

          <TabsContent value="chat" className="mt-0 h-full">
            <ClientProjectMessages />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ClientProjectTabs;