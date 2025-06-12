
import React from 'react';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  lastName: string;
  projectAddress: string;
  status: string;
  amount: string;
  dateCreated: string;
}

interface InvoiceRowProps {
  invoice: Invoice;
  onOpenPDF: (invoiceId: string, e: React.MouseEvent) => void;
  onDownloadPDF: (invoiceId: string, e: React.MouseEvent) => void;
}

const InvoiceRow = ({ invoice, onOpenPDF, onDownloadPDF }: InvoiceRowProps) => {
  return (
    <div className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group">
      <div className="col-span-2 text-muted-foreground">{invoice.lastName}</div>
      <div className="col-span-3 text-muted-foreground">{invoice.projectAddress}</div>
      <div className="col-span-2 text-muted-foreground">{invoice.status}</div>
      <div className="col-span-2 text-muted-foreground">{invoice.amount}</div>
      <div className="col-span-2 text-muted-foreground">{invoice.dateCreated}</div>
      <div className="col-span-1 flex items-center justify-between">
        <button 
          onClick={(e) => onOpenPDF(invoice.id, e)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {invoice.id}
        </button>
        <button 
          onClick={(e) => onDownloadPDF(invoice.id, e)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
        >
          <Download className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceRow;
