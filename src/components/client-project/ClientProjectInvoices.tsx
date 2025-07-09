import React from 'react';
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
      date: '2024-01-15',
      dueDate: '2024-01-30'
    },
    {
      id: 'INV-002',
      description: 'Electrical installation and permits',
      amount: '$8,750.00',
      status: 'pending',
      date: '2024-01-20',
      dueDate: '2024-02-05'
    },
    {
      id: 'INV-003',
      description: 'Plumbing materials and labor',
      amount: '$6,200.00',
      status: 'draft',
      date: '2024-01-25',
      dueDate: '2024-02-10'
    },
    {
      id: 'INV-004',
      description: 'HVAC system and installation',
      amount: '$15,300.00',
      status: 'pending',
      date: '2024-01-30',
      dueDate: '2024-02-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const totalAmount = invoices.reduce((sum, invoice) => {
    return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
  }, 0);

  const paidAmount = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, invoice) => {
      return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
    }, 0);

  return (
    <div className="p-4 overflow-auto">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Invoiced</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-800">${paidAmount.toLocaleString()}</div>
          <div className="text-xs text-green-600">Paid</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-yellow-800">${(totalAmount - paidAmount).toLocaleString()}</div>
          <div className="text-xs text-yellow-600">Outstanding</div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-2">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-sm">{invoice.id}</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{invoice.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Issued: {formatDate(invoice.date)}</span>
                  <span>•</span>
                  <span>Due: {formatDate(invoice.dueDate)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold">{invoice.amount}</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 px-2">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-2">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientProjectInvoices;