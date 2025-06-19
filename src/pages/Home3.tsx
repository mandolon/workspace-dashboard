import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { CheckCircle, ListTodo, Calendar, FileText, Plus, MessageSquare, Users, Settings, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Home3 = () => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const quickActions = [
    {
      icon: CheckCircle,
      title: "Check your tasks",
      description: "Review and manage your active tasks",
      preview: [
        { id: "TSK-001", title: "Review client feedback on homepage design", priority: "High", assignee: "John D.", dueDate: "Today", status: "In Progress" },
        { id: "TSK-002", title: "Complete wireframes for mobile app", priority: "Medium", assignee: "Sarah K.", dueDate: "Tomorrow", status: "To Do" },
        { id: "TSK-003", title: "Update project timeline for Q2 deliverables", priority: "High", assignee: "You", dueDate: "This Week", status: "In Review" },
        { id: "TSK-004", title: "Send final invoice to Acme Corp", priority: "Low", assignee: "Matthew P.", dueDate: "Next Week", status: "Done" },
        { id: "TSK-005", title: "Schedule team standup for next week", priority: "Medium", assignee: "Armando L.", dueDate: "Friday", status: "To Do" }
      ]
    },
    {
      icon: ListTodo,
      title: "View To Do List",
      description: "See your personal todo items",
      preview: [
        { id: "TODO-001", title: "Buy groceries for weekend", category: "Personal", priority: "Medium", dueDate: "Saturday", completed: false },
        { id: "TODO-002", title: "Call dentist to schedule appointment", category: "Health", priority: "High", dueDate: "This Week", completed: false },
        { id: "TODO-003", title: "Review quarterly budget report", category: "Work", priority: "High", dueDate: "Monday", completed: false },
        { id: "TODO-004", title: "Update LinkedIn profile", category: "Career", priority: "Low", dueDate: "Next Month", completed: false },
        { id: "TODO-005", title: "Plan team building activity", category: "Work", priority: "Medium", dueDate: "End of Month", completed: false }
      ]
    },
    {
      icon: Calendar,
      title: "Look at your schedule",
      description: "Check upcoming meetings and deadlines",
      preview: [
        { id: "CAL-001", title: "Client presentation meeting", type: "Meeting", time: "10:00 AM", duration: "1 hour", attendees: "5 people", location: "Conference Room A" },
        { id: "CAL-002", title: "Project review with Sarah", type: "1:1 Meeting", time: "2:00 PM", duration: "30 mins", attendees: "2 people", location: "Office" },
        { id: "CAL-003", title: "Team retrospective", type: "Team Meeting", time: "4:00 PM", duration: "45 mins", attendees: "8 people", location: "Virtual" },
        { id: "CAL-004", title: "Design review deadline", type: "Deadline", time: "EOD Tomorrow", duration: "All day", priority: "High", project: "Mobile App" },
        { id: "CAL-005", title: "Monthly team lunch", type: "Social", time: "12:00 PM Friday", duration: "2 hours", attendees: "12 people", location: "Downtown Restaurant" }
      ]
    },
    {
      icon: FileText,
      title: "Review Invoices",
      description: "Manage client billing and payments",
      preview: [
        { id: "INV-1234", title: "Web Development Services", amount: "$2,500", client: "Acme Corp", status: "Pending Approval", dueDate: "Due in 5 days", dateCreated: "Dec 10, 2024" },
        { id: "INV-1235", title: "UI/UX Design Package", amount: "$1,800", client: "Tech Startup", status: "Overdue", dueDate: "5 days overdue", dateCreated: "Nov 28, 2024" },
        { id: "INV-1236", title: "Consulting Services", amount: "$3,200", client: "Enterprise Co", status: "Draft", dueDate: "Not sent", dateCreated: "Dec 15, 2024" },
        { id: "INV-1237", title: "Monthly Retainer", amount: "$950", client: "Small Business", status: "Paid", dueDate: "Paid on time", dateCreated: "Dec 1, 2024" },
        { id: "INV-1238", title: "App Development", amount: "$4,100", client: "Mobile Company", status: "Sent", dueDate: "Due Dec 30", dateCreated: "Dec 16, 2024" }
      ]
    }
  ];

  const projectActions = [
    {
      icon: FileText,
      title: "Project Documentation",
      subtitle: "Help for wherever you are on your journey",
      readTime: "Read · Est. 2m"
    },
    {
      icon: Users,
      title: "About Teams and Collaboration",
      subtitle: "",
      readTime: "Read · Est. 2m"
    },
    {
      icon: Plus,
      title: "How to create your first project",
      subtitle: "",
      readTime: "Read · Est. 5m"
    },
    {
      icon: MessageSquare,
      title: "Creating a task request",
      subtitle: "",
      readTime: "Read · Est. 6m"
    },
    {
      icon: Settings,
      title: "What is Project Management?",
      subtitle: "",
      readTime: "Read · Est. 6m"
    },
    {
      icon: Calendar,
      title: "Project workflow",
      subtitle: "",
      readTime: "Read · Est. 4m"
    },
    {
      icon: Clock,
      title: "Time tracking exercise",
      subtitle: "",
      readTime: "Read · Est. 6m"
    },
    {
      icon: FileText,
      title: "Task Management Guide",
      subtitle: "",
      readTime: "Read · Est. 2m"
    }
  ];

  const recommendations = [
    {
      icon: "/lovable-uploads/055f1e94-8aee-498f-b5c8-39455c83efc2.png",
      title: "Download Project Management App",
      description: "Get the mobile app to manage your projects on-the-go, track time, and stay connected with your team.",
      buttonText: "Download"
    },
    {
      icon: Users,
      title: "Invite Team Members",
      description: "Team collaboration simplifies project workflows and brings advanced project features to your workspace, helping teams of all sizes work more effectively.",
      buttonText: "Download"
    }
  ];

  const recentActivities = [
    {
      user: "Matthew P.",
      initials: "MP",
      action: "uploaded revised Floor Plan (v2.4)",
      time: "1h ago",
      avatarColor: "bg-rose-200"
    },
    {
      user: "You",
      initials: "You",
      action: "approved design revisions",
      time: "3h ago",
      avatarColor: "bg-emerald-200"
    },
    {
      user: "Armando L.",
      initials: "AL",
      action: "added meeting minutes from last site visit",
      time: "1d ago",
      avatarColor: "bg-violet-200"
    },
    {
      user: "Sarah K.",
      initials: "SK",
      action: "shared Construction Docs – Sheet A200.pdf",
      time: "2d ago",
      avatarColor: "bg-amber-200"
    },
    {
      user: "John D.",
      initials: "JD",
      action: "completed task review for project milestone",
      time: "3d ago",
      avatarColor: "bg-cyan-200"
    }
  ];

  const renderPreviewTable = (preview: any[]) => {
    if (selectedPreview === "Check your tasks") {
      return (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Task</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Assignee</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Due</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Priority</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-0.5 px-1 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-0.5 px-1">{item.id}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.assignee}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.dueDate}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    item.priority === 'High' ? 'bg-red-50 text-red-700' :
                    item.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-0.5 px-1">
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    item.status === 'Done' ? 'bg-green-50 text-green-700' :
                    item.status === 'In Progress' ? 'bg-gray-50 text-gray-700' :
                    item.status === 'In Review' ? 'bg-purple-50 text-purple-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    
    if (selectedPreview === "View To Do List") {
      return (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Todo</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Category</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Due</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Priority</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-0.5 px-1 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-0.5 px-1">{item.id}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.category}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.dueDate}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    item.priority === 'High' ? 'bg-red-50 text-red-700' :
                    item.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-0.5 px-1">
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    item.completed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {item.completed ? 'Completed' : 'Pending'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    
    if (selectedPreview === "Look at your schedule") {
      return (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Event</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Time</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Duration</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Type</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-0.5 px-1 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-0.5 px-1">{item.id}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.time}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.duration}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    item.type === 'Meeting' ? 'bg-gray-50 text-gray-700' :
                    item.type === 'Deadline' ? 'bg-red-50 text-red-700' :
                    item.type === 'Social' ? 'bg-green-50 text-green-700' :
                    'bg-purple-50 text-purple-700'
                  }`}>
                    {item.type}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.location || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    
    if (selectedPreview === "Review Invoices") {
      return (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Invoice</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Amount</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Client</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Status</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-1">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-0.5 px-1 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-0.5 px-1">{item.id}</TableCell>
                <TableCell className="text-xs font-semibold py-0.5 px-1">{item.amount}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.client}</TableCell>
                <TableCell className="text-xs py-0.5 px-1">
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    item.status === 'Paid' ? 'bg-green-50 text-green-700' :
                    item.status === 'Overdue' ? 'bg-red-50 text-red-700' :
                    item.status === 'Sent' ? 'bg-gray-50 text-gray-700' :
                    item.status === 'Draft' ? 'bg-gray-50 text-gray-700' :
                    'bg-yellow-50 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-0.5 px-1">{item.dateCreated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    
    return null;
  };

  return (
    <AppLayout showHeader={true}>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-white">
          <div className="max-w-5xl mx-auto px-3 py-3">
            <h1 className="text-xl font-semibold text-gray-900 mb-3">Good Evening, Armando.</h1>
            
            {/* Search Bar - No Icon */}
            <div className="relative mb-2">
              <Input 
                placeholder="Search anything" 
                className="pl-3 pr-3 py-1 w-80 border-gray-300 rounded text-xs h-6 text-gray-600 placeholder:text-xs"
              />
            </div>

            {/* Quick Actions - Buttons below search */}
            <div className="flex gap-1.5 mb-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 text-left transition-colors"
                    onClick={() => setSelectedPreview(selectedPreview === action.title ? null : action.title)}
                  >
                    <Icon className="w-3 h-3 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-900 font-normal text-xs whitespace-nowrap">{action.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Preview Section */}
            {selectedPreview && (
              <div className="mb-3 p-2 bg-white border border-gray-200 rounded-lg max-h-52 overflow-y-auto shadow-sm">
                {renderPreviewTable(quickActions.find(action => action.title === selectedPreview)?.preview || [])}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-3 pb-4 overflow-y-auto">
          {/* Recent Activity Section */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 text-xs px-1 py-0.5 h-auto hover:bg-transparent">
                •••
              </Button>
            </div>
            <div className="bg-white rounded border border-gray-200 p-1.5">
              <div className="space-y-0.5">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between w-full py-0.5">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <Avatar className="w-4 h-4 flex-shrink-0">
                        <AvatarFallback className={`${activity.avatarColor} text-gray-700 text-xs font-medium`}>
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900 text-xs flex-shrink-0">{activity.user}</span>
                      <span className="text-gray-600 text-xs truncate flex-1">{activity.action}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-xs text-gray-500 flex-shrink-0 ml-1.5">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-sm font-semibold text-gray-900">Quick actions</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 text-xs px-1 py-0.5 h-auto hover:bg-transparent">
                •••
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {projectActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="bg-white rounded border border-gray-200 p-1.5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-1.5 mb-1">
                      <Icon className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium text-gray-900 mb-0.5 leading-tight">{action.title}</h3>
                        {action.subtitle && (
                          <p className="text-xs text-gray-600 mb-0.5 leading-tight">{action.subtitle}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{action.readTime}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-sm font-semibold text-gray-900">Recommendations</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 text-xs px-1 py-0.5 h-auto hover:bg-transparent">
                •••
              </Button>
            </div>
            <div className="space-y-1.5">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded border border-gray-200 p-2 relative">
                  <button className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 text-xs">
                    ✕
                  </button>
                  <div className="flex items-start gap-2 pr-5">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded flex items-center justify-center flex-shrink-0">
                      {typeof rec.icon === 'string' ? (
                        <img src={rec.icon} alt="" className="w-3 h-3" />
                      ) : (
                        <rec.icon className="w-3 h-3 text-indigo-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-medium text-gray-900 mb-0.5">{rec.title}</h3>
                      <p className="text-xs text-gray-600 mb-1.5 leading-relaxed">{rec.description}</p>
                      <Button size="sm" className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-1.5 py-0.5 text-xs h-auto font-normal">
                        {rec.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-sm font-semibold text-gray-900">Feed</h2>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 text-xs px-1.5 py-0.5 h-auto bg-white hover:bg-gray-50">
                <span className="mr-0.5">⚙</span>
                Filter
              </Button>
            </div>
            <div className="bg-white rounded border border-gray-200 p-3">
              <p className="text-xs text-gray-600 text-center">
                Your project activity feed will appear here once you start working on tasks and collaborating with your team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home3;
