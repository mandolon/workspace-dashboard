
import React, { useRef, useEffect, useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';

interface TaskDetailActivityProps {
  taskId?: string;
}

interface ActivityMessage {
  id: number;
  user: string;
  avatar: string;
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

/**
 * Task activity/chat component for Task Detail.
 * Keeps messages client-side (resets on refresh).
 * UI similar to MessagesTab, per-task.
 */
const TaskDetailActivity = ({ taskId }: TaskDetailActivityProps) => {
  const { currentUser } = useUser();
  const [messages, setMessages] = useState<ActivityMessage[]>([
    {
      id: 1,
      user: "Kenneth A.",
      avatar: "KA",
      message: "Welcome to the Task Activity chat.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000 * 2),
      isCurrentUser: false,
    },
    {
      id: 2,
      user: currentUser?.name || "You",
      avatar: (currentUser?.name || "Y").split(' ').map((n) => n[0]).join('').toUpperCase(),
      message: "Let's keep track of all task-related discussion here.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isCurrentUser: true,
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const messageListRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Human friendly timestamp ("Just now", "2h ago")
  function getRelativeTime(date: Date) {
    const now = new Date();
    const diffMillis = now.getTime() - date.getTime();
    if (diffMillis < 60 * 1000) return 'Just now';
    if (diffMillis < 60 * 60 * 1000) return `${Math.floor(diffMillis / (60 * 1000))}m ago`;
    if (diffMillis < 24 * 60 * 60 * 1000) return `${Math.floor(diffMillis / (60 * 60 * 1000))}h ago`;
    return date.toLocaleDateString();
  }

  const handleSendMessage = () => {
    const trimmed = messageInput.trim();
    if (!trimmed) return;
    const user = currentUser?.name || "You";
    const avatar = (currentUser?.name || "Y").split(' ').map((n) => n[0]).join('').toUpperCase();

    setMessages((msgs) => [
      ...msgs,
      {
        id: (msgs[msgs.length - 1]?.id ?? 0) + 1,
        user,
        avatar,
        message: trimmed,
        timestamp: new Date(),
        isCurrentUser: true,
      },
    ]);
    setMessageInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Activity Header */}
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-semibold">Activity</h3>
      </div>

      {/* Message List */}
      <div ref={messageListRef} className="flex-1 overflow-y-auto p-3 space-y-6 max-h-full">
        {messages.map((msg, idx) => (
          <div key={msg.id} className="space-y-2">
            <div className={`flex gap-3 ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              {!msg.isCurrentUser && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-blue-500 text-white text-xs font-medium">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-xs ${msg.isCurrentUser ? 'order-first' : ''}`}>
                {!msg.isCurrentUser && (
                  <div className="text-xs font-medium mb-1">{msg.user}</div>
                )}
                <div className={`p-2 rounded-lg text-xs break-words ${
                  msg.isCurrentUser
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-muted'
                }`}>
                  {msg.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{getRelativeTime(msg.timestamp)}</div>
              </div>
              {msg.isCurrentUser && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-green-500 text-white text-xs font-medium">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-border bg-background">
        <div className="flex items-center gap-2">
          <textarea
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message and press Enter"
            className="flex-1 border border-border rounded-md px-3 py-2 text-xs min-h-[36px] max-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            autoFocus={false}
          />
          <button
            className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            onClick={() => {/* handle attachment or file */}}
            type="button"
            tabIndex={-1}
            title="Attach file"
          >
            <Paperclip className="w-3 h-3" />
          </button>
          <button
            className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            type="button"
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            title="Send"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailActivity;

