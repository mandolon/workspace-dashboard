
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';

export const useTaskManagement = (initialTasks: Task[], onTaskArchive?: (taskId: number) => void) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const { toast } = useToast();

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
      const previousStatus = task.status;
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'completed', archived: true }
            : task
        )
      );
      
      if (onTaskArchive) {
        onTaskArchive(taskId);
      }
      
      toast({
        title: "Task completed",
        description: `"${task.title}" has been marked as completed.`,
        action: (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleUndoComplete(taskId, previousStatus)}
          >
            Undo
          </Button>
        ),
        duration: 5000,
      });
      
      console.log(`Completed and archived task ${taskId}`);
    } else if (task && task.status === 'completed') {
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

  const handleUndoComplete = (taskId: number, previousStatus: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: previousStatus, archived: false }
          : task
      )
    );
    
    toast({
      title: "Task restored",
      description: "Task has been restored to its previous status.",
      duration: 3000,
    });
    
    console.log(`Undid completion for task ${taskId}, restored to ${previousStatus}`);
  };

  return {
    tasks,
    editingTaskId,
    editingValue,
    setEditingValue,
    handleTaskNameClick,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleKeyDown,
    handleRemoveAssignee,
    handleRemoveCollaborator,
    handleAssignPerson,
    handleAddCollaborator,
    handleTaskStatusClick
  };
};
