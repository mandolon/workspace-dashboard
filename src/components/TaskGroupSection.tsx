import React, { useState } from 'react';
import { ChevronDown, Plus, Edit, MoreHorizontal, ChevronDown as ChevronDownIcon, Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import TaskStatusIcon from './TaskStatusIcon';
import QuickAddTask from './QuickAddTask';

interface Task {
  id: number;
  title: string;
  project: string;
  estimatedCompletion: string;
  dateCreated: string;
  dueDate: string;
  assignee: { name: string; avatar: string };
  hasAttachment: boolean;
  collaborators?: Array<{ name: string; avatar: string }>;
  status: string;
}

interface TaskGroup {
  title: string;
  count: number;
  color: string;
  status: string;
  tasks: Task[];
}

interface TaskGroupSectionProps {
  group: TaskGroup;
  showQuickAdd: string | null;
  onSetShowQuickAdd: (status: string | null) => void;
  onQuickAddSave: (taskData: any) => void;
  onTaskClick: (task: Task) => void;
}

const TaskGroupSection = ({ 
  group, 
  showQuickAdd, 
  onSetShowQuickAdd, 
  onQuickAddSave, 
  onTaskClick 
}: TaskGroupSectionProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    // Use a hash of the name to consistently assign the same color
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month} ${day}, ${year}`;
    } catch {
      return dateString; // fallback to original string if parsing fails
    }
  };

  const handleTaskNameClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  };

  const handleEditClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  };

  const handleSaveEdit = (taskId: number) => {
    // Here you would typically call an update function
    console.log(`Updating task ${taskId} with new title: ${editingValue}`);
    setEditingTaskId(null);
    setEditingValue('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number) => {
    if (e.key === 'Enter') {
      handleSaveEdit(taskId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="space-y-2">
      {/* Group Header */}
      <div className="flex items-center gap-2 mb-2">
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
        <div className={`px-2 py-0.5 rounded text-white text-xs font-medium ${group.color}`}>
          {group.title}
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[45%]">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[10%]">Files</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[18%]">Date Created</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[18%]">Due Date</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[9%]">Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-accent/50 group cursor-pointer" onClick={() => onTaskClick(task)}>
              <TableCell className="py-2 w-[45%]">
                <div className="flex items-center gap-2">
                  <TaskStatusIcon status={task.status} />
                  <div className="flex-1">
                    {editingTaskId === task.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, task.id)}
                          className="text-xs h-6 px-1 py-0 border border-border"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit(task.id);
                          }}
                          className="p-0.5 text-green-600 hover:text-green-700"
                        >
                          <Check className="w-3 h-3" strokeWidth="2" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                          className="p-0.5 text-red-600 hover:text-red-700"
                        >
                          <X className="w-3 h-3" strokeWidth="2" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-1 group/title">
                          <div className="font-medium text-xs">
                            {task.title}
                          </div>
                          <button
                            onClick={(e) => handleEditClick(task, e)}
                            className="opacity-0 group-hover/title:opacity-100 p-0.5 hover:bg-accent rounded transition-opacity"
                          >
                            <Edit className="w-3 h-3 text-muted-foreground hover:text-foreground" strokeWidth="2" />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground">{task.project}</div>
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-2 w-[10%]">
                <div className="flex items-center gap-1">
                  {task.hasAttachment && (
                    <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <button 
                    className="p-0.5 hover:bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle file attachment
                    }}
                  >
                    <Plus className="w-3 h-3" strokeWidth="2" />
                  </button>
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground py-2 w-[18%]">
                {formatDate(task.dateCreated)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground py-2 w-[18%]">
                {task.dueDate}
              </TableCell>
              <TableCell className="py-2 w-[9%]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRandomColor(task.assignee.name)}`}>
                      {task.assignee.name}
                    </div>
                    {task.collaborators?.map((collaborator, index) => (
                      <div
                        key={index}
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background ${getRandomColor(collaborator.name)}`}
                      >
                        {collaborator.name}
                      </div>
                    ))}
                  </div>
                  <button 
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit action
                    }}
                  >
                    <Edit className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Quick Add Task or Add Task Button */}
      {showQuickAdd === group.status ? (
        <QuickAddTask
          onSave={onQuickAddSave}
          onCancel={() => onSetShowQuickAdd(null)}
          defaultStatus={group.status}
        />
      ) : (
        <div className="px-4 py-2">
          <button 
            onClick={() => onSetShowQuickAdd(group.status)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded hover:bg-accent/50 transition-colors"
          >
            <Plus className="w-3 h-3" strokeWidth="2" />
            <span>Add Task</span>
            <ChevronDownIcon className="w-3 h-3" strokeWidth="2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskGroupSection;
