
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvoiceHeader = () => {
  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">Billing / Invoice</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-auto">
            + New Task
          </Button>
          <button className="p-2 hover:bg-accent rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
