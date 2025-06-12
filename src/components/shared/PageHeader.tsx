
import React from 'react';
import { Menu } from 'lucide-react';

interface PageHeaderProps {
  onToggleSidebar?: () => void;
}

const PageHeader = ({ 
  onToggleSidebar
}: PageHeaderProps) => {
  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
