import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Download, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientProjectFiles = () => {
  const files = [
    { name: 'Project Proposal.pdf', size: '2.4 MB', modified: '2 days ago', type: 'Document' },
    { name: 'Floor Plans.dwg', size: '5.2 MB', modified: '1 week ago', type: 'Drawing' },
    { name: 'Material Specs.xlsx', size: '1.8 MB', modified: '3 days ago', type: 'Spreadsheet' },
    { name: 'Progress Photos.zip', size: '45.2 MB', modified: '1 day ago', type: 'Archive' },
    { name: 'Contract Agreement.pdf', size: '890 KB', modified: '2 weeks ago', type: 'Document' },
    { name: 'Site Survey.pdf', size: '3.1 MB', modified: '1 month ago', type: 'Document' },
  ];

  return (
    <div className="p-4 overflow-auto">
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">
                    {file.type.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.modified}</span>
                    <Badge variant="outline" className="text-xs">{file.type}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border z-50">
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
        ))}
      </div>
    </div>
  );
};

export default ClientProjectFiles;