
import React from 'react';
import { Archive, Trash2, Star, MoreHorizontal, RotateCcw, Tag, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InboxToolbarProps {
  selectedEmails: string[];
  totalEmails: number;
  onSelectAll: () => void;
}

const InboxToolbar = ({ selectedEmails, totalEmails, onSelectAll }: InboxToolbarProps) => {
  return (
    <div className="px-4 py-2 border-b border-border flex items-center gap-2">
      <Checkbox 
        checked={selectedEmails.length === totalEmails && totalEmails > 0}
        onCheckedChange={onSelectAll}
      />
      
      <Button variant="ghost" size="sm" className="h-8 px-2">
        <RotateCcw className="w-4 h-4" />
      </Button>
      
      {selectedEmails.length > 0 && (
        <>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Tag className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Clock className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Mark as read</DropdownMenuItem>
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuItem>Move to folder</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Report spam</DropdownMenuItem>
              <DropdownMenuItem>Block sender</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default InboxToolbar;
