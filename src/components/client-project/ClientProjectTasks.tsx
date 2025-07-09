import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Task</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Assignee</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Priority</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Due Date</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-1.5 h-auto align-baseline">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-b">
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-accent/50">
              <TableCell className="py-2 font-medium text-sm">{task.title}</TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.assignee}</span>
                </div>
              </TableCell>
              <TableCell className="py-2">
                <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="py-2">
                <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell className="py-2 text-xs text-muted-foreground">{formatDate(task.dueDate)}</TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-2">
                  <Progress value={task.progress} className="w-16 h-2" />
                  <span className="text-xs text-muted-foreground">{task.progress}%</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientProjectTasks;