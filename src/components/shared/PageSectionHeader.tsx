
import React from "react";

interface PageSectionHeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const PageSectionHeader = ({ title, children, className }: PageSectionHeaderProps) => {
  return (
    <div className={`px-6 pt-6 pb-4 flex items-center justify-between ${className || ''}`}>
      <h1 className="text-lg font-semibold">{title}</h1>
      {children}
    </div>
  );
};

export default PageSectionHeader;
