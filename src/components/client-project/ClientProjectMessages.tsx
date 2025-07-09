import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
      message: 'Foundation inspection completed successfully. Moving to next phase.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      user: 'You',
      avatar: 'YO',
      message: 'Great! When do you expect the electrical work to begin?',
      timestamp: '1 hour ago'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      avatar: 'MJ',
      message: 'Electrical rough-in is scheduled for tomorrow morning. Should be completed by Friday.',
      timestamp: '30 minutes ago'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-4 overflow-auto">
        {messages.map((message) => (
          <Card key={message.id} className="w-fit max-w-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{message.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{message.user}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectMessages;