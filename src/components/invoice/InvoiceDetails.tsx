
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceDetailsProps {
  total: number;
}

const InvoiceDetails = ({ total }: InvoiceDetailsProps) => {
  return (
    <div className="bg-card border rounded-lg p-4">
      <h2 className="text-sm font-medium mb-3">Details</h2>
      <div className="text-xs text-muted-foreground mb-3">
        Date: November 23, 2023
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
            <span className="text-xs text-muted-foreground">Invoice ID</span>
            <span className="text-xs font-medium">#RH25000355</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Date</span>
            <span className="text-xs font-medium">Feb 2, 2023</span>
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
