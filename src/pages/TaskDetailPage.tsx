
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskDetail from '@/components/TaskDetail';
import { getTaskById, getTaskByTaskId } from '@/data/taskData';
import { getProjectIdFromDisplayName } from '@/utils/projectMapping';
import { useTaskContext } from '@/contexts/TaskContext';
import { useUser } from '@/contexts/UserContext';
import { TaskUser, Task } from '@/types/task';

const TaskDetailPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshTrigger, customTasks } = useTaskContext();
  const { currentUser } = useUser();

  const { returnTo, returnToName, returnToTab } = location.state || {};

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    // Find most up-to-date version from customTasks or fallback to backend data
    let fetchedTask: Task | null = null;
    if (taskId) {
      // Try to find in customTasks context first (these are most up-to-date)
      const taskFromCustom = customTasks.find(
        t => t.taskId === taskId || t.id === Number(taskId)
      );
      if (taskFromCustom) {
        fetchedTask = taskFromCustom;
      } else if (taskId.startsWith('T')) {
        fetchedTask = getTaskByTaskId(taskId) || null;
      } else {
        const numericId = parseInt(taskId, 10);
        if (!isNaN(numericId)) {
          fetchedTask = getTaskById(numericId) || null;
        }
      }
    }
    setCurrentTask(fetchedTask);
  }, [taskId, refreshTrigger, customTasks]);

  const handleBack = () => {
    if (returnTo) {
      navigate(returnTo, {
        state: {
          returnToTab: returnToTab
        }
      });
    } else {
      navigate('/tasks');
    }
  };

  const handleProjectClick = () => {
    if (currentTask?.project) {
      const projectId = getProjectIdFromDisplayName(currentTask.project);
      if (projectId) {
        navigate(`/project/${projectId}`);
      }
    }
  };

  // Comprehensive Authorization
  const isCurrentUserTaskViewer = React.useMemo(() => {
    if (!currentTask || !currentUser) return false;
    // Admin users ("Armando Lopez" or "AL" or armando@company.com) see all
    if (
      currentUser.name === "Armando Lopez" ||
      currentUser.name === "AL" ||
      currentUser.email === "armando@company.com"
    ) {
      console.log('Access allowed: Admin user');
      return true;
    }

    let allowed = false;

    // Assignee (by id, name, or fullName)
    if (
      currentTask.assignee &&
      (
        currentTask.assignee.id === currentUser.id ||
        currentTask.assignee.name === currentUser.name ||
        (currentTask.assignee.fullName && currentTask.assignee.fullName === currentUser.name)
      )
    ) {
      allowed = true;
      console.log('Access allowed: You are the assignee');
    }

    // Collab
    if (
      currentTask.collaborators &&
      currentTask.collaborators.some(
        c =>
          (c.id && c.id === currentUser.id) ||
          (c.name && c.name === currentUser.name) ||
          (c.fullName && c.fullName === currentUser.name)
      )
    ) {
      allowed = true;
      console.log('Access allowed: You are a collaborator');
    }

    // Creator (by name or email fallback)
    if (
      (currentTask.createdBy && (
        currentTask.createdBy === currentUser.name || 
        currentTask.createdBy === currentUser.email
      ))
    ) {
      allowed = true;
      console.log('Access allowed: You are the creator');
    }

    if (!allowed) {
      console.log('Access denied: ', {
        currentUser,
        assignee: currentTask.assignee,
        collaborators: currentTask.collaborators,
        createdBy: currentTask.createdBy
      });
    }
    return allowed;
  }, [currentTask, currentUser]);

  if (!currentTask) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Loading task...</h2>
            <p className="text-muted-foreground">If this persists, the task may not exist.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!isCurrentUserTaskViewer) {
    // Access denied state
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto">
            <h2 className="text-lg font-semibold">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You are not assigned to this task and cannot view the details or participate in activity.</p>
            <button
              onClick={handleBack}
              className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 pl-4 pr-4">
          <TaskDetail 
            isOpen={true} 
            onClose={handleBack}
            onProjectClick={handleProjectClick}
            task={currentTask}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;

