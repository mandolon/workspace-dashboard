
import React from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LineItem {
  phase: string;
  workDescription: string;
  amount: string;
}

interface InvoiceLineItemsProps {
  lineItems: LineItem[];
  onAddLineItem: () => void;
  onUpdateLineItem: (index: number, field: string, value: string) => void;
}

const InvoiceLineItems = ({ lineItems, onAddLineItem, onUpdateLineItem }: InvoiceLineItemsProps) => {
  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-sm font-medium text-muted-foreground">Phase</div>
        <div className="text-sm font-medium text-muted-foreground">Work Description</div>
        <div className="text-sm font-medium text-muted-foreground">Amount</div>
      </div>

      {lineItems.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-4">
          <Select 
            value={item.phase} 
            onValueChange={(value) => onUpdateLineItem(index, 'phase', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="select phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schematic">Schematic Design</SelectItem>
              <SelectItem value="design-dev">Design Development</SelectItem>
              <SelectItem value="construction">Construction Documents</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            placeholder="Placeholder"
            value={item.workDescription}
            onChange={(e) => onUpdateLineItem(index, 'workDescription', e.target.value)}
          />
          <Input 
            placeholder="Placeholder"
            value={item.amount}
            onChange={(e) => onUpdateLineItem(index, 'amount', e.target.value)}
            type="number"
          />
        </div>
      ))}

      <button 
        onClick={onAddLineItem}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6"
      >
        <Plus className="w-4 h-4" />
        Add Line Item
      </button>
    </div>
  );
};

export default InvoiceLineItems;
