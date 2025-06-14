
import React from 'react';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TaskTableHeader = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-border">
          <TableHead className="text-xs py-1.5 w-[50%] pl-8">Name</TableHead>
          <TableHead className="text-xs py-1.5 w-[8%]">Files</TableHead>
          <TableHead className="text-xs py-1.5 w-[17%]">Date Created</TableHead>
          <TableHead className="text-xs py-1.5 w-[25%]">Assigned to</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default TaskTableHeader;
