
import React from 'react';
import { ChevronDown, Plus, Edit, MoreHorizontal, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
            <TableHead className="text-muted-foreground font-medium text-xs py-2">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2">Date Created</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2">Files</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2">Assigned to</TableHead>
            <TableHead className="text-muted-foreground font-medium text-xs py-2">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-accent/50 group cursor-pointer" onClick={() => onTaskClick(task)}>
              <TableCell className="py-2">
                <div className="flex items-center gap-2">
                  <TaskStatusIcon status={task.status} />
                  <div>
                    <div className="font-medium text-xs">{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.project}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground py-2">
                {task.dateCreated}
              </TableCell>
              <TableCell className="py-2">
                {task.hasAttachment && (
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
              </TableCell>
              <TableCell className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${task.assignee.avatar}`}>
                      {task.assignee.name}
                    </div>
                    {task.collaborators?.map((collaborator, index) => (
                      <div
                        key={index}
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background ${collaborator.avatar}`}
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
              <TableCell className="py-2">
                <button 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle more options
                  }}
                >
                  <MoreHorizontal className="w-3 h-3 text-muted-foreground" strokeWidth="2" />
                </button>
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
