import React from 'react';

interface ClientTabHeaderProps {
  projectDisplayName: string;
  projectAddress: string;
  startDate: string;
  duration: string;
  status: string;
  onStatusChange: (status: string) => void;
}

const ClientTabHeader = ({
  projectDisplayName,
  projectAddress,
  startDate,
  duration,
  status,
  onStatusChange
}: ClientTabHeaderProps) => {
  return (
    <>
      {/* Status and Date Info moved to ProjectHeader */}
    </>
  );
};

export default ClientTabHeader;
