
import React from 'react';
import { Menu, Search } from 'lucide-react';

interface PageHeaderProps {
  onToggleSidebar?: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ 
  onToggleSidebar, 
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  showSearch = true,
  actions,
  children
}: PageHeaderProps) => {
  return (
    <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0">
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}
      
      {showSearch && (
        <div className="flex-1 flex items-center justify-center">
          <div className="relative max-w-md w-full">
            {onSearchChange ? (
              <>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </>
            ) : (
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full px-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>
        </div>
      )}

      {!showSearch && <div className="flex-1" />}

      {actions || (
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
            New
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium">
            Upgrade
          </button>
        </div>
      )}

      {children}
    </div>
  );
};

export default PageHeader;
