
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';

// Client data mapping for all projects - using LastName - Address format
const projectClientData: Record<string, any> = {
  'adams-1063-40th-street': {
    firstName: 'Robert', lastName: 'Adams', projectAddress: '1063 40th Street',
    city: 'Sacramento', state: 'CA', clientId: 'ADAMS-001'
  },
  'ogden-thew-2709-t-street': {
    firstName: 'Margaret', lastName: 'Ogden-Thew', projectAddress: '2709 T Street',
    city: 'Sacramento', state: 'CA', clientId: 'OGDEN-001'
  },
  'henderson-1524-tiverton': {
    firstName: 'James', lastName: 'Henderson', projectAddress: '1524 Tiverton',
    city: 'Sacramento', state: 'CA', clientId: 'HEND-001'
  },
  'peterson-2015-10th-street': {
    firstName: 'Linda', lastName: 'Peterson', projectAddress: '2015 10th Street',
    city: 'Sacramento', state: 'CA', clientId: 'PETE-001'
  },
  'johnson-2200-i-street': {
    firstName: 'Michael', lastName: 'Johnson', projectAddress: '2200 I Street',
    city: 'Sacramento', state: 'CA', clientId: 'JOHN-001'
  },
  'adamo-6605-s-land-park-dr': {
    firstName: 'Anthony', lastName: 'Adamo', projectAddress: '6605 S. Land Park Dr.',
    city: 'Sacramento', state: 'CA', clientId: 'ADAM-001'
  },
  'mcvarish-salmina-6251-el-dorado-street': {
    firstName: 'Patricia', lastName: 'McVarish-Salmina', projectAddress: '6251 El Dorado Street',
    city: 'Sacramento', state: 'CA', clientId: 'MCVA-001'
  },
  'andre-2119-h-street': {
    firstName: 'David', lastName: 'Andre', projectAddress: '2119 H Street',
    city: 'Sacramento', state: 'CA', clientId: 'ANDR-001'
  },
  'fleming-veisze-1111-33rd-street': {
    firstName: 'Sarah', lastName: 'Fleming-Veisze', projectAddress: '1111 33rd Street',
    city: 'Sacramento', state: 'CA', clientId: 'FLEM-001'
  },
  'ganson-2125-i-street': {
    firstName: 'William', lastName: 'Ganson', projectAddress: '2125 I Street',
    city: 'Sacramento', state: 'CA', clientId: 'GANS-001'
  },
  'decarlo-1141-swanston-dr': {
    firstName: 'Maria', lastName: 'DeCarlo', projectAddress: '1141 Swanston Dr',
    city: 'Sacramento', state: 'CA', clientId: 'DECA-001'
  },
  'green-920-u-street': {
    firstName: 'Christopher', lastName: 'Green', projectAddress: '920 U Street',
    city: 'Sacramento', state: 'CA', clientId: 'GREE-001'
  },
  'kubein-plymouth-project': {
    firstName: 'Jennifer', lastName: 'Kubein', projectAddress: 'Plymouth Project',
    city: 'Sacramento', state: 'CA', clientId: 'KUBE-001'
  },
  'mcleod-joffe-2436-59th-street': {
    firstName: 'Thomas', lastName: 'McLeod-Joffe', projectAddress: '2436 59th Street',
    city: 'Sacramento', state: 'CA', clientId: 'MCLE-001'
  },
  'piner-piner-haus-garage': {
    firstName: 'Richard', lastName: 'Piner', projectAddress: 'Piner Haus Garage',
    city: 'Sacramento', state: 'CA', clientId: 'PINE-001'
  },
  'rathbun-usfs-cabin': {
    firstName: 'Barbara', lastName: 'Rathbun', projectAddress: 'USFS Cabin',
    city: 'Sacramento', state: 'CA', clientId: 'RATH-001'
  },
  'vasquez-gutierrez-2508-55th-street': {
    firstName: 'Carlos', lastName: 'Vasquez-Gutierrez', projectAddress: '2508 55th Street',
    city: 'Sacramento', state: 'CA', clientId: 'VASQ-001'
  },
  'wilcox-1808-u-street': {
    firstName: 'Nancy', lastName: 'Wilcox', projectAddress: '1808 U Street',
    city: 'Sacramento', state: 'CA', clientId: 'WILC-001'
  },
  'donaldson-2717-58th-street': {
    firstName: 'Celine', lastName: 'Donaldson', projectAddress: '2717 58th Street',
    city: 'Sacramento', state: 'CA', clientId: 'DONA-001'
  }
};

const ClientTab = () => {
  const { projectId } = useParams();
  
  // Get client data based on current project ID
  const getClientData = () => {
    if (projectId && projectClientData[projectId]) {
      return projectClientData[projectId];
    }
    // Default fallback
    return {
      firstName: 'John', lastName: 'Doe', projectAddress: 'Unknown Address',
      city: 'Sacramento', state: 'CA', clientId: 'UNKN-001'
    };
  };

  const [formData, setFormData] = useState(() => {
    const clientData = getClientData();
    return {
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      projectAddress: clientData.projectAddress,
      city: clientData.city,
      state: clientData.state,
      clientId: clientData.clientId,
      billingAddress: clientData.projectAddress,
      billingCity: clientData.city,
      billingState: clientData.state,
      projectName: '',
      projectScope: '',
      projectNotes: '',
      status: 'in-progress',
      startDate: '5/8/23',
      duration: '5 Weeks'
    };
  });

  // Update form data when project changes
  useEffect(() => {
    const clientData = getClientData();
    setFormData(prev => ({
      ...prev,
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      projectAddress: clientData.projectAddress,
      city: clientData.city,
      state: clientData.state,
      clientId: clientData.clientId,
      billingAddress: clientData.projectAddress,
      billingCity: clientData.city,
      billingState: clientData.state,
    }));
  }, [projectId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate project display name in "LastName • Address" format
  const getProjectDisplayName = () => {
    return `${formData.lastName} • ${formData.projectAddress}`;
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 mt-0">
      {/* Header with client name and project address */}
      <div className="border-b border-border pb-3 mb-3">
        <h1 className="text-lg font-semibold text-foreground">
          {getProjectDisplayName()}
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
            <div className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
              <div className="col-span-3 text-muted-foreground">Client ID</div>
              <div className="col-span-9">
                <Input
                  value={formData.clientId}
                  onChange={(e) => handleInputChange('clientId', e.target.value)}
                  className="h-6 text-xs"
                />
              </div>
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
