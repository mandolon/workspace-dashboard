
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvoiceHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Billing / Invoice</h1>
      <div className="flex items-center gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + New Task
        </Button>
        <button className="p-2 hover:bg-accent rounded">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
