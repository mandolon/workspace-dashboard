import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import EmailDetail from '@/components/EmailDetail';
import InboxHeader from '@/components/inbox/InboxHeader';
import InboxToolbar from '@/components/inbox/InboxToolbar';
import EmailList from '@/components/inbox/EmailList';

const InboxPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = 5;

  const emails = [
    {
      id: '1',
      sender: 'John Doe',
      subject: 'Project Update - Ogden Thew Development',
      preview: 'Hi team, I wanted to provide an update on the current progress...',
      time: '2:30 PM',
      isRead: false,
      isStarred: false,
      hasAttachment: true,
      status: 'inbox',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `
        <p>Hi team,</p>
        
        <p>I wanted to provide an update on the current progress of the Ogden Thew Development project. We've completed the initial design phase and are moving forward with the next steps.</p>
        
        <p>Key accomplishments this week:</p>
        <ul>
          <li>Finalized schematic designs</li>
          <li>Obtained preliminary approvals</li>
          <li>Scheduled site visit for next week</li>
        </ul>
        
        <p>Please let me know if you have any questions or concerns.</p>
        
        <p>Best regards,<br>John Doe</p>
      `,
      senderEmail: 'john.doe@company.com',
      recipient: 'team@company.com',
    },
    {
      id: '2',
      sender: 'Sarah Wilson',
      subject: 'Invoice #RH15465 - Schematic Design Phase',
      preview: 'Please find attached the invoice for the schematic design phase...',
      time: '1:15 PM',
      isRead: true,
      isStarred: true,
      hasAttachment: true,
      status: 'inbox',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '3',
      sender: 'Michael Chen',
      subject: 'Task Assignment: Review Building Plans',
      preview: 'A new task has been assigned to you for the 2709 T Street project...',
      time: '11:45 AM',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      status: 'archive',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '4',
      sender: 'Emma Thompson',
      subject: 'Meeting Reminder: Client Review Tomorrow',
      preview: 'This is a reminder about tomorrow\'s client review meeting...',
      time: 'Yesterday',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      status: 'sent',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '5',
      sender: 'David Park',
      subject: 'File Upload: Updated Floor Plans Available',
      preview: 'The updated floor plans for the Tiverton project have been uploaded...',
      time: 'Monday',
      isRead: true,
      isStarred: true,
      hasAttachment: true,
      status: 'archive',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '6',
      sender: 'Lisa Rodriguez',
      subject: 'Budget Approval Request - Q4 Marketing',
      preview: 'We need approval for the Q4 marketing budget allocation...',
      time: 'Monday',
      isRead: false,
      isStarred: false,
      hasAttachment: true,
      status: 'trash',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '7',
      sender: 'Tech Support',
      subject: 'System Maintenance Scheduled',
      preview: 'Scheduled maintenance will occur this weekend from 2 AM to 6 AM...',
      time: 'Sunday',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      status: 'sent',
    },
    {
      id: '8',
      sender: 'Newsletter Team',
      subject: 'Weekly Industry Update - Architecture Trends',
      preview: 'This week\'s highlights include sustainable design innovations...',
      time: 'Friday',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      status: 'inbox',
    },
    {
      id: '9',
      sender: 'Me',
      subject: 'Draft: Proposal for New Office Space',
      preview: 'Working on the proposal for the downtown office expansion...',
      time: '3:45 PM',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      status: 'drafts',
    },
    {
      id: '10',
      sender: 'Me',
      subject: 'Draft: Follow-up on Client Meeting',
      preview: 'Thank you for taking the time to meet with us yesterday...',
      time: '10:30 AM',
      isRead: false,
      isStarred: true,
      hasAttachment: false,
      status: 'drafts',
    },
  ];

  const filteredEmails = useMemo(() => {
    let tabFilteredEmails = emails;

    // Filter by tab
    switch (activeTab) {
      case 'inbox':
        tabFilteredEmails = emails.filter(email => email.status === 'inbox');
        break;
      case 'drafts':
        tabFilteredEmails = emails.filter(email => email.status === 'drafts');
        break;
      case 'sent':
        tabFilteredEmails = emails.filter(email => email.status === 'sent');
        break;
      case 'archive':
        tabFilteredEmails = emails.filter(email => email.status === 'archive');
        break;
      case 'trash':
        tabFilteredEmails = emails.filter(email => email.status === 'trash');
        break;
      default:
        tabFilteredEmails = emails.filter(email => email.status === 'inbox');
    }

    // Filter by search query
    if (!searchQuery.trim()) {
      return tabFilteredEmails;
    }
    
    const query = searchQuery.toLowerCase();
    return tabFilteredEmails.filter(email => 
      email.sender.toLowerCase().includes(query) ||
      email.subject.toLowerCase().includes(query) ||
      email.preview.toLowerCase().includes(query) ||
      (email.senderEmail && email.senderEmail.toLowerCase().includes(query))
    );
  }, [activeTab, searchQuery]);

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(selectedEmails.length === filteredEmails.length ? [] : filteredEmails.map(e => e.id));
  };

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Reset selection when searching
    setSelectedEmails([]);
    setSelectedEmail(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedEmails([]);
    setSelectedEmail(null);
    setCurrentPage(1);
  };

  const currentEmail = selectedEmail ? emails.find(e => e.id === selectedEmail) : null;
  const unreadCount = filteredEmails.filter(e => !e.isRead).length;

  return (
    <AppLayout>
      <div className="flex-1 bg-background pl-2">
        <div className="h-full flex flex-col">
          {selectedEmail && currentEmail ? (
            <EmailDetail email={currentEmail} onBack={handleBackToList} />
          ) : (
            <>
              <InboxHeader 
                unreadCount={unreadCount}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <InboxToolbar 
                selectedEmails={selectedEmails}
                totalEmails={filteredEmails.length}
                onSelectAll={handleSelectAll}
              />
              <EmailList 
                emails={filteredEmails}
                selectedEmails={selectedEmails}
                onSelectEmail={handleSelectEmail}
                onEmailClick={handleEmailClick}
              />
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default InboxPage;
