
import React from 'react';

interface PageSectionHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

const PageSectionHeader = ({ title, rightContent, children }: PageSectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 border-b border-border/30 bg-background">
      <h1 className="text-xl font-semibold">{title}</h1>
      {rightContent && (
        <div className="flex items-center gap-2">
          {rightContent}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageSectionHeader;
