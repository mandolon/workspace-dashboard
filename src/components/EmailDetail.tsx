import React, { useState } from 'react';
import { ArrowLeft, Star, Archive, Delete, Reply, ReplyAll, Forward, MoreVertical, Printer, FileDown, Send, Paperclip, Smile, Image, Calendar, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

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

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleSendReply = () => {
    // In a real app, this would send the reply
    console.log('Sending reply:', replyMessage);
    setShowReplyForm(false);
    setReplyMessage('');
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
    setReplyMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Gmail-style toolbar */}
      <div className="px-6 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-200">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-200">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-200">
            <Delete className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-200">
            <Star className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-200">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Email content container with white background */}
      <div className="flex-1 overflow-y-auto bg-white p-6">
        {/* Email card */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Email header with subject */}
          <div className="p-6 border-b border-gray-100">
            {/* Subject line */}
            <div className="mb-6">
              <h1 className="text-2xl font-normal text-gray-900">{email.subject}</h1>
            </div>

            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                  {senderInitials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{email.sender}</h3>
                    <p className="text-sm text-gray-600">
                      to {email.recipient || 'me'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{email.time}</span>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Star className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email content */}
          <div className="p-6">
            <div 
              className="prose prose-gray max-w-none text-gray-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: emailContent }}
            />
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="bg-white border-gray-300 hover:bg-gray-50"
                onClick={handleReply}
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50">
                <Forward className="w-4 h-4 mr-2" />
                Forward
              </Button>
            </div>
          </div>

          {/* Inline Reply Form */}
          {showReplyForm && (
            <div className="border-t border-gray-200 bg-gray-50">
              <div className="p-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  {/* Reply header */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Reply to {email.sender}</h3>
                  </div>

                  {/* Reply fields */}
                  <div className="px-4 py-2 space-y-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-8">To</span>
                      <Input
                        value={email.senderEmail || ''}
                        readOnly
                        className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto bg-gray-50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-8">Subject</span>
                      <Input
                        value={`Re: ${email.subject}`}
                        readOnly
                        className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Formatting toolbar */}
                  <div className="px-4 py-2 border-b border-gray-200 bg-gray-100">
                    <div className="flex items-center gap-1">
                      <select className="text-sm border-0 bg-transparent">
                        <option>Sans Serif</option>
                      </select>
                      <Separator orientation="vertical" className="h-4" />
                      <Button variant="ghost" size="sm" className="h-6 px-1">
                        <span className="font-bold text-sm">B</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-1">
                        <span className="italic text-sm">I</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-1">
                        <span className="underline text-sm">U</span>
                      </Button>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="p-4">
                    <Textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="border-0 shadow-none resize-none focus-visible:ring-0 min-h-32"
                    />
                  </div>

                  {/* Bottom toolbar */}
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={handleSendReply}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancelReply}
                        className="bg-white border-gray-300 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Image className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
