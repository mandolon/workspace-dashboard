import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

const ClientProjectInvoices = () => {
  const invoices = [
    {
      id: 'INV-001',
      description: 'Foundation work and materials',
      amount: '$12,500.00',
      status: 'paid',
      date: '2024-01-15'
    },
    {
      id: 'INV-002',
      description: 'Electrical installation',
      amount: '$8,750.00',
      status: 'pending',
      date: '2024-01-20'
    },
    {
      id: 'INV-003',
      description: 'Plumbing materials',
      amount: '$6,200.00',
      status: 'draft',
      date: '2024-01-25'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">{invoice.id}</CardTitle>
                <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1">{invoice.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-lg text-foreground">{invoice.amount}</span>
                    <span>{new Date(invoice.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientProjectInvoices;