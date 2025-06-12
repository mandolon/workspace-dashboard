
import React from 'react';
import { FileText, Plus, Settings } from 'lucide-react';
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
          <div className="text-center text-muted-foreground">Invoice list coming soon...</div>
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
