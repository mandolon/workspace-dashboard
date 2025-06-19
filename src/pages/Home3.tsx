
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Search, CheckCircle, ListTodo, Calendar, FileText, Plus, MessageSquare, Users, Settings, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Home3 = () => {
  const quickActions = [
    {
      icon: CheckCircle,
      title: "Check your tasks",
      description: "Review and manage your active tasks"
    },
    {
      icon: ListTodo,
      title: "View To Do List",
      description: "See your personal todo items"
    },
    {
      icon: Calendar,
      title: "Look at your schedule",
      description: "Check upcoming meetings and deadlines"
    },
    {
      icon: FileText,
      title: "Review Invoices",
      description: "Manage client billing and payments"
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
      buttonText: "Invite Team"
    }
  ];

  return (
    <AppLayout showHeader={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-normal text-gray-900 mb-6">Good Evening, Armando.</h1>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search anything" 
                className="pl-10 pr-12 py-2 w-full max-w-md border-gray-300 rounded-md text-sm"
              />
              <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs">
                <Search className="w-3 h-3" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 text-left transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-900 font-medium">{action.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Recent Activity Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-gray-500">
                •••
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">MP</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Matthew P.</span> uploaded revised Floor Plan (v2.4)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1h ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">You</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">You</span> approved design revisions
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3h ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">AL</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Armando L.</span> added meeting minutes from last site visit
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1d ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Quick actions</h2>
              <Button variant="ghost" size="sm" className="text-gray-500">
                •••
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projectActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">{action.title}</h3>
                        {action.subtitle && (
                          <p className="text-xs text-gray-600 mb-2">{action.subtitle}</p>
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
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
              <Button variant="ghost" size="sm" className="text-gray-500">
                •••
              </Button>
            </div>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 relative">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                  <div className="flex items-start gap-4 pr-8">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      {typeof rec.icon === 'string' ? (
                        <img src={rec.icon} alt="" className="w-6 h-6" />
                      ) : (
                        <rec.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">{rec.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{rec.description}</p>
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-1 text-xs">
                        {rec.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Feed</h2>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                <span className="mr-2">⚙</span>
                Filter
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 text-center py-8">
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
