import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskGroup, TaskUser } from '@/types/task';
import { useUser } from '@/contexts/UserContext';
import { useRealtimeTasks } from './useRealtimeTasks';
import { insertTask, updateTaskSupabase, deleteTaskSupabase } from '@/data/taskSupabase';
import { useToast } from '@/hooks/use-toast';

export const useTaskBoard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { tasks, setTasks, loading } = useRealtimeTasks();
  const { toast, dismiss } = useToast();

  // Dialog/quick add state
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);

  // Supabase powered task groups - depend on tasks for real-time updates
  const getTaskGroups = useCallback((): TaskGroup[] => {
    console.log('[useTaskBoard] Getting task groups from', tasks.length, 'tasks');
    // Filter tasks based on status, excluding soft-deleted tasks
    const centralizedRedline = tasks.filter(task => 
      task.status === 'redline' && !task.deletedAt && !task.archived
    );
    const centralizedProgress = tasks.filter(task => 
      task.status === 'progress' && !task.deletedAt && !task.archived
    );
    // Show completed tasks regardless of archived status since they're intentionally archived
    const centralizedCompleted = tasks.filter(task => 
      task.status === 'completed' && !task.deletedAt
    );

    const taskGroups: TaskGroup[] = [
      {
        title: "TASK/ REDLINE",
        count: centralizedRedline.length,
        color: "bg-red-500",
        status: "redline",
        tasks: centralizedRedline
      },
      {
        title: "PROGRESS/ UPDATE",
        count: centralizedProgress.length,
        color: "bg-blue-500",
        status: "progress",
        tasks: centralizedProgress
      },
      {
        title: "COMPLETED",
        count: centralizedCompleted.length,
        color: "bg-green-500",
        status: "completed",
        tasks: centralizedCompleted
      }
    ];
    
    console.log('[useTaskBoard] Task groups:', taskGroups.map(g => `${g.status}: ${g.count}`));
    return taskGroups;
  }, [tasks]);

  // Generate a new taskId for every task insert
  const generateTaskId = () => "T" + Math.floor(Math.random() * 100000).toString().padStart(4, "0");

  // Create task - relies on real-time to update UI
  const handleCreateTask = useCallback(
    async (newTask: any) => {
      const taskId = newTask.taskId ?? generateTaskId();
      console.log('[useTaskBoard] Creating task:', taskId, newTask.title);
      try {
        await insertTask({
          ...newTask,
          taskId,
          createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
        });
        console.log('[useTaskBoard] Task created successfully');
        setIsTaskDialogOpen(false);
      } catch (error) {
        console.error('[useTaskBoard] Failed to create task:', error);
      }
    },
    [currentUser]
  );

  const handleQuickAddSave = useCallback(
    async (taskData: any) => {
      const taskId = taskData.taskId ?? generateTaskId();
      console.log('[useTaskBoard] Quick adding task:', taskId, taskData.title);
      try {
        await insertTask({
          ...taskData,
          taskId,
          createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
        });
        console.log('[useTaskBoard] Quick add task created successfully');
        setShowQuickAdd(null);
      } catch (error) {
        console.error('[useTaskBoard] Failed to quick add task:', error);
      }
    },
    [currentUser]
  );

  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.taskId}`);
  };

  const handleTaskArchive = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      console.log('[useTaskBoard] Archiving task:', task.taskId);
      await updateTaskSupabase(task.taskId, { archived: true });
    }
  };

  const handleTaskDeleted = async (taskId: string) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      console.log('[useTaskBoard] Deleting task:', task.taskId);
      await deleteTaskSupabase(task.taskId);
    }
  };

  // Task status toggle with archive/complete functionality
  const toggleTaskStatus = useCallback(async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.error('[useTaskBoard] Task not found for status toggle:', taskId);
      return;
    }

    console.log('[useTaskBoard] Toggling task status:', task.taskId, 'current status:', task.status);

    try {
      if (task.status === 'completed') {
        // Uncomplete: move back to progress and unarchive
        await updateTaskSupabase(task.taskId, { 
          status: 'progress', 
          archived: false 
        });
        
        toast({
          description: "Task marked as in progress",
          duration: 3000,
        });
      } else {
        // Complete and archive: mark as completed and archived
        await updateTaskSupabase(task.taskId, { 
          status: 'completed', 
          archived: true 
        });
        
        toast({
          description: "Task completed and archived",
          duration: 3000,
          action: (
            <button
              onClick={async () => {
                await updateTaskSupabase(task.taskId, { 
                  status: task.status, // restore original status
                  archived: false 
                });
                dismiss();
              }}
              className="text-sm underline"
            >
              Undo
            </button>
          ),
        });
      }
      
      console.log('[useTaskBoard] Task status toggled successfully');
    } catch (error) {
      console.error('[useTaskBoard] Failed to toggle task status:', error);
      toast({
        description: "Failed to update task status",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [tasks, toast, dismiss]);

  // Assignment handlers - rely on real-time to update UI
  const assignPerson = async (taskId: string, person: TaskUser) => {
    console.log('[useTaskBoard] Assigning person to task:', taskId, person.name);
    try {
      await updateTaskSupabase(taskId, { assignee: person });
      console.log('[useTaskBoard] Person assigned successfully');
    } catch (error) {
      console.error('[useTaskBoard] Failed to assign person:', error);
    }
  };

  const removeAssignee = async (taskId: string) => {
    console.log('[useTaskBoard] Removing assignee from task:', taskId);
    try {
      await updateTaskSupabase(taskId, { assignee: null });
      console.log('[useTaskBoard] Assignee removed successfully');
    } catch (error) {
      console.error('[useTaskBoard] Failed to remove assignee:', error);
    }
  };

  const addCollaborator = async (taskId: string, person: TaskUser) => {
    console.log('[useTaskBoard] Adding collaborator to task:', taskId, person.name);
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) {
      console.error('[useTaskBoard] Task not found for adding collaborator:', taskId);
      return;
    }
    
    const collabs = (task.collaborators ?? []).slice();
    if (!collabs.find(c => c.id === person.id)) {
      collabs.push(person);
      try {
        await updateTaskSupabase(taskId, { collaborators: collabs });
        console.log('[useTaskBoard] Collaborator added successfully');
      } catch (error) {
        console.error('[useTaskBoard] Failed to add collaborator:', error);
      }
    }
  };

  const removeCollaborator = async (taskId: string, collaboratorIndex: number) => {
    console.log('[useTaskBoard] Removing collaborator from task:', taskId, 'index:', collaboratorIndex);
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) {
      console.error('[useTaskBoard] Task not found for removing collaborator:', taskId);
      return;
    }
    
    const collabs = (task.collaborators ?? []).slice();
    collabs.splice(collaboratorIndex, 1);
    try {
      await updateTaskSupabase(taskId, { collaborators: collabs });
      console.log('[useTaskBoard] Collaborator removed successfully');
    } catch (error) {
      console.error('[useTaskBoard] Failed to remove collaborator:', error);
    }
  };

  return {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    showQuickAdd,
    setShowQuickAdd,
    getTaskGroups,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    handleTaskDeleted,
    toggleTaskStatus, // New status toggle handler
    // Assignment handlers for Supabase tasks only:
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    supabaseTasks: tasks, // expose realtime tasks for detail page
    supabaseTasksLoading: loading,
  };
};
