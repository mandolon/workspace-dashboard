
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WhiteboardsContent from '@/components/whiteboards/WhiteboardsContent';

const WhiteboardsPage = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto w-full px-4" />
      <WhiteboardsContent />
    </AppLayout>
  );
};

export default WhiteboardsPage;

