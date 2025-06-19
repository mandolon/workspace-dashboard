
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Search, CheckCircle, ListTodo, Calendar, FileText, Plus, MessageSquare, Users, Settings, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Home3 = () => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const quickActions = [
    {
      icon: CheckCircle,
      title: "Check your tasks",
      description: "Review and manage your active tasks",
      preview: "You have 12 active tasks and 3 overdue items that need attention."
    },
    {
      icon: ListTodo,
      title: "View To Do List",
      description: "See your personal todo items",
      preview: "Your personal to-do list contains 8 items, 2 of which are high priority."
    },
    {
      icon: Calendar,
      title: "Look at your schedule",
      description: "Check upcoming meetings and deadlines",
      preview: "You have 3 meetings today and 2 deadlines approaching this week."
    },
    {
      icon: FileText,
      title: "Review Invoices",
      description: "Manage client billing and payments",
      preview: "5 invoices pending approval and 2 payments overdue from clients."
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
      action: "uploaded",
      description: "revised Floor Plan (v2.4)",
      link: "Floor Plan v2.4",
      time: "1h ago",
      avatarColor: "bg-blue-500"
    },
    {
      user: "You",
      initials: "You",
      action: "approved",
      description: "design revisions",
      link: "Design Revisions",
      time: "3h ago",
      avatarColor: "bg-green-500"
    },
    {
      user: "Armando L.",
      initials: "AL",
      action: "added",
      description: "meeting minutes from last site visit",
      link: "Meeting Minutes",
      time: "1d ago",
      avatarColor: "bg-purple-500"
    }
  ];

  return (
    <AppLayout showHeader={true}>
      <div className="min-h-screen bg-white overflow-y-auto">
        {/* Header Section */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <h1 className="text-lg font-medium text-gray-900 mb-6">Good Evening, Armando.</h1>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <Input 
                placeholder="Search anything" 
                className="pl-8 pr-4 py-1 w-80 border-gray-300 rounded text-xs h-7 text-gray-600 placeholder:text-xs"
                style={{ fontSize: '0.75rem' }}
              />
            </div>

            {/* Quick Actions - Buttons below search */}
            <div className="flex gap-2 mb-8">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 text-left transition-colors"
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
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  {quickActions.find(action => action.title === selectedPreview)?.preview}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 pb-8">
          {/* Recent Activity Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 text-xs px-1 py-1 h-auto hover:bg-transparent">
                •••
              </Button>
            </div>
            <div className="bg-white rounded border border-gray-200 p-4">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className={`${activity.avatarColor} text-white text-xs font-medium`}>
                        {activity.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-gray-900">{activity.user}</span>
                        <span className="text-gray-600">{activity.action}</span>
                        <span className="text-gray-600">{activity.description}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="text-xs text-blue-600 hover:text-blue-800 underline">
                          {activity.link}
                        </button>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Quick actions</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 text-xs px-1 py-1 h-auto hover:bg-transparent">
                •••
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {projectActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="bg-white rounded border border-gray-200 p-3 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-2 mb-3">
                      <Icon className="w-3.5 h-3.5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium text-gray-900 mb-1 leading-tight">{action.title}</h3>
                        {action.subtitle && (
                          <p className="text-xs text-gray-600 mb-2 leading-tight">{action.subtitle}</p>
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
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Recommendations</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 text-xs px-1 py-1 h-auto hover:bg-transparent">
                •••
              </Button>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded border border-gray-200 p-4 relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xs">
                    ✕
                  </button>
                  <div className="flex items-start gap-3 pr-8">
                    <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                      {typeof rec.icon === 'string' ? (
                        <img src={rec.icon} alt="" className="w-5 h-5" />
                      ) : (
                        <rec.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-medium text-gray-900 mb-2">{rec.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{rec.description}</p>
                      <Button size="sm" className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-3 py-1 text-xs h-auto font-normal">
                        {rec.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Feed</h2>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 text-xs px-2 py-1 h-auto bg-white hover:bg-gray-50">
                <span className="mr-1">⚙</span>
                Filter
              </Button>
            </div>
            <div className="bg-white rounded border border-gray-200 p-6">
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
