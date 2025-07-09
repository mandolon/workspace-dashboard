import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';

interface ClientProjectClientProps {
  onDataChange?: () => void;
}

const ClientProjectClient = ({ onDataChange }: ClientProjectClientProps) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Client Information
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Robert" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Adams" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input id="email" defaultValue="robert.adams@email.com" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input id="phone" defaultValue="(555) 123-4567" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Project Address
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address</Label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Input id="address" defaultValue="1063 40th Street" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="Sacramento" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" defaultValue="CA" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input id="zipCode" defaultValue="95819" />
            </div>
          </CardContent>
        </Card>

        {/* Project Notes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Add project notes, special instructions, or important details..."
              className="min-h-32"
              defaultValue="Kitchen renovation project with modern appliances. Client prefers neutral colors and open concept design."
            />
            <div className="flex justify-end mt-4">
              <Button onClick={onDataChange}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientProjectClient;