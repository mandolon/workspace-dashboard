import { useState } from 'react';
import { format } from 'date-fns';
import { addTask } from '@/data/taskData';
import { getProjectDisplayName } from '@/data/projectClientData';
import { getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { TEAM_USERS } from '@/utils/teamUsers';

export const useTaskDialog = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState<any>('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleCreateTask = (onCreateTask: (taskData: any) => void, onClose: () => void) => {
    if (!taskName.trim() || !assignedTo) {
      return; // Cannot create if no name or assignee
    }

    console.log('Creating task with selected project:', selectedProject);
    
    // Convert the selected project display name to project ID
    const projectId = getProjectIdFromDisplayName(selectedProject);
    console.log('Converted to project ID:', projectId);

    // If assignedTo is a string (like 'AL'), find the TEAM_USERS entry
    let assigneeObj = assignedTo;
    if (typeof assignedTo === 'string') {
      assigneeObj = TEAM_USERS.find(u => u.id === assignedTo || u.name === assignedTo || u.fullName === assignedTo) 
        || { name: assignedTo, avatar: '', id: assignedTo };
    }

    const taskData = {
      title: taskName,
      projectId: projectId,
      project: getProjectDisplayName(projectId),
      status: selectedStatus || 'progress',
      description: addDescription ? description : '',
      assignee: assigneeObj,
      dueDate: dueDate ? format(dueDate, 'MM/dd/yy') : '—',
      dateCreated: format(new Date(), 'MM/dd/yy'),
      estimatedCompletion: '—',
      hasAttachment: false,
      collaborators: []
    };
    
    console.log('Final task data:', taskData);
    
    // Use the centralized addTask function
    const newTask = addTask(taskData);
    onCreateTask(newTask);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTaskName('');
    setSelectedProject('');
    setSelectedStatus('');
    setAddDescription(false);
    setDescription('');
    setAssignedTo('');
    setDueDate(undefined);
  };

  return {
    taskName,
    setTaskName,
    selectedProject,
    setSelectedProject,
    selectedStatus,
    setSelectedStatus,
    addDescription,
    setAddDescription,
    description,
    setDescription,
    assignedTo,
    setAssignedTo,
    dueDate,
    setDueDate,
    handleCreateTask,
    handleReset
  };
};
