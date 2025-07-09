import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const ClientProjectMessages = () => {
  const messages = [
    {
      id: '1',
      user: 'John Smith',
      avatar: 'JS',
      message: 'Foundation inspection completed successfully. Moving to electrical phase next week.',
      timestamp: '2 hours ago',
      isOwn: false
    },
    {
      id: '2',
      user: 'You',
      avatar: 'YO',
      message: 'Great! When do you expect the electrical work to begin?',
      timestamp: '1 hour ago',
      isOwn: true
    },
    {
      id: '3',
      user: 'Mike Johnson',
      avatar: 'MJ',
      message: 'Electrical rough-in is scheduled for tomorrow morning. Should be completed by Friday.',
      timestamp: '30 minutes ago',
      isOwn: false
    },
    {
      id: '4',
      user: 'You',
      avatar: 'YO',
      message: 'Perfect timing. Will the plumbing team coordinate with electrical?',
      timestamp: '15 minutes ago',
      isOwn: true
    },
    {
      id: '5',
      user: 'Sarah Davis',
      avatar: 'SD',
      message: 'Yes, we\'ll start plumbing rough-in right after electrical is done to avoid conflicts.',
      timestamp: '5 minutes ago',
      isOwn: false
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
            {!message.isOwn && (
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarFallback className="text-xs bg-primary/10">{message.avatar}</AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-md ${message.isOwn ? 'order-first' : ''}`}>
              <div className={`rounded-lg p-2 ${
                message.isOwn 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-muted'
              }`}>
                {!message.isOwn && (
                  <div className="text-xs font-medium mb-1">{message.user}</div>
                )}
                <p className="text-sm">{message.message}</p>
              </div>
              <div className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? 'text-right' : ''}`}>
                {message.timestamp}
              </div>
            </div>

            {message.isOwn && (
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarFallback className="text-xs bg-primary/10">{message.avatar}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <Input 
            placeholder="Type your message..." 
            className="flex-1 h-9"
          />
          <Button size="sm" className="h-9 px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectMessages;