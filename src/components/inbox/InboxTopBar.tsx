import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ComposeDialog from '@/components/inbox/ComposeDialog';

interface InboxTopBarProps {
  onToggleSidebar: () => void; // Kept for type compatibility, unused
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const InboxTopBar = (_props: InboxTopBarProps) => {
  // This bar is now empty as Compose button moves to floating FAB
  return (
    <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0" />
  );
};

export default InboxTopBar;
