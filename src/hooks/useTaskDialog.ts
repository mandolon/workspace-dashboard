
import { useState } from 'react';
import { format } from 'date-fns';
import { addTask } from '@/data/taskData';
import { getProjectDisplayName } from '@/data/projectClientData';

export const useTaskDialog = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  // Project mapping from display names to project IDs
  const projectMapping = {
    'piner-haus': 'piner-piner-haus-garage',
    'rathbun-cabin': 'rathbun-usfs-cabin', 
    'ogden-thew': 'ogden-thew-2709-t-street',
    'adams-40th': 'adams-1063-40th-street'
  };

  const handleCreateTask = (onCreateTask: (taskData: any) => void, onClose: () => void) => {
    if (!taskName.trim()) {
      return;
    }

    // Map the selected project to the correct project ID
    const projectId = projectMapping[selectedProject as keyof typeof projectMapping] || selectedProject;

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
