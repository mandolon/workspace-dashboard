import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';

interface ClientProjectTasksProps {
  projectName: string;
  projectId: string;
}

const ClientProjectTasks = ({ projectName, projectId }: ClientProjectTasksProps) => {
  const tasks = [
    {
      id: '1',
      title: 'Foundation inspection',
      status: 'completed',
      assignee: 'John Smith',
      dueDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Electrical rough-in',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-20',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Plumbing installation',
      status: 'pending',
      assignee: 'Sarah Davis',
      dueDate: '2024-01-25',
      priority: 'high'
    },
    {
      id: '4',
      title: 'HVAC system setup',
      status: 'pending',
      assignee: 'Tom Wilson',
      dueDate: '2024-01-30',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {task.assignee}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Due in {Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientProjectTasks;