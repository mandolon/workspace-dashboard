
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PageHeader from '@/components/shared/PageHeader';
import Sidebar from '@/components/Sidebar';
import InvoiceHeader from '@/components/invoice/InvoiceHeader';
import InvoiceTabs from '@/components/invoice/InvoiceTabs';

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
                <InvoiceTabs
                  lineItems={lineItems}
                  onAddLineItem={addLineItem}
                  onUpdateLineItem={updateLineItem}
                  subtotal={subtotal}
                  processingFee={processingFee}
                  total={total}
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default InvoicePage;
