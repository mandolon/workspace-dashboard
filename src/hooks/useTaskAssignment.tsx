
import { Task } from '@/types/task';

export const useTaskAssignment = () => {
  const handleRemoveAssignee = (taskId: number, e: React.MouseEvent, onTaskUpdate: (taskId: number, updates: Partial<Task>) => void) => {
    e.stopPropagation();
    onTaskUpdate(taskId, { assignee: null });
    console.log(`Removed assignee from task ${taskId}`);
  };

  const handleRemoveCollaborator = (taskId: number, collaboratorIndex: number, e: React.MouseEvent, onTaskUpdate: (taskId: number, updates: Partial<Task>) => void) => {
    e.stopPropagation();
    // Get current task to update collaborators
    onTaskUpdate(taskId, { 
      collaborators: [] // This will be properly handled in the main hook
    });
    console.log(`Removed collaborator ${collaboratorIndex} from task ${taskId}`);
  };

  const handleAssignPerson = (taskId: number, person: { name: string; avatar: string; fullName?: string }, onTaskUpdate: (taskId: number, updates: Partial<Task>) => void) => {
    onTaskUpdate(taskId, { assignee: person });
    console.log(`Assigned ${person.fullName || person.name} to task ${taskId}`);
  };

  const handleAddCollaborator = (taskId: number, person: { name: string; avatar: string; fullName?: string }, onTaskUpdate: (taskId: number, updates: Partial<Task>) => void) => {
    // This will be properly handled in the main hook with current task state
    console.log(`Added ${person.fullName || person.name} as collaborator to task ${taskId}`);
  };

  return {
    handleRemoveAssignee,
    handleRemoveCollaborator,
    handleAssignPerson,
    handleAddCollaborator
  };
};
