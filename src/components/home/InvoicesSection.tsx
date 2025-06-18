
import React from 'react';
import { invoicesData } from '@/data/invoiceData';

const InvoicesSection = () => {
  const recentInvoices = invoicesData.slice(0, 8); // Show first 8 invoices

  const handleInvoiceClick = (invoiceId: string) => {
    console.log('Invoice clicked:', invoiceId);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'sent':
        return 'text-orange-600';
      case 'unpaid':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex-1 min-h-0 space-y-0">
        {/* Header */}
        <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-1 border-b mb-1">
          <div className="col-span-2">Invoice ID</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Date Created</div>
        </div>
        
        {/* Invoice rows - scrollable */}
        <div className="flex-1 overflow-y-auto space-y-0 min-h-0">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-gray-50 rounded border-b border-border/20 last:border-b-0">
              <div className="col-span-2 flex items-center">
                <span 
                  className="text-foreground hover:underline truncate cursor-pointer"
                  onClick={() => handleInvoiceClick(invoice.id)}
                >
                  {invoice.id}
                </span>
              </div>
              <div className="col-span-3 text-muted-foreground flex items-center">
                <span className="truncate max-w-[110px] text-xs text-muted-foreground block text-ellipsis">
                  {invoice.lastName}
                </span>
              </div>
              <div className="col-span-2 text-muted-foreground flex items-center">
                <span className="truncate text-xs text-muted-foreground">
                  {invoice.amount}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`truncate text-xs ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>
              <div className="col-span-3 text-muted-foreground flex items-center">
                <span className="truncate max-w-[110px] text-xs text-muted-foreground block text-ellipsis">
                  {invoice.dateCreated}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoicesSection;
