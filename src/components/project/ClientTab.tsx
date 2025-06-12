
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';

const ClientTab = () => {
  const [formData, setFormData] = useState({
    firstName: 'Celine',
    lastName: 'Donaldson',
    projectAddress: '2717 58th Street',
    city: 'Sacramento',
    state: 'CA',
    billingAddress: '2717 58th Street',
    billingCity: 'Sacramento',
    billingState: 'CA',
    projectName: '',
    projectScope: '',
    projectNotes: '',
    status: 'in-progress',
    startDate: '5/8/23',
    duration: '5 Weeks'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 mt-0">
      {/* Header with client name and project address */}
      <div className="border-b border-border pb-3 mb-3">
        <h1 className="text-lg font-semibold text-foreground">
          {formData.firstName} {formData.lastName}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-0.5">
          <MapPin className="w-3 h-3" />
          <span className="text-xs">{formData.projectAddress}</span>
        </div>
      </div>

      {/* Status and Date Info */}
      <div className="flex justify-end items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{formData.startDate}, {formData.duration}</span>
        </div>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger className="w-32 h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Information Table */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-medium text-foreground mb-2">Client Information</h3>
          <div className="space-y-0.5">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground py-1 border-b">
              <div className="col-span-3">Field</div>
              <div className="col-span-9">Value</div>
            </div>
            
            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">First Name</div>
              <div className="col-span-9">
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Last Name</div>
              <div className="col-span-9">
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Address Table */}
        <div>
          <h3 className="text-xs font-medium text-foreground mb-2">Project Address</h3>
          <div className="space-y-0.5">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground py-1 border-b">
              <div className="col-span-3">Field</div>
              <div className="col-span-9">Value</div>
            </div>
            
            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Address</div>
              <div className="col-span-9">
                <Input
                  value={formData.projectAddress}
                  onChange={(e) => handleInputChange('projectAddress', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">City</div>
              <div className="col-span-9">
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">State</div>
              <div className="col-span-9">
                <Input
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address Table */}
        <div>
          <h3 className="text-xs font-medium text-foreground mb-2">Billing Address</h3>
          <div className="space-y-0.5">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground py-1 border-b">
              <div className="col-span-3">Field</div>
              <div className="col-span-9">Value</div>
            </div>
            
            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Address</div>
              <div className="col-span-9">
                <Input
                  value={formData.billingAddress}
                  onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">City</div>
              <div className="col-span-9">
                <Input
                  value={formData.billingCity}
                  onChange={(e) => handleInputChange('billingCity', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">State</div>
              <div className="col-span-9">
                <Input
                  value={formData.billingState}
                  onChange={(e) => handleInputChange('billingState', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Information Table */}
        <div>
          <h3 className="text-xs font-medium text-foreground mb-2">Project Information</h3>
          <div className="space-y-0.5">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground py-1 border-b">
              <div className="col-span-3">Field</div>
              <div className="col-span-9">Value</div>
            </div>
            
            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Project Name</div>
              <div className="col-span-9">
                <Textarea
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="min-h-[40px] text-xs resize-none"
                  placeholder="Enter project name..."
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Project Scope</div>
              <div className="col-span-9">
                <Textarea
                  value={formData.projectScope}
                  onChange={(e) => handleInputChange('projectScope', e.target.value)}
                  className="min-h-[40px] text-xs resize-none"
                  placeholder="Describe the project scope..."
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Project Notes</div>
              <div className="col-span-9">
                <Textarea
                  value={formData.projectNotes}
                  onChange={(e) => handleInputChange('projectNotes', e.target.value)}
                  className="min-h-[50px] text-xs resize-none"
                  placeholder="Add any additional project notes..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-3">
          <Button size="sm" className="text-xs">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ClientTab;
