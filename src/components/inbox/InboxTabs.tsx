
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InboxTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const InboxTabs = ({ activeTab, onTabChange, currentPage, totalPages, onPageChange }: InboxTabsProps) => {
  return (
    <div className="border-b border-border">
      <div className="px-4 py-2 flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1">
          <TabsList className="bg-transparent h-auto p-0 space-x-6">
            <TabsTrigger 
              value="inbox" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Inbox
            </TabsTrigger>
            <TabsTrigger 
              value="drafts" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Drafts
            </TabsTrigger>
            <TabsTrigger 
              value="sent" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Sent
            </TabsTrigger>
            <TabsTrigger 
              value="archive" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Archive
            </TabsTrigger>
            <TabsTrigger 
              value="trash" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2"
            >
              Trash
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Pagination arrows */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InboxTabs;
