import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Edit, MoreHorizontal, ChevronDown as ChevronDownIcon, Check, X, UserPlus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TaskStatusIcon from './TaskStatusIcon';
import QuickAddTask from './QuickAddTask';

interface Task {
  id: number;
  title: string;
  project: string;
  estimatedCompletion: string;
  dateCreated: string;
  dueDate: string;
  assignee: { name: string; avatar: string; fullName?: string } | null;
  hasAttachment: boolean;
  collaborators?: Array<{ name: string; avatar: string; fullName?: string }>;
  status: string;
  archived?: boolean;
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
  onTaskArchive?: (taskId: number) => void;
}

const TaskGroupSection = ({ 
  group, 
  showQuickAdd, 
  onSetShowQuickAdd, 
  onQuickAddSave, 
  onTaskClick,
  onTaskArchive
}: TaskGroupSectionProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [tasks, setTasks] = useState<Task[]>(group.tasks);
  const [isExpanded, setIsExpanded] = useState(true);

  // Available people to assign with full names
  const availablePeople = [
    { name: "MP", avatar: "bg-blue-500", fullName: "Marcus Peterson" },
    { name: "JD", avatar: "bg-green-500", fullName: "Jennifer Davis" },
    { name: "SK", avatar: "bg-purple-500", fullName: "Sarah Kim" },
    { name: "AL", avatar: "bg-orange-500", fullName: "Alex Lopez" },
    { name: "RT", avatar: "bg-red-500", fullName: "Ryan Taylor" }
  ];

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

  const handleRemoveAssignee = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, assignee: null }
          : task
      )
    );
    console.log(`Removed assignee from task ${taskId}`);
  };

  const handleRemoveCollaborator = (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              collaborators: task.collaborators?.filter((_, index) => index !== collaboratorIndex) || []
            }
          : task
      )
    );
    console.log(`Removed collaborator ${collaboratorIndex} from task ${taskId}`);
  };

  const handleAssignPerson = (taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, assignee: person }
          : task
      )
    );
    console.log(`Assigned ${person.fullName || person.name} to task ${taskId}`);
  };

  const handleAddCollaborator = (taskId: number, person: { name: string; avatar: string; fullName?: string }) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              collaborators: [...(task.collaborators || []), person]
            }
          : task
      )
    );
    console.log(`Added ${person.fullName || person.name} as collaborator to task ${taskId}`);
  };

  const handleTaskStatusClick = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== 'completed') {
      // Mark as completed and archive
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'completed', archived: true }
            : task
        )
      );
      
      // Notify parent component to archive the task
      if (onTaskArchive) {
        onTaskArchive(taskId);
      }
      
      console.log(`Completed and archived task ${taskId}`);
    } else if (task && task.status === 'completed') {
      // Unarchive and set back to progress
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'progress', archived: false }
            : task
        )
      );
      console.log(`Unarchived task ${taskId}`);
    }
  };

  // Filter out archived tasks from display
  const visibleTasks = tasks.filter(task => !task.archived);

  return (
    <div className="space-y-2">
      {/* Group Header */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0.5 hover:bg-accent rounded transition-colors"
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
        <div className={`px-2 py-0.5 rounded text-white text-xs font-medium ${group.color}`}>
          {group.title}
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[55%]">Name</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[12%]">Files</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[23%]">Date Created</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs py-2 w-[10%]">Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-accent/50 group">
                  <TableCell className="py-2 w-[55%]">
                    <div 
                      className="flex items-center gap-2 cursor-pointer" 
                      onClick={() => onTaskClick(task)}
                    >
                      <TaskStatusIcon 
                        status={task.status} 
                        onClick={() => handleTaskStatusClick(task.id)}
                      />
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
                  <TableCell className="py-2 w-[12%]">
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
                  <TableCell className="text-xs text-muted-foreground py-2 w-[23%]">
                    {formatDate(task.dateCreated)}
                  </TableCell>
                  <TableCell className="py-2 w-[10%]">
                    <div className="flex items-center -space-x-1">
                      {task.assignee ? (
                        <div className="relative group/avatar">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRandomColor(task.assignee.name)}`}>
                            {task.assignee.name}
                          </div>
                          <button
                            onClick={(e) => handleRemoveAssignee(task.id, e)}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-2 h-2" strokeWidth="2" />
                          </button>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="w-5 h-5 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center hover:border-foreground hover:bg-accent transition-colors"
                            >
                              <UserPlus className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 bg-popover">
                            {availablePeople.map((person) => (
                              <DropdownMenuItem
                                key={person.name}
                                onClick={() => handleAssignPerson(task.id, person)}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRandomColor(person.name)}`}>
                                  {person.name}
                                </div>
                                <span>{person.fullName}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      
                      {task.collaborators?.map((collaborator, index) => (
                        <div key={index} className="relative group/collaborator">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background ${getRandomColor(collaborator.name)}`}>
                            {collaborator.name}
                          </div>
                          <button
                            onClick={(e) => handleRemoveCollaborator(task.id, index, e)}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/collaborator:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-2 h-2" strokeWidth="2" />
                          </button>
                        </div>
                      ))}
                      
                      {task.assignee && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="w-5 h-5 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center hover:border-foreground hover:bg-accent transition-colors ml-1"
                            >
                              <UserPlus className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 bg-popover">
                            {availablePeople
                              .filter(person => 
                                person.name !== task.assignee?.name && 
                                !task.collaborators?.some(collab => collab.name === person.name)
                              )
                              .map((person) => (
                                <DropdownMenuItem
                                  key={person.name}
                                  onClick={() => handleAddCollaborator(task.id, person)}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRandomColor(person.name)}`}>
                                    {person.name}
                                  </div>
                                  <span>{person.fullName}</span>
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
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
        </>
      )}
    </div>
  );
};

export default TaskGroupSection;
