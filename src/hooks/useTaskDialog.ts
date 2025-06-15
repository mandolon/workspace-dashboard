
import { useState } from 'react';
import { format } from 'date-fns';
import { getProjectDisplayName } from '@/data/projectClientData';
import { getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { TEAM_USERS } from '@/utils/teamUsers';
import { useUser } from '@/contexts/UserContext';

export const useTaskDialog = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState<any>('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const { currentUser } = useUser();

  const handleCreateTask = async (onCreateTask: (taskData: any) => void, onClose: () => void) => {
    if (!taskName.trim() || !assignedTo) {
      console.warn('[TaskDialog] Cannot create task - missing name or assignee');
      return;
    }

    // Prepare assignee object
    let assigneeObj = assignedTo;
    if (typeof assignedTo === 'string') {
      assigneeObj = TEAM_USERS.find(u => u.id === assignedTo || u.name === assignedTo || u.fullName === assignedTo) 
        || { name: assignedTo, avatar: '', id: assignedTo };
    }
    assigneeObj = {
      ...assigneeObj,
      id: assigneeObj.id,
      projectId: getProjectIdFromDisplayName(selectedProject)
    };

    const projectId = getProjectIdFromDisplayName(selectedProject);
    const taskDataForSupabase = {
      taskId: `T${Math.floor(Math.random() * 100000).toString().padStart(4, "0")}`,
      title: taskName,
      projectId,
      project: getProjectDisplayName(projectId),
      status: selectedStatus || 'redline',
      description: addDescription ? description : '',
      assignee: assigneeObj,
      dueDate: dueDate ? format(dueDate, 'MM/dd/yy') : '—',
      dateCreated: format(new Date(), 'MM/dd/yy'),
      estimatedCompletion: '—',
      hasAttachment: false,
      collaborators: [],
      createdBy: currentUser?.name ?? currentUser?.email ?? "Unknown",
      archived: false,
      deletedAt: null,
      deletedBy: null,
    };

    console.log('[TaskDialog] Creating task:', taskDataForSupabase);

    try {
      await onCreateTask(taskDataForSupabase);
      handleReset();
      onClose();
      console.log('[TaskDialog] Task created successfully');
    } catch (err) {
      console.error('[TaskDialog] Failed to create task:', err);
      window.alert('Failed to create task! ' + (err as Error).message);
    }
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
