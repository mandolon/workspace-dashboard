
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceDetailsProps {
  total: number;
}

const InvoiceDetails = ({ total }: InvoiceDetailsProps) => {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Details</h2>
      <div className="text-sm text-muted-foreground mb-4">
        Date: November 23, 2023
      </div>
      
      <div className="mb-6">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Invoice ID</span>
            <span className="text-sm font-medium">#RH25000355</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm font-medium">Feb 2, 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Submitted to:</span>
            <span className="text-sm font-medium">-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Project Address:</span>
            <span className="text-sm font-medium">-</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold">${total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
