import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WhiteboardsContent from '@/components/whiteboards/WhiteboardsContent';
import TldrawWhiteboard from '@/components/whiteboards/TldrawWhiteboard';

const WhiteboardsPage = () => {
  return (
    <AppLayout>
      {/* Demo: Show a live tldraw editor above our normal content */}
      <div className="max-w-5xl mx-auto w-full px-4">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">tldraw whiteboard (demo)</h2>
          <TldrawWhiteboard />
        </div>
      </div>
      <WhiteboardsContent />
    </AppLayout>
  );
};

export default WhiteboardsPage;
