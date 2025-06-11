
import React, { useState } from 'react';
import { ArrowLeft, Star, Archive, Delete, Reply, Forward, MoreVertical, Send, Bold, Italic, List, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    console.log('Sending reply:', replyMessage);
    setShowReplyForm(false);
    setReplyMessage('');
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
    setReplyMessage('');
  };

  const handleFormatting = (format: string) => {
    // In a real implementation, this would apply formatting to selected text
    console.log('Applying format:', format);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Minimal toolbar */}
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

      {/* Email content */}
      <div className="flex-1 overflow-y-auto bg-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Subject */}
          <h1 className="text-xl font-normal text-gray-900 mb-4">{email.subject}</h1>

          {/* Sender info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-600 text-white text-xs">
                {senderInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{email.sender}</span>
                <span className="text-sm text-gray-500">&lt;{email.senderEmail || `${email.sender.toLowerCase().replace(' ', '.')}@company.com`}&gt;</span>
              </div>
              <div className="text-xs text-gray-500">
                to me • {email.time}
              </div>
            </div>

            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <Star className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </Button>
          </div>

          {/* Message content */}
          <div 
            className="text-sm text-gray-700 leading-relaxed mb-6 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>li]:mb-1"
            dangerouslySetInnerHTML={{ __html: emailContent }}
          />

          {/* Reply button */}
          {!showReplyForm && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReply}
              className="mb-6"
            >
              <Reply className="w-4 h-4 mr-1" />
              Reply
            </Button>
          )}

          {/* Reply form */}
          {showReplyForm && (
            <div className="border border-gray-200 rounded-lg mb-6">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">To:</span> {email.sender}
                </div>
              </div>

              {/* Formatting toolbar */}
              <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleFormatting('bold')}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleFormatting('italic')}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-4 bg-gray-300 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleFormatting('bulletList')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleFormatting('numberedList')}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3">
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply..."
                  className="border-0 shadow-none resize-none focus-visible:ring-0 min-h-24"
                />
              </div>

              <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center gap-2">
                <Button 
                  onClick={handleSendReply}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancelReply}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
