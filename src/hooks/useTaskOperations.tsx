import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '@/types/task';
import { useUser } from '@/contexts/UserContext';
import { insertTask, updateTaskSupabase, deleteTaskSupabase } from '@/data/taskSupabase';
import { useToast } from '@/hooks/use-toast';

export const useTaskOperations = (tasks: Task[]) => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { toast, dismiss } = useToast();

  // Dialog/quick add state
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState<string | null>(null);

  // Generate a new taskId for every task insert
  const generateTaskId = () => "T" + Math.floor(Math.random() * 100000).toString().padStart(4, "0");

  // Create task - relies on real-time to update UI
  const handleCreateTask = useCallback(
    async (newTask: any) => {
      const taskId = newTask.taskId ?? generateTaskId();
      console.log('[useTaskOperations] Creating task:', {
        taskId,
        title: newTask.title,
        projectId: newTask.projectId,
        status: newTask.status,
        assignee: newTask.assignee,
        fullTaskData: newTask
      });
      
      try {
        const taskToInsert = {
          ...newTask,
          taskId,
          createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
        };
        
        console.log('[useTaskOperations] Inserting task to database:', taskToInsert);
        const createdTask = await insertTask(taskToInsert);
        console.log('[useTaskOperations] Task created successfully in database:', {
          id: createdTask.id,
          taskId: createdTask.taskId,
          title: createdTask.title
        });
        
        setIsTaskDialogOpen(false);
        
        // Add a small delay to allow real-time to process
        setTimeout(() => {
          console.log('[useTaskOperations] Task creation completed, real-time should have updated UI');
        }, 1000);
        
      } catch (error) {
        console.error('[useTaskOperations] Failed to create task:', error);
        toast({
          description: "Failed to create task: " + (error as Error).message,
          variant: "destructive",
          duration: 5000,
        });
      }
    },
    [currentUser, toast]
  );

  const handleQuickAddSave = useCallback(
    async (taskData: any) => {
      const taskId = taskData.taskId ?? generateTaskId();
      console.log('[useTaskOperations] Quick adding task:', {
        taskId,
        title: taskData.title,
        projectId: taskData.projectId,
        status: taskData.status,
        fullTaskData: taskData
      });
      
      try {
        const taskToInsert = {
          ...taskData,
          taskId,
          createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
        };
        
        console.log('[useTaskOperations] Quick add - inserting task to database:', taskToInsert);
        const createdTask = await insertTask(taskToInsert);
        console.log('[useTaskOperations] Quick add task created successfully:', {
          id: createdTask.id,
          taskId: createdTask.taskId,
          title: createdTask.title
        });
        
        setShowQuickAdd(null);
        
        // Add a small delay to allow real-time to process
        setTimeout(() => {
          console.log('[useTaskOperations] Quick add task creation completed, real-time should have updated UI');
        }, 1000);
        
      } catch (error) {
        console.error('[useTaskOperations] Failed to quick add task:', error);
        toast({
          description: "Failed to create task: " + (error as Error).message,
          variant: "destructive",
          duration: 5000,
        });
      }
    },
    [currentUser, toast]
  );

  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.taskId}`);
  };

  const handleTaskArchive = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      console.log('[useTaskOperations] Archiving task:', task.taskId);
      await updateTaskSupabase(task.taskId, { archived: true });
    }
  };

  const handleTaskDeleted = async (taskId: string) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      console.log('[useTaskOperations] Deleting task:', task.taskId);
      await deleteTaskSupabase(task.taskId);
    }
  };

  // Task status toggle with archive/complete functionality
  const toggleTaskStatus = useCallback(async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.error('[useTaskOperations] Task not found for status toggle:', taskId);
      return;
    }

    console.log('[useTaskOperations] Toggling task status:', task.taskId, 'current status:', task.status);

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
      
      console.log('[useTaskOperations] Task status toggled successfully');
    } catch (error) {
      console.error('[useTaskOperations] Failed to toggle task status:', error);
      toast({
        description: "Failed to update task status",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [tasks, toast, dismiss]);

  return {
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    showQuickAdd,
    setShowQuickAdd,
    handleCreateTask,
    handleQuickAddSave,
    handleTaskClick,
    handleTaskArchive,
    handleTaskDeleted,
    toggleTaskStatus,
  };
};
