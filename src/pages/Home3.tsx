import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { CheckCircle, ListTodo, Calendar, FileText, Plus, MessageSquare, Users, Settings, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
      buttonText: "Invite"
    },
    {
      icon: Settings,
      title: "Setup Integrations",
      description: "Connect your favorite tools and services to streamline your workflow and boost productivity.",
      buttonText: "Configure"
    }
  ];

  const recentActivities = [
    {
      user: "Matthew P.",
      initials: "MP",
      action: "uploaded revised Floor Plan (v2.4)",
      time: "1h ago",
      avatarColor: "bg-rose-100 text-rose-800"
    },
    {
      user: "You",
      initials: "You",
      action: "approved design revisions",
      time: "3h ago",
      avatarColor: "bg-emerald-100 text-emerald-800"
    },
    {
      user: "Armando L.",
      initials: "AL",
      action: "added meeting minutes from last site visit",
      time: "1d ago",
      avatarColor: "bg-violet-100 text-violet-800"
    },
    {
      user: "Sarah K.",
      initials: "SK",
      action: "shared Construction Docs – Sheet A200.pdf",
      time: "2d ago",
      avatarColor: "bg-amber-100 text-amber-800"
    },
    {
      user: "John D.",
      initials: "JD",
      action: "completed task review for project milestone",
      time: "3d ago",
      avatarColor: "bg-cyan-100 text-cyan-800"
    }
  ];

  const renderPreviewTable = (preview: any[]) => {
    if (selectedPreview === "Check your tasks") {
      return (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Task</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Assignee</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Due</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Priority</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-1 px-2 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-1 px-2">{item.id}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.assignee}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.dueDate}</TableCell>
                <TableCell className="text-xs py-1 px-2">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    item.priority === 'High' ? 'bg-red-50 text-red-700' :
                    item.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-1 px-2">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    item.status === 'Done' ? 'bg-green-50 text-green-700' :
                    item.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
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
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Todo</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Category</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Due</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Priority</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-1 px-2 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-1 px-2">{item.id}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.category}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.dueDate}</TableCell>
                <TableCell className="text-xs py-1 px-2">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    item.priority === 'High' ? 'bg-red-50 text-red-700' :
                    item.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-1 px-2">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
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
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Event</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Time</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Duration</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Type</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-1 px-2 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-1 px-2">{item.id}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.time}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.duration}</TableCell>
                <TableCell className="text-xs py-1 px-2">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    item.type === 'Meeting' ? 'bg-blue-50 text-blue-700' :
                    item.type === 'Deadline' ? 'bg-red-50 text-red-700' :
                    item.type === 'Social' ? 'bg-green-50 text-green-700' :
                    'bg-purple-50 text-purple-700'
                  }`}>
                    {item.type}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-1 px-2">{item.location || '-'}</TableCell>
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
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Invoice</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">ID</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Amount</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Client</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Status</TableHead>
              <TableHead className="text-xs font-medium text-gray-700 py-1 px-2">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preview.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50">
                <TableCell className="text-xs py-1 px-2 max-w-48 truncate">{item.title}</TableCell>
                <TableCell className="text-xs text-gray-500 py-1 px-2">{item.id}</TableCell>
                <TableCell className="text-xs font-semibold py-1 px-2">{item.amount}</TableCell>
                <TableCell className="text-xs py-1 px-2">{item.client}</TableCell>
                <TableCell className="text-xs py-1 px-2">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    item.status === 'Paid' ? 'bg-green-50 text-green-700' :
                    item.status === 'Overdue' ? 'bg-red-50 text-red-700' :
                    item.status === 'Sent' ? 'bg-blue-50 text-blue-700' :
                    item.status === 'Draft' ? 'bg-gray-50 text-gray-700' :
                    'bg-yellow-50 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-1 px-2">{item.dateCreated}</TableCell>
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
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Good Evening, Armando.</h1>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Input 
                placeholder="Search anything" 
                className="w-full max-w-md border-gray-300 rounded-md"
              />
            </div>

            {/* Quick Actions - Buttons below search */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-md border border-gray-200 text-left transition-colors"
                    onClick={() => setSelectedPreview(selectedPreview === action.title ? null : action.title)}
                  >
                    <Icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-900 font-medium text-sm whitespace-nowrap">{action.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Preview Section */}
            {selectedPreview && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="max-h-64 overflow-y-auto">
                    {renderPreviewTable(quickActions.find(action => action.title === selectedPreview)?.preview || [])}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          {/* Recent Activity Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  •••
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={`${activity.avatarColor} text-sm font-medium`}>
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm text-gray-900">{activity.user}</span>
                        <span className="text-sm text-gray-600 ml-1">{activity.action}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  •••
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3 mb-2">
                        <Icon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 mb-1 leading-tight">{action.title}</h3>
                          {action.subtitle && (
                            <p className="text-sm text-gray-600 mb-2 leading-tight">{action.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{action.readTime}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Section with Carousel */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recommendations</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  •••
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {recommendations.map((rec, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-4 border border-gray-200 rounded-lg relative">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-sm">
                          ✕
                        </button>
                        <div className="flex items-start gap-3 pr-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {typeof rec.icon === 'string' ? (
                              <img src={rec.icon} alt="" className="w-5 h-5" />
                            ) : (
                              <rec.icon className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">{rec.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{rec.description}</p>
                            <Button size="sm" variant="outline" className="text-sm">
                              {rec.buttonText}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {/* Feed Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Feed</CardTitle>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center py-8">
                <p className="text-sm text-gray-600">
                  Your project activity feed will appear here once you start working on tasks and collaborating with your team.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home3;
