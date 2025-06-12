
import React from 'react';
import InvoiceRow from './InvoiceRow';

interface Invoice {
  id: string;
  lastName: string;
  projectAddress: string;
  status: string;
  amount: string;
  dateCreated: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  onOpenPDF: (invoiceId: string, e: React.MouseEvent) => void;
  onDownloadPDF: (invoiceId: string, e: React.MouseEvent) => void;
}

const InvoiceTable = ({ invoices, onOpenPDF, onDownloadPDF }: InvoiceTableProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 mt-0">
      <div className="space-y-0.5">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
          <div className="col-span-2">Last Name</div>
          <div className="col-span-3">Project Address</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Date Created</div>
          <div className="col-span-1">Invoice</div>
        </div>
        
        {/* Invoice Rows */}
        {invoices.map((invoice, index) => (
          <InvoiceRow
            key={index}
            invoice={invoice}
            onOpenPDF={onOpenPDF}
            onDownloadPDF={onDownloadPDF}
          />
        ))}
        {invoices.length === 0 && (
          <div className="text-center text-muted-foreground py-8">No invoices found</div>
        )}
      </div>
    </div>
  );
};

export default InvoiceTable;
