
import React, { useState } from 'react';
import { Menu, Search, Star, Archive, Delete, MoreVertical, Inbox, Send, FileText, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const InboxPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const emails = [
    {
      id: '1',
      sender: 'John Doe',
      subject: 'Project Update - Ogden Thew Development',
      preview: 'Hi team, I wanted to provide an update on the current progress...',
      time: '2:30 PM',
      isRead: false,
      isStarred: false,
    },
    {
      id: '2',
      sender: 'Sarah Wilson',
      subject: 'Invoice #RH15465 - Schematic Design Phase',
      preview: 'Please find attached the invoice for the schematic design phase...',
      time: '1:15 PM',
      isRead: true,
      isStarred: true,
    },
    {
      id: '3',
      sender: 'Michael Chen',
      subject: 'Task Assignment: Review Building Plans',
      preview: 'A new task has been assigned to you for the 2709 T Street project...',
      time: '11:45 AM',
      isRead: false,
      isStarred: false,
    },
    {
      id: '4',
      sender: 'Emma Thompson',
      subject: 'Meeting Reminder: Client Review Tomorrow',
      preview: 'This is a reminder about tomorrow\'s client review meeting...',
      time: 'Yesterday',
      isRead: true,
      isStarred: false,
    },
    {
      id: '5',
      sender: 'David Park',
      subject: 'File Upload: Updated Floor Plans Available',
      preview: 'The updated floor plans for the Tiverton project have been uploaded...',
      time: 'Monday',
      isRead: true,
      isStarred: true,
    },
  ];

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(selectedEmails.length === emails.length ? [] : emails.map(e => e.id));
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel 
          defaultSize={15} 
          minSize={15} 
          maxSize={35}
          collapsedSize={4}
          collapsible={true}
          onCollapse={() => setSidebarCollapsed(true)}
          onExpand={() => setSidebarCollapsed(false)}
          className="min-h-screen"
        >
          <div className="h-screen overflow-hidden">
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={85} className="min-h-screen">
          <div className="flex flex-col h-screen">
            {/* Top Bar */}
            <div className="h-14 border-b border-border flex items-center px-4 flex-shrink-0">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search mail"
                    className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm">Compose</Button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col max-w-6xl mx-auto">
                {/* Inbox Header */}
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Inbox className="w-5 h-5" />
                      <h1 className="text-xl font-semibold">Inbox</h1>
                      <span className="text-sm text-muted-foreground">({emails.filter(e => !e.isRead).length} unread)</span>
                    </div>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="px-4 py-2 border-b border-border flex items-center gap-2">
                  <Checkbox 
                    checked={selectedEmails.length === emails.length}
                    onCheckedChange={handleSelectAll}
                  />
                  {selectedEmails.length > 0 && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Delete className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Email List */}
                <div className="flex-1 overflow-y-auto">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      className={`px-4 py-3 border-b border-border hover:bg-accent/50 cursor-pointer transition-colors ${
                        !email.isRead ? 'bg-accent/20' : ''
                      } ${selectedEmails.includes(email.id) ? 'bg-blue-50' : ''}`}
                      onClick={() => handleSelectEmail(email.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedEmails.includes(email.id)}
                          onCheckedChange={() => handleSelectEmail(email.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button 
                          className={`p-1 hover:bg-accent rounded ${email.isStarred ? 'text-yellow-500' : 'text-muted-foreground hover:text-foreground'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Star className={`w-4 h-4 ${email.isStarred ? 'fill-current' : ''}`} />
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className={`text-sm truncate ${!email.isRead ? 'font-semibold' : 'font-normal'}`}>
                                {email.sender}
                              </span>
                              <span className={`text-sm truncate ${!email.isRead ? 'font-semibold' : 'font-normal'}`}>
                                {email.subject}
                              </span>
                              <span className="text-sm text-muted-foreground truncate">
                                - {email.preview}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                              {email.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default InboxPage;
