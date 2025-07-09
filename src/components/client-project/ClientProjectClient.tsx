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
          <TableRow>
            <TableHead className="w-48">Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">First Name</TableCell>
            <TableCell>
              <Input defaultValue="Robert" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Last Name</TableCell>
            <TableCell>
              <Input defaultValue="Adams" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Email</TableCell>
            <TableCell>
              <Input defaultValue="robert.adams@email.com" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Phone</TableCell>
            <TableCell>
              <Input defaultValue="(555) 123-4567" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Company</TableCell>
            <TableCell>
              <Input defaultValue="Adams Construction LLC" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Street Address</TableCell>
            <TableCell>
              <Input defaultValue="1063 40th Street" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">City</TableCell>
            <TableCell>
              <Input defaultValue="Sacramento" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">State</TableCell>
            <TableCell>
              <Input defaultValue="CA" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ZIP Code</TableCell>
            <TableCell>
              <Input defaultValue="95819" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Project Type</TableCell>
            <TableCell>
              <Input defaultValue="Kitchen Renovation" className="h-8" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Project Notes</TableCell>
            <TableCell>
              <Textarea 
                placeholder="Add project notes, special instructions, or important details..."
                className="min-h-20"
                defaultValue="Kitchen renovation project with modern appliances. Client prefers neutral colors and open concept design. Special attention to lighting and counter space."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Button onClick={onDataChange} size="sm">Save Changes</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientProjectClient;