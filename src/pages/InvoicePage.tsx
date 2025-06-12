
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PageHeader from '@/components/shared/PageHeader';
import Sidebar from '@/components/Sidebar';
import InvoiceHeader from '@/components/invoice/InvoiceHeader';
import InvoiceDetails from '@/components/invoice/InvoiceDetails';
import InvoiceLineItems from '@/components/invoice/InvoiceLineItems';
import InvoiceTotals from '@/components/invoice/InvoiceTotals';
import InvoiceSendButton from '@/components/invoice/InvoiceSendButton';

const InvoicePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lineItems, setLineItems] = useState([
    { phase: '', workDescription: '', amount: '' }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { phase: '', workDescription: '', amount: '' }]);
  };

  const updateLineItem = (index: number, field: string, value: string) => {
    const updatedItems = lineItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setLineItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const subtotal = calculateSubtotal();
  const processingFee = subtotal * 0.035;
  const total = subtotal + processingFee;

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={sidebarCollapsed ? 4 : 15} 
          minSize={4} 
          maxSize={sidebarCollapsed ? 4 : 35}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={sidebarCollapsed ? 96 : 85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            <PageHeader 
              onToggleSidebar={handleToggleSidebar}
            />

            <div className="flex-1 bg-background p-4">
              <div className="h-full flex flex-col max-w-6xl mx-auto">
                <InvoiceHeader />

                <div className="space-y-6">
                  <InvoiceDetails total={total} />

                  <div className="bg-card border rounded-lg p-6">
                    <InvoiceLineItems
                      lineItems={lineItems}
                      onAddLineItem={addLineItem}
                      onUpdateLineItem={updateLineItem}
                    />
                    <InvoiceTotals
                      subtotal={subtotal}
                      processingFee={processingFee}
                      total={total}
                    />
                  </div>

                  <InvoiceSendButton />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default InvoicePage;
