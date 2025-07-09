import React from 'react';
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
          <TabsList className="h-auto p-0 bg-transparent gap-8">
            <TabsTrigger 
              value="files" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              Files
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="invoices" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              Invoices
            </TabsTrigger>
            <TabsTrigger 
              value="links" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              Links
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              Project
            </TabsTrigger>
            <TabsTrigger 
              value="client" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
              Client
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="px-0 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent border-b-2 border-transparent hover:border-muted-foreground/50 transition-colors"
            >
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
            <div className="p-4 text-center text-muted-foreground">Links content coming soon...</div>
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