
import React from 'react';
import { Archive, Trash2, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

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
        </>
      )}
    </div>
  );
};

export default InboxToolbar;
