import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ClientProjectClientProps {
  onDataChange?: () => void;
}

const ClientProjectClient = ({ onDataChange }: ClientProjectClientProps) => {
  return (
    <div className="p-4 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Client Information */}
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Client Information</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName" className="text-xs">First Name</Label>
              <Input id="firstName" defaultValue="Robert" className="h-8 text-sm" />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-xs">Last Name</Label>
              <Input id="lastName" defaultValue="Adams" className="h-8 text-sm" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input id="email" defaultValue="robert.adams@email.com" className="h-8 text-sm" />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-xs">Phone</Label>
            <Input id="phone" defaultValue="(555) 123-4567" className="h-8 text-sm" />
          </div>

          <div>
            <Label htmlFor="company" className="text-xs">Company</Label>
            <Input id="company" defaultValue="Adams Construction LLC" className="h-8 text-sm" />
          </div>
        </div>

        {/* Project Address */}
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Project Address</h3>
          </div>
          
          <div>
            <Label htmlFor="address" className="text-xs">Street Address</Label>
            <Input id="address" defaultValue="1063 40th Street" className="h-8 text-sm" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="city" className="text-xs">City</Label>
              <Input id="city" defaultValue="Sacramento" className="h-8 text-sm" />
            </div>
            <div>
              <Label htmlFor="state" className="text-xs">State</Label>
              <Input id="state" defaultValue="CA" className="h-8 text-sm" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="zipCode" className="text-xs">ZIP Code</Label>
            <Input id="zipCode" defaultValue="95819" className="h-8 text-sm" />
          </div>

          <div>
            <Label htmlFor="projectType" className="text-xs">Project Type</Label>
            <Input id="projectType" defaultValue="Kitchen Renovation" className="h-8 text-sm" />
          </div>
        </div>

        {/* Project Notes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border-b border-border pb-2">
            <h3 className="font-medium text-sm">Project Notes</h3>
          </div>
          
          <Textarea 
            placeholder="Add project notes, special instructions, or important details..."
            className="min-h-20 text-sm"
            defaultValue="Kitchen renovation project with modern appliances. Client prefers neutral colors and open concept design. Special attention to lighting and counter space."
          />
          
          <div className="flex justify-end">
            <Button onClick={onDataChange} size="sm">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectClient;