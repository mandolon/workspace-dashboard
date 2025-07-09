import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientProjectFiles = () => {
  const files = [
    { name: 'Project Proposal.pdf', size: '2.4 MB', modified: '2 days ago', type: 'pdf' },
    { name: 'Floor Plans.dwg', size: '5.2 MB', modified: '1 week ago', type: 'dwg' },
    { name: 'Material Specs.xlsx', size: '1.8 MB', modified: '3 days ago', type: 'xlsx' },
    { name: 'Progress Photos.zip', size: '45.2 MB', modified: '1 day ago', type: 'zip' },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <FileText className="w-8 h-8 text-primary" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-medium text-sm mb-1 line-clamp-2">{file.name}</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>{file.size}</p>
                <p>Modified {file.modified}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientProjectFiles;