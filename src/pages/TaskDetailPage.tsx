
import React from 'react';
import { ArrowLeft, Upload, Paperclip, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // Mock task data - in a real app this would come from your data source
  const task = {
    id: taskId,
    title: "Update - 12.27.23",
    project: "Adams - 1063 40th Street",
    status: "REDLINE / TO DO"
  };

  const attachments = [
    {
      name: "CDO-0063-Planning-Entitlement-Application",
      dateCreated: "Jul 31, 2024",
      author: "Matthew P.",
    },
    {
      name: "CDO-0220-Owner-Builder-F...",
      dateCreated: "Aug 17, 2024",
      author: "Armando L.",
    },
    {
      name: "Agent-for-Owner-Authorizat...",
      dateCreated: "Aug 11, 2024",
      author: "Armando L.",
    },
    {
      name: "James Hall",
      dateCreated: "Aug 2, 2024",
      author: "Matthew P.",
    },
    {
      name: "Corina McCoy",
      dateCreated: "Jul 23, 2024",
      author: "Matthew P.",
    }
  ];

  const activities = [
    {
      user: "Kenneth A.",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "2h ago"
    },
    {
      user: "You",
      action: "The shadcn/ui Kit for Figma uses the Lucide icons as its main icon library. If you want to use a different icon set for your project, follow the instructions below.",
      time: "4h ago"
    },
    {
      user: "Matthew",
      action: "moved task to REDLINE / TO DO",
      time: "1d ago"
    },
    {
      user: "Armando",
      action: "uploaded CDO-0063-Planning-Entitlement",
      time: "2d ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <button 
            onClick={() => navigate('/')} 
            className="p-1 hover:bg-accent rounded"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted-foreground">{task.project}</span>
          <span className="text-sm text-muted-foreground">-</span>
          <span className="text-sm text-muted-foreground">{task.project}</span>
          <div className="ml-auto">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              {task.status}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {/* Task Title */}
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-1">{task.project}</div>
              <h1 className="text-2xl font-bold">{task.title}</h1>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">Add description</span>
              </div>
            </div>

            {/* Task Details Form */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Created by</label>
                <select className="w-full border border-border rounded px-3 py-2">
                  <option>Select User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Date Created</label>
                <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Assigned to</label>
                <select className="w-full border border-border rounded px-3 py-2">
                  <option>Select User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Mark Complete</label>
                <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-border rounded px-3 py-2" />
              </div>
            </div>

            {/* Attachments */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Attachments</h2>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drop your files here to upload</p>
              </div>

              {/* Attachments Table */}
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3">Date Created</div>
                  <div className="col-span-3">by</div>
                </div>
                
                {attachments.map((attachment, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 text-sm py-2 hover:bg-accent/50 rounded">
                    <div className="col-span-6 flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-orange-500" />
                      <span className="text-blue-600 hover:underline cursor-pointer">{attachment.name}</span>
                    </div>
                    <div className="col-span-3 text-muted-foreground">{attachment.dateCreated}</div>
                    <div className="col-span-3 text-muted-foreground">{attachment.author}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="w-80 border-l border-border p-4">
          <h3 className="font-semibold mb-4">Activity</h3>
          
          <div className="space-y-4 mb-6">
            {activities.map((activity, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{activity.user}</div>
                <div className="text-muted-foreground mt-1">{activity.action}</div>
                <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Type your message" 
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
            <div className="flex items-center justify-between">
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
