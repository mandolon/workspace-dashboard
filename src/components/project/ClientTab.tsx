
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="space-y-6">
      {/* Header with client name and project address */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {formData.firstName} {formData.lastName}
        </h1>
        <div className="flex items-center gap-2 text-gray-600 mt-1">
          <MapPin className="w-4 h-4" />
          <span>{formData.projectAddress}</span>
        </div>
      </div>

      {/* Status and Date Info */}
      <div className="flex justify-end items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formData.startDate}, {formData.duration}</span>
        </div>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger className="w-40">
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

      <Card>
        <CardContent className="p-6">
          {/* Client Information */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Project Address */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-2">
              <Label htmlFor="projectAddress">Project Address</Label>
              <Input
                id="projectAddress"
                value={formData.projectAddress}
                onChange={(e) => handleInputChange('projectAddress', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                id="billingAddress"
                value={formData.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="billingCity">City</Label>
              <Input
                id="billingCity"
                value={formData.billingCity}
                onChange={(e) => handleInputChange('billingCity', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="billingState">State</Label>
              <Input
                id="billingState"
                value={formData.billingState}
                onChange={(e) => handleInputChange('billingState', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Project Information */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Textarea
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="mt-1 min-h-32"
                placeholder="Enter project name..."
              />
            </div>
            <div>
              <Label htmlFor="projectScope">Project Scope</Label>
              <Textarea
                id="projectScope"
                value={formData.projectScope}
                onChange={(e) => handleInputChange('projectScope', e.target.value)}
                className="mt-1 min-h-32"
                placeholder="Describe the project scope..."
              />
            </div>
          </div>

          {/* Project Notes */}
          <div className="mb-6">
            <Label htmlFor="projectNotes">Project Notes</Label>
            <Textarea
              id="projectNotes"
              value={formData.projectNotes}
              onChange={(e) => handleInputChange('projectNotes', e.target.value)}
              className="mt-1 min-h-32"
              placeholder="Add any additional project notes..."
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientTab;
