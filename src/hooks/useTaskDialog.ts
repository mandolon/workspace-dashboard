
import { useState } from 'react';
import { format } from 'date-fns';
import { addTask } from '@/data/taskData';
import { getProjectDisplayName } from '@/data/projectClientData';
import { getProjectIdFromDisplayName } from '@/utils/projectMapping';

export const useTaskDialog = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleCreateTask = (onCreateTask: (taskData: any) => void, onClose: () => void) => {
    if (!taskName.trim()) {
      return;
    }

    console.log('Creating task with selected project:', selectedProject);
    
    // Convert the selected project display name to project ID
    const projectId = getProjectIdFromDisplayName(selectedProject);
    console.log('Converted to project ID:', projectId);

    const taskData = {
      title: taskName,
      projectId: projectId,
      project: getProjectDisplayName(projectId),
      status: selectedStatus || 'progress',
      description: addDescription ? description : '',
      assignee: assignedTo ? {
        name: assignedTo,
        avatar: assignedTo === 'MH' ? 'bg-purple-500' : 
                assignedTo === 'AL' ? 'bg-gray-600' : 
                assignedTo === 'MP' ? 'bg-green-500' : 'bg-blue-500'
      } : null,
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
