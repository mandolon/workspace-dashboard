import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClientProjectClientProps {
  onDataChange?: () => void;
}

const ClientProjectClient = ({ onDataChange }: ClientProjectClientProps) => {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-48">Field</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-b">
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">First Name</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="Robert" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Last Name</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="Adams" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Email</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="robert.adams@email.com" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Phone</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="(555) 123-4567" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Company</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="Adams Construction LLC" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Street Address</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="1063 40th Street" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">City</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="Sacramento" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">State</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="CA" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">ZIP Code</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="95819" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project Type</TableCell>
            <TableCell className="py-2">
              <Input defaultValue="Kitchen Renovation" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Project Notes</TableCell>
            <TableCell className="py-2">
              <Textarea 
                placeholder="Add project notes, special instructions, or important details..."
                className="min-h-20"
                defaultValue="Kitchen renovation project with modern appliances. Client prefers neutral colors and open concept design. Special attention to lighting and counter space."
              />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2"></TableCell>
            <TableCell className="py-2">
              <Button onClick={onDataChange} size="sm">Save Changes</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientProjectClient;