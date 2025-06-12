
import React from 'react';
import { FileText, Plus, Settings, Download, CheckCircle, Clock, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvoiceDetails from './InvoiceDetails';
import InvoiceLineItems from './InvoiceLineItems';
import InvoiceTotals from './InvoiceTotals';
import InvoiceSendButton from './InvoiceSendButton';

interface InvoiceTabsProps {
  lineItems: any[];
  onAddLineItem: () => void;
  onUpdateLineItem: (index: number, field: string, value: string) => void;
  subtotal: number;
  processingFee: number;
  total: number;
}

const InvoiceTabs = ({ 
  lineItems, 
  onAddLineItem, 
  onUpdateLineItem, 
  subtotal, 
  processingFee, 
  total 
}: InvoiceTabsProps) => {
  const invoices = [
    {
      id: "RH15465",
      phase: "Schematic Design",
      status: "Paid",
      amount: "$304.65",
      dateCreated: "Jan 12, 2023, 8:00 AM"
    },
    {
      id: "RH65842",
      phase: "Design Development",
      status: "Sent",
      amount: "$450.00",
      dateCreated: "Jan 15, 2023, 2:30 PM"
    },
    {
      id: "RH78123",
      phase: "Construction Documents",
      status: "Unpaid",
      amount: "$750.25",
      dateCreated: "Jan 20, 2023, 10:15 AM"
    },
    {
      id: "RH89456",
      phase: "Construction Administration",
      status: "Paid",
      amount: "$525.80",
      dateCreated: "Jan 25, 2023, 4:45 PM"
    },
    {
      id: "RH91234",
      phase: "Site Analysis",
      status: "Sent",
      amount: "$200.00",
      dateCreated: "Jan 30, 2023, 9:00 AM"
    }
  ];

  const renderInvoiceTable = (filteredInvoices: typeof invoices) => (
    <div className="flex-1 overflow-y-auto p-4 mt-0">
      <div className="space-y-0.5">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-1.5 border-b">
          <div className="col-span-2">Invoice</div>
          <div className="col-span-3">Phase</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">Date Created</div>
        </div>
        
        {/* Invoice Rows */}
        {filteredInvoices.map((invoice, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 text-xs py-2 hover:bg-accent/50 rounded cursor-pointer border-b border-border/30 group">
            <div className="col-span-2">
              <span className="text-blue-600 hover:underline">{invoice.id}</span>
            </div>
            <div className="col-span-3 text-muted-foreground">{invoice.phase}</div>
            <div className="col-span-2 text-muted-foreground">{invoice.status}</div>
            <div className="col-span-2 text-muted-foreground">{invoice.amount}</div>
            <div className="col-span-3 flex items-center justify-between">
              <span className="text-muted-foreground">{invoice.dateCreated}</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                <Download className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
        {filteredInvoices.length === 0 && (
          <div className="text-center text-muted-foreground py-8">No invoices found</div>
        )}
      </div>
    </div>
  );

  return (
    <Tabs defaultValue="invoices" className="flex-1 flex flex-col">
      <div className="border-b border-border px-4 flex-shrink-0">
        <TabsList className="h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="invoices" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <FileText className="w-3 h-3" />
            Invoices
          </TabsTrigger>
          <TabsTrigger 
            value="paid" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <CheckCircle className="w-3 h-3" />
            Paid
          </TabsTrigger>
          <TabsTrigger 
            value="unpaid" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <Clock className="w-3 h-3" />
            Unpaid
          </TabsTrigger>
          <TabsTrigger 
            value="sent" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <Send className="w-3 h-3" />
            Sent
          </TabsTrigger>
          <TabsTrigger 
            value="new-invoice" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <Plus className="w-3 h-3" />
            New Invoice
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <Settings className="w-3 h-3" />
            Settings
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Tab Contents */}
      <div className="px-4 pt-3 flex-1 overflow-hidden">
        <TabsContent value="invoices" className="mt-0 h-full">
          {renderInvoiceTable(invoices)}
        </TabsContent>

        <TabsContent value="paid" className="mt-0 h-full">
          {renderInvoiceTable(invoices.filter(invoice => invoice.status === "Paid"))}
        </TabsContent>

        <TabsContent value="unpaid" className="mt-0 h-full">
          {renderInvoiceTable(invoices.filter(invoice => invoice.status === "Unpaid"))}
        </TabsContent>

        <TabsContent value="sent" className="mt-0 h-full">
          {renderInvoiceTable(invoices.filter(invoice => invoice.status === "Sent"))}
        </TabsContent>

        <TabsContent value="new-invoice" className="mt-0 h-full">
          <div className="space-y-6">
            <InvoiceDetails total={total} />

            <div className="bg-card border rounded-lg p-6">
              <InvoiceLineItems
                lineItems={lineItems}
                onAddLineItem={onAddLineItem}
                onUpdateLineItem={onUpdateLineItem}
              />
              <InvoiceTotals
                subtotal={subtotal}
                processingFee={processingFee}
                total={total}
              />
            </div>

            <InvoiceSendButton />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-0 h-full">
          <div className="text-center text-muted-foreground">Invoice settings coming soon...</div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default InvoiceTabs;
