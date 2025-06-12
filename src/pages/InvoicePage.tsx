
import React, { useState } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PageHeader from '@/components/shared/PageHeader';
import Sidebar from '@/components/Sidebar';

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

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={15} 
          minSize={15} 
          maxSize={35}
          collapsedSize={4}
          collapsible={true}
          onCollapse={() => setSidebarCollapsed(true)}
          onExpand={() => setSidebarCollapsed(false)}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            <PageHeader 
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className="flex-1 bg-background p-4">
              <div className="h-full flex flex-col max-w-6xl mx-auto">
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

                <div className="space-y-6">
                  {/* Details Section */}
                  <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Details</h2>
                    <div className="text-sm text-muted-foreground mb-4">
                      Date: November 23, 2023
                    </div>
                    
                    <div className="mb-6">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="project1">Project 1</SelectItem>
                          <SelectItem value="project2">Project 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Invoice ID</span>
                          <span className="text-sm font-medium">#RH25000355</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Date</span>
                          <span className="text-sm font-medium">Feb 2, 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Submitted to:</span>
                          <span className="text-sm font-medium">-</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Project Address:</span>
                          <span className="text-sm font-medium">-</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Total</div>
                          <div className="text-2xl font-bold">${total.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Line Items Section */}
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
                          onValueChange={(value) => updateLineItem(index, 'phase', value)}
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
                          onChange={(e) => updateLineItem(index, 'workDescription', e.target.value)}
                        />
                        <Input 
                          placeholder="Placeholder"
                          value={item.amount}
                          onChange={(e) => updateLineItem(index, 'amount', e.target.value)}
                          type="number"
                        />
                      </div>
                    ))}

                    <button 
                      onClick={addLineItem}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6"
                    >
                      <Plus className="w-4 h-4" />
                      Add Line Item
                    </button>

                    {/* Totals */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Fee (3.5%)</span>
                        <span className="font-medium">${processingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Send Invoice Button */}
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                      📧 Send Invoice
                    </Button>
                  </div>
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
