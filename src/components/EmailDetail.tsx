
import React from 'react';
import { ArrowLeft, Star, Archive, Delete, Reply, ReplyAll, Forward, MoreVertical, Printer, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface EmailDetailProps {
  email: {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    time: string;
    isRead: boolean;
    isStarred: boolean;
    content?: string;
    senderEmail?: string;
    recipient?: string;
  };
  onBack: () => void;
}

const EmailDetail = ({ email, onBack }: EmailDetailProps) => {
  const emailContent = email.content || `
    <p>Hi team,</p>
    
    <p>I wanted to provide an update on the current progress of the Ogden Thew Development project. We've completed the initial design phase and are moving forward with the next steps.</p>
    
    <p>Key accomplishments this week:</p>
    <ul>
      <li>Finalized schematic designs</li>
      <li>Obtained preliminary approvals</li>
      <li>Scheduled site visit for next week</li>
    </ul>
    
    <p>Please let me know if you have any questions or concerns.</p>
    
    <p>Best regards,<br>${email.sender}</p>
  `;

  const senderInitials = email.sender.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold truncate">{email.subject}</h2>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Delete className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Star className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Email Header Info */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
              {senderInitials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{email.sender}</h3>
                <p className="text-sm text-muted-foreground">
                  {email.senderEmail || `${email.sender.toLowerCase().replace(' ', '.')}@example.com`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{email.time}</p>
                <Button variant="ghost" size="sm">
                  <Star className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </Button>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              <span>to {email.recipient || 'me'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-none">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: emailContent }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <ReplyAll className="w-4 h-4 mr-2" />
            Reply all
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="w-4 h-4 mr-2" />
            Forward
          </Button>
          
          <div className="flex-1" />
          
          <Button variant="ghost" size="sm">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <FileDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
