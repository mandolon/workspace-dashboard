
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FolderOpen, Trash2 } from 'lucide-react';

interface InvoiceActionsMenuProps {
  invoiceId: string;
  onMove: (invoiceId: string) => void;
  onDelete: (invoiceId: string) => void;
  triggerOnRowClick?: boolean;
}

const InvoiceActionsMenu = ({ invoiceId, onMove, onDelete, triggerOnRowClick = false }: InvoiceActionsMenuProps) => {
  if (triggerOnRowClick) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute inset-0 cursor-context-menu" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onMove(invoiceId)} className="cursor-pointer">
            <FolderOpen className="w-4 h-4 mr-2" />
            Move to...
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(invoiceId)} 
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
          <span className="sr-only">Open menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onMove(invoiceId)} className="cursor-pointer">
          <FolderOpen className="w-4 h-4 mr-2" />
          Move to...
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(invoiceId)} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvoiceActionsMenu;
