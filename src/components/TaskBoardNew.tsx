import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Plus, Search, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTaskBoard } from '@/hooks/useTaskBoard';
import { useTaskAttachmentContext } from '@/contexts/TaskAttachmentContext';
import { useTaskDeletion } from '@/hooks/useTaskDeletion';
import { Task, TaskGroup } from '@/types/task';
import { formatDate, getInitials } from '@/utils/taskUtils';
import { getCRMUser } from '@/utils/taskUserCRM';
import { getAvatarColor } from '@/utils/avatarColors';
import { AVATAR_INITIALS_CLASSNAMES } from '@/utils/avatarStyles';
import TaskDialog from './TaskDialog';

const TaskBoardNew: React.FC = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Use Supabase-powered board for state
  const {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    showQuickAdd,
    setShowQuickAdd,
    refreshTrigger,
    getTaskGroups,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
  } = useTaskBoard();

  // Board tasks
  const allTaskGroups = useMemo(() => getTaskGroups(), [getTaskGroups, refreshTrigger]);

  // Filter and process tasks
  const filteredTaskGroups = useMemo(() => {
    return allTaskGroups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task => {
        const matchesSearch = !searchQuery || 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.project?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = showCompleted || task.status !== 'completed';
        
        return matchesSearch && matchesStatus && !task.archived && !task.deletedAt;
      })
    })).filter(group => group.tasks.length > 0);
  }, [allTaskGroups, searchQuery, showCompleted]);

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  const handleTaskRowClick = (task: Task) => {
    handleTaskClick(task);
  };

  const onDialogOpen = () => setIsTaskDialogOpen(true);
  const onDialogClose = () => setIsTaskDialogOpen(false);

  return (
    <>
      <div className="h-full bg-background flex flex-col overflow-hidden">
        {/* Filters Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Group by:</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Status <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Projects <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Date Created <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Assignee <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Created by <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-48 h-8"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="completed"
                  checked={showCompleted}
                  onCheckedChange={(checked) => setShowCompleted(checked === true)}
                />
                <label htmlFor="completed" className="text-sm font-medium">
                  Completed
                </label>
              </div>

              <Button onClick={onDialogOpen} size="sm" className="h-8">
                <Plus className="w-4 h-4 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-background">
          <div className="space-y-6">
            {filteredTaskGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                {/* Group Header */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleGroup(group.title)}
                    className="h-6 w-6 p-0"
                  >
                    {collapsedGroups[group.title] ? 
                      <ChevronRight className="w-3 h-3" /> : 
                      <ChevronDown className="w-3 h-3" />
                    }
                  </Button>
                  
                  <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold text-white uppercase ${
                    group.status === 'redline' ? 'bg-blue-600' : 
                    group.status === 'progress' ? 'bg-green-600' : 
                    'bg-gray-600'
                  }`}>
                    {group.title}
                  </div>
                  
                  <div className="bg-white text-gray-900 px-2 py-1 rounded-lg text-xs font-semibold min-w-[24px] text-center">
                    {group.tasks.length}
                  </div>
                </div>

                {!collapsedGroups[group.title] && (
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b">
                      <div className="col-span-5">Name</div>
                      <div className="col-span-1">Files</div>
                      <div className="col-span-2">Date Created</div>
                      <div className="col-span-2">Created by</div>
                      <div className="col-span-2">Assigned to</div>
                    </div>

                    {/* Task Rows */}
                    {group.tasks.map(task => {
                      const assignee = getCRMUser(task.assignee);
                      const collaborators = (task.collaborators || []).map(getCRMUser);
                      const createdByName = task.createdBy;

                      return (
                        <div
                          key={task.taskId}
                          onClick={() => handleTaskRowClick(task)}
                          className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border hover:bg-accent/50 cursor-pointer transition-colors group"
                        >
                          {/* Name */}
                          <div className="col-span-5">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                              }`} />
                              <span className="font-medium text-sm truncate">{task.title}</span>
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {task.project || 'No Project'}
                            </div>
                          </div>

                          {/* Files */}
                          <div className="col-span-1 flex items-center">
                            {task.hasAttachment && (
                              <div className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                📎 1
                              </div>
                            )}
                          </div>

                          {/* Date Created */}
                          <div className="col-span-2 flex items-center text-xs text-muted-foreground">
                            {formatDate(task.dateCreated)}
                          </div>

                          {/* Created by */}
                          <div className="col-span-2 flex items-center">
                            {createdByName && (
                              <div className={`w-6 h-6 rounded-full text-white text-xs ${AVATAR_INITIALS_CLASSNAMES} bg-blue-500`}>
                                {getInitials(createdByName)}
                              </div>
                            )}
                          </div>

                          {/* Assigned to */}
                          <div className="col-span-2 flex items-center gap-1">
                            {assignee && (
                              <div className={`w-6 h-6 rounded-full text-white text-xs ${AVATAR_INITIALS_CLASSNAMES} ${getAvatarColor(assignee)}`}>
                                {getInitials(assignee.fullName ?? assignee.name)}
                              </div>
                            )}
                            {collaborators.slice(0, 2).map((collaborator, index) => collaborator && (
                              <div
                                key={index}
                                className={`w-6 h-6 rounded-full text-white text-xs border-2 border-background ${AVATAR_INITIALS_CLASSNAMES} ${getAvatarColor(collaborator)}`}
                              >
                                {getInitials(collaborator.fullName ?? collaborator.name)}
                              </div>
                            ))}
                            {collaborators.length > 2 && (
                              <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium">
                                +{collaborators.length - 2}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {group.tasks.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        No tasks found
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {filteredTaskGroups.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No tasks match your filters
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={onDialogClose}
        onCreateTask={handleCreateTask}
      />
    </>
  );
});

TaskBoardNew.displayName = "TaskBoardNew";
export default TaskBoardNew;