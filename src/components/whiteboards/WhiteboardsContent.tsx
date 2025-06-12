
import React, { useState } from 'react';
import WhiteboardsHeader from './WhiteboardsHeader';
import WhiteboardsGrid from './WhiteboardsGrid';

const WhiteboardsContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Last viewed');

  return (
    <div className="h-full flex flex-col bg-background">
      <WhiteboardsHeader 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
      <div className="flex-1 overflow-auto">
        <WhiteboardsGrid viewMode={viewMode} />
      </div>
    </div>
  );
};

export default WhiteboardsContent;
