
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  isHidden: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarHidden: (hidden: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleSidebar = () => {
    if (isHidden) {
      // If hidden, show it in expanded mode
      setIsHidden(false);
      setIsCollapsed(false);
    } else if (isCollapsed) {
      // If collapsed, expand it
      setIsCollapsed(false);
    } else {
      // If expanded, collapse it
      setIsCollapsed(true);
    }
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  const setSidebarHidden = (hidden: boolean) => {
    setIsHidden(hidden);
    if (hidden) {
      setIsCollapsed(false); // Reset collapsed state when hiding
    }
  };

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      isHidden, 
      toggleSidebar, 
      setSidebarCollapsed, 
      setSidebarHidden 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};
