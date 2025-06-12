
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceDetailsProps {
  total: number;
}

const InvoiceDetails = ({ total }: InvoiceDetailsProps) => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const currentDate = getCurrentDate();

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-sm font-medium">Invoice</h2>
        <div className="text-right">
          <div className="text-xs font-medium">#RH25000355</div>
          <div className="text-xs text-muted-foreground mt-1">{currentDate}</div>
        </div>
      </div>
      
      <div className="mb-4">
        <Select>
          <SelectTrigger className="w-full h-8 text-xs">
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Invoice Date</span>
            <span className="text-xs font-medium">{currentDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Submitted to:</span>
            <span className="text-xs font-medium">-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Project Address:</span>
            <span className="text-xs font-medium">-</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-lg font-bold">${total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
