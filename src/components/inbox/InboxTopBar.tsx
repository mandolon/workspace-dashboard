
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ComposeDialog from '@/components/inbox/ComposeDialog';

interface InboxTopBarProps {
  onToggleSidebar: () => void; // Kept for type compatibility, unused
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const InboxTopBar = (_props: InboxTopBarProps) => {
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  return (
    <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0 justify-end">
      <Button 
        size="sm" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium"
        onClick={() => setShowComposeDialog(true)}
      >
        Compose
      </Button>
      <ComposeDialog
        isOpen={showComposeDialog}
        onClose={() => setShowComposeDialog(false)}
      />
    </div>
  );
};

export default InboxTopBar;

