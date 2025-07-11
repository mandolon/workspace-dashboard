import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      {/* Messages Table */}
      <div className="flex-1 p-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-12"></TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-24">User</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Message</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline w-20">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-b">
            {messages.map((message) => (
              <TableRow key={message.id} className="hover:bg-accent/50">
                <TableCell className="py-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-primary/10">{message.avatar}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="py-2 font-medium text-sm">{message.user}</TableCell>
                <TableCell className="py-2 text-sm">{message.message}</TableCell>
                <TableCell className="py-2 text-xs text-muted-foreground">{message.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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