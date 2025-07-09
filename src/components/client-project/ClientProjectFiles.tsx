import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Download, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">{file.type}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{file.size}</TableCell>
              <TableCell className="text-muted-foreground">{file.modified}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientProjectFiles;