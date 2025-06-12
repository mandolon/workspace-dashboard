
import React from 'react';
import { UserPlus, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getRandomColor, availablePeople } from '@/utils/taskUtils';
import { Task } from '@/types/task';

interface TaskRowAssigneesProps {
  task: Task;
  onRemoveAssignee: (taskId: number, e: React.MouseEvent) => void;
  onRemoveCollaborator: (taskId: number, collaboratorIndex: number, e: React.MouseEvent) => void;
  onAssignPerson: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
  onAddCollaborator: (taskId: number, person: { name: string; avatar: string; fullName?: string }) => void;
}

const TaskRowAssignees = ({
  task,
  onRemoveAssignee,
  onRemoveCollaborator,
  onAssignPerson,
  onAddCollaborator
}: TaskRowAssigneesProps) => {
  return (
    <div className="flex items-center -space-x-1">
      {task.assignee ? (
        <div className="relative group/avatar">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRandomColor(task.assignee.name)}`}>
            {task.assignee.name}
          </div>
          <button
            onClick={(e) => onRemoveAssignee(task.id, e)}
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
                onClick={() => onAssignPerson(task.id, person)}
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
            onClick={(e) => onRemoveCollaborator(task.id, index, e)}
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
                  onClick={() => onAddCollaborator(task.id, person)}
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
  );
};

export default TaskRowAssignees;
