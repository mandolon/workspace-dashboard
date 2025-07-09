import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="p-4">
      {/* Summary Table */}
      <Table className="mb-6">
        <TableBody className="[&_tr:last-child]:border-b">
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm">Total Invoiced</TableCell>
            <TableCell className="py-2 text-right font-semibold text-sm">${totalAmount.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm text-green-800">Paid</TableCell>
            <TableCell className="py-2 text-right font-semibold text-sm text-green-800">${paidAmount.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow className="hover:bg-accent/50">
            <TableCell className="py-2 font-medium text-sm text-yellow-800">Outstanding</TableCell>
            <TableCell className="py-2 text-right font-semibold text-sm text-yellow-800">${(totalAmount - paidAmount).toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Invoices Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Invoice</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Description</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Issued</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Due</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Amount</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-b">
          {invoices.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-accent/50">
              <TableCell className="py-2 font-medium text-sm">{invoice.id}</TableCell>
              <TableCell className="py-2 text-sm">{invoice.description}</TableCell>
              <TableCell className="py-2">
                <Badge variant="outline" className={`text-xs ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="py-2 text-xs text-muted-foreground">{formatDate(invoice.date)}</TableCell>
              <TableCell className="py-2 text-xs text-muted-foreground">{formatDate(invoice.dueDate)}</TableCell>
              <TableCell className="py-2 font-semibold text-sm">{invoice.amount}</TableCell>
              <TableCell className="py-2">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 px-2">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-2">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientProjectInvoices;