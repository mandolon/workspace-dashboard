import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';

// Shared interface for messages
interface ActivityMessage {
  id: number;
  user: string;
  avatar: string;
  message: string;
  timestamp: string; // store as ISO string for localStorage
  isCurrentUser: boolean;
}

interface TaskDetailActivityProps {
  taskId?: string;
}

/**
 * Chat panel visible to users with permission (logic handled at page level).
 * Messages are stored and read from localStorage by taskId, simulating shared chat for allowed users in the browser.
 */
const TaskDetailActivity = ({ taskId }: TaskDetailActivityProps) => {
  const { currentUser } = useUser();
  const [messages, setMessages] = useState<ActivityMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const messageListRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const storageKey = taskId ? `lovable-task-activity-${taskId}` : null;

  // Util
  function getInitials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  }

  function getRelativeTime(dateIso: string) {
    const date = new Date(dateIso);
    const now = new Date();
    const diffMillis = now.getTime() - date.getTime();
    if (diffMillis < 60 * 1000) return 'Just now';
    if (diffMillis < 60 * 60 * 1000) return `${Math.floor(diffMillis / (60 * 1000))}m ago`;
    if (diffMillis < 24 * 60 * 60 * 1000) return `${Math.floor(diffMillis / (60 * 60 * 1000))}h ago`;
    return date.toLocaleDateString();
  }

  // On mount, load messages for this task from localStorage or set default
  useEffect(() => {
    if (!storageKey) return;
    let stored: ActivityMessage[] = [];
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) stored = JSON.parse(raw) as ActivityMessage[];
    } catch {}
    if (!stored.length) {
      // First use: set builtin intro message
      stored = [
        {
          id: 1,
          user: "Kenneth A.",
          avatar: "KA",
          message: "Welcome to the Task Activity chat.",
          timestamp: new Date(Date.now() - 60 * 60 * 1000 * 2).toISOString(),
          isCurrentUser: false,
        },
        {
          id: 2,
          user: currentUser?.name || "You",
          avatar: getInitials(currentUser?.name || "You"),
          message: "Let's keep track of all task-related discussion here.",
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          isCurrentUser: true,
        },
      ];
      window.localStorage.setItem(storageKey, JSON.stringify(stored));
    }
    setMessages(stored);
    // Listen for storage updates (in other tabs)
    function storageHandler(e: StorageEvent) {
      if (e.key === storageKey && e.newValue) {
        setMessages(JSON.parse(e.newValue));
      }
    }
    window.addEventListener('storage', storageHandler);
    return () => window.removeEventListener('storage', storageHandler);
    // eslint-disable-next-line
  }, [storageKey, currentUser?.name]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Automatically adjust textarea height like ChatGPT
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 160; // pixels, for up to 8 rows
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + "px";
      setInputHeight(Math.min(scrollHeight, maxHeight));
    }
  }, [messageInput]);

  function saveMessages(next: ActivityMessage[]) {
    if (storageKey)
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    setMessages(next);
  }

  const handleSendMessage = () => {
    const trimmed = messageInput.trim();
    if (!trimmed || !currentUser) return;
    const newMsg: ActivityMessage = {
      id: (messages[messages.length - 1]?.id ?? 0) + 1,
      user: currentUser.name,
      avatar: getInitials(currentUser.name),
      message: trimmed,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };
    const next = [...messages, newMsg];
    saveMessages(next);
    setMessageInput('');
    setInputHeight(0);
    // Refocus input after send
    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.focus();
    }, 100);
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
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            <div className={`flex gap-3 ${msg.user === currentUser?.name ? 'justify-end' : 'justify-start'}`}>
              {/* Other user (left) */}
              {msg.user !== currentUser?.name && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-blue-500 text-white text-xs font-medium">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-xs ${msg.user === currentUser?.name ? 'order-first' : ''}`}>
                {msg.user !== currentUser?.name && (
                  <div className="text-xs font-medium mb-1">{msg.user}</div>
                )}
                <div className={`p-2 rounded-lg text-xs break-words ${
                  msg.user === currentUser?.name
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-muted'
                }`}>
                  {msg.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{getRelativeTime(msg.timestamp)}</div>
              </div>
              {/* Current user (right) */}
              {msg.user === currentUser?.name && (
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

      {/* ChatGPT-style Message Input */}
      <div className="p-4 border-t border-border bg-background">
        <div
          className="relative w-full mx-auto max-w-2xl"
        >
          <div className="flex flex-col">
            <div
              className={
                "relative flex items-end w-full rounded-2xl bg-muted/60 shadow-sm border border-border px-3 py-2 focus-within:ring-2 focus-within:ring-primary transition"
              }
            >
              <textarea
                ref={textareaRef}
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Shift+Enter for newline)"
                className="flex-1 resize-none bg-transparent border-none focus:ring-0 outline-none text-sm p-0 min-h-[36px] max-h-40 font-sans rounded-2xl placeholder:text-muted-foreground disabled:opacity-50"
                rows={1}
                spellCheck={true}
                autoFocus={false}
                style={{height: inputHeight ? `${inputHeight}px` : undefined}}
                aria-label="Send message"
              />
              {/* Send Button (ChatGPT style) */}
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={
                  "absolute right-2 bottom-2 transition duration-200 " +
                  (messageInput.trim()
                    ? "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-60") +
                  " rounded-full w-9 h-9 flex items-center justify-center focus:outline-none"
                }
                aria-label="Send message"
                tabIndex={0}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {/* Optional helper text below input */}
            <div className="text-[11px] text-muted-foreground text-center pt-2 pb-0">
              Press <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-xs">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-xs">Shift</kbd>+<kbd className="px-1 py-0.5 rounded bg-muted font-mono text-xs">Enter</kbd> for newline
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailActivity;
