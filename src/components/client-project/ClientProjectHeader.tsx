import React from 'react';
import { Search, Filter, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClientProjectHeaderProps {
  projectName: string;
}

const ClientProjectHeader = ({ projectName }: ClientProjectHeaderProps) => {
  return (
    <div className="border-b border-border bg-background">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{projectName}</h1>
            <p className="text-sm text-muted-foreground mt-1">Project overview and management</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search project..."
                className="pl-9 w-64"
              />
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            
            <div className="flex border border-border rounded-md">
              <Button variant="ghost" size="sm" className="border-r border-border rounded-none">
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-none">
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort by <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last updated</DropdownMenuItem>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Date created</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectHeader;