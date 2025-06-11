
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, FileText } from 'lucide-react';

const DashboardContent = () => {
  const openInvoices = [
    {
      customer: "Stephanie Sharkey",
      email: "steph56@gmail.com",
      amount: "$2,708.37"
    },
    {
      customer: "Joshua Jones",
      email: "j.jones@aol.com",
      amount: "$3,091.05"
    },
    {
      customer: "Rhonda Rhodes",
      email: "r.rhodes@outlook.com",
      amount: "$1,422.04"
    },
    {
      customer: "James Hall",
      email: "j.hall367@outlook.com",
      amount: "$7,063.79"
    },
    {
      customer: "Corina McCoy",
      email: "mc.coy@aol.com",
      amount: "$7,610.79"
    }
  ];

  const recentFiles = [
    {
      name: "Annotated_112 Fake Street.pdf",
      amount: "$6,828.59",
      type: "pdf"
    },
    {
      name: "Annotated_1921 25th Street.pdf",
      amount: "$7,534.46",
      type: "pdf"
    },
    {
      name: "Lorri Warf",
      amount: "$6,549.79",
      type: "contact"
    },
    {
      name: "Chris Glasser",
      amount: "$7,417.03",
      type: "contact"
    },
    {
      name: "Rodger Struck",
      amount: "$5,618.41",
      type: "contact"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Open Invoices */}
      <Card className="p-3">
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
          <div>
            <CardTitle className="text-lg font-semibold">Open Invoices</CardTitle>
            <p className="text-sm text-muted-foreground">Recent transactions from your store.</p>
          </div>
          <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800">
            View All <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
              <div>Customer</div>
              <div className="text-right">Amount</div>
            </div>
            {openInvoices.map((invoice, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 text-sm py-1.5">
                <div>
                  <div className="font-medium">{invoice.customer}</div>
                  <div className="text-muted-foreground text-xs">{invoice.email}</div>
                </div>
                <div className="text-right font-medium">{invoice.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Files */}
      <Card className="p-3">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-lg font-semibold">Recent Files</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-2">
            {recentFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    file.type === 'pdf' ? 'bg-red-100' : 'bg-pink-100'
                  }`}>
                    {file.type === 'pdf' ? (
                      <FileText className="w-3 h-3 text-red-600" />
                    ) : (
                      <div className="w-3 h-3 bg-pink-600 rounded"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <span className="text-sm font-medium">{file.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
