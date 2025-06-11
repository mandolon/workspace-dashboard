
import React from 'react';
import { Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InvoicesTab = () => {
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
      phase: "June 15",
      status: "Sent",
      amount: "$304.65",
      dateCreated: "Jan 12, 2023, 8:00 AM"
    },
    {
      id: "RH15465",
      phase: "June 15",
      status: "June 15",
      amount: "$304.65",
      dateCreated: "Jan 12, 2023, 8:00 AM"
    },
    {
      id: "RH15465",
      phase: "June 15",
      status: "June 15",
      amount: "$304.65",
      dateCreated: "Jan 12, 2023, 8:00 AM"
    },
    {
      id: "RH15465",
      phase: "June 15",
      status: "June 15",
      amount: "$304.65",
      dateCreated: "Jan 12, 2023, 8:00 AM"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 mt-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Phase</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="text-blue-600 hover:underline cursor-pointer">
                {invoice.id}
              </TableCell>
              <TableCell>{invoice.phase}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.dateCreated}</TableCell>
              <TableCell>
                <button className="p-1 hover:bg-accent rounded">
                  <Download className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoicesTab;
