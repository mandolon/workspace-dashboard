
import React from 'react';
import WhiteboardCard from './WhiteboardCard';

interface WhiteboardsGridProps {
  viewMode: 'grid' | 'list';
}

const WhiteboardsGrid = ({ viewMode }: WhiteboardsGridProps) => {
  // Mock data for whiteboards with project associations
  const whiteboards = [
    {
      id: '1',
      title: 'Project Requirements.pdf',
      type: 'pdf',
      lastModified: '2 hours ago',
      thumbnail: '/placeholder.svg',
      projectName: 'Adams • 1063 40th Street',
    },
    {
      id: '2',
      title: 'Design Mockups.pdf',
      type: 'pdf',
      lastModified: '1 day ago',
      thumbnail: '/placeholder.svg',
      projectName: 'Ogden-Thew • 2709 T Street',
    },
    {
      id: '3',
      title: 'Client Feedback.pdf',
      type: 'pdf',
      lastModified: '3 days ago',
      thumbnail: '/placeholder.svg',
      projectName: 'Henderson • 1524 Tiverton',
    },
    {
      id: '4',
      title: 'Technical Specifications.pdf',
      type: 'pdf',
      lastModified: '1 week ago',
      thumbnail: '/placeholder.svg',
      projectName: 'Peterson • 2015 10th Street',
    },
    {
      id: '5',
      title: 'Meeting Notes.pdf',
      type: 'pdf',
      lastModified: '2 weeks ago',
      thumbnail: '/placeholder.svg',
      projectName: 'Johnson • 2200 I Street',
    },
    {
      id: '6',
      title: 'Contract Review.pdf',
      type: 'pdf',
      lastModified: '1 month ago',
      thumbnail: '/placeholder.svg',
      projectName: 'Adamo • 6605 S. Land Park Dr.',
    },
  ];

  if (viewMode === 'list') {
    return (
      <div className="px-6 py-4">
        <div className="space-y-2">
          {whiteboards.map((whiteboard) => (
            <div key={whiteboard.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-muted rounded flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">{whiteboard.title}</div>
                <div className="text-xs text-muted-foreground">{whiteboard.projectName}</div>
                <div className="text-xs text-muted-foreground">{whiteboard.lastModified}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {whiteboards.map((whiteboard) => (
          <WhiteboardCard key={whiteboard.id} whiteboard={whiteboard} />
        ))}
      </div>
    </div>
  );
};

export default WhiteboardsGrid;
