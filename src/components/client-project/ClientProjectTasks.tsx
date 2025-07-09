import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ClientProjectTasksProps {
  projectName: string;
  projectId: string;
}

const ClientProjectTasks = ({ projectName, projectId }: ClientProjectTasksProps) => {
  const tasks = [
    {
      id: '1',
      title: 'Foundation inspection and approval',
      status: 'completed',
      assignee: 'John Smith',
      dueDate: '2024-01-15',
      priority: 'high',
      progress: 100
    },
    {
      id: '2',
      title: 'Electrical rough-in installation',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-20',
      priority: 'medium',
      progress: 75
    },
    {
      id: '3',
      title: 'Plumbing rough-in and connections',
      status: 'pending',
      assignee: 'Sarah Davis',
      dueDate: '2024-01-25',
      priority: 'high',
      progress: 0
    },
    {
      id: '4',
      title: 'HVAC system installation',
      status: 'pending',
      assignee: 'Tom Wilson',
      dueDate: '2024-01-30',
      priority: 'low',
      progress: 0
    },
    {
      id: '5',
      title: 'Drywall installation and finishing',
      status: 'pending',
      assignee: 'Lisa Brown',
      dueDate: '2024-02-05',
      priority: 'medium',
      progress: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `${diffDays} days`;
    return `${Math.abs(diffDays)} days overdue`;
  };

  return (
    <div className="p-4 overflow-auto">
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-sm">{task.title}</h3>
                  <div className="flex gap-1">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs bg-primary/10">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{task.assignee}</span>
                  </div>
                  <span>•</span>
                  <span>Due {formatDate(task.dueDate)}</span>
                  <span>•</span>
                  <span>{task.progress}% complete</span>
                </div>
              </div>
            </div>
            
            {task.progress > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientProjectTasks;