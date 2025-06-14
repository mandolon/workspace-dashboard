import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types/task';
import TaskDetailTitleSection from './TaskDetailTitleSection';
import TaskDetailDescription from './TaskDetailDescription';
import TaskDetailFields from './TaskDetailFields';

interface TaskDetailFormProps {
  task: Task;
}

const TaskDetailForm = ({ task }: TaskDetailFormProps) => {
  const { currentUser } = useUser();
  const {
    editingTaskId,
    editingValue,
    setEditingValue,
    startEditingTask,
    saveTaskEdit,
    cancelTaskEdit,
    assignPerson,
    removeAssignee,
    addCollaborator,
    removeCollaborator,
    changeTaskStatus
  } = useTaskContext();

  const isEditing = editingTaskId === task.id;

  // These wrappers ensure we always use string id (task.taskId)
  const handleAssignPerson = (taskId: string, person: { name: string; avatar: string; fullName?: string }) => {
    assignPerson(taskId, person);
  };

  const handleRemoveAssignee = (taskId: string) => {
    removeAssignee(taskId);
  };

  const handleAddCollaborator = (taskId: string, person: { name: string; avatar: string; fullName?: string }) => {
    if (addCollaborator) addCollaborator(taskId, person);
  };

  const handleRemoveCollaborator = (taskId: string, idx: number) => {
    if (removeCollaborator) removeCollaborator(taskId, idx);
  };

  const handleChangeStatus = (newStatus: "redline" | "progress" | "completed") => {
    changeTaskStatus(task.id, newStatus);
  };

  return (
    <div className="space-y-3">
      <TaskDetailTitleSection
        isEditing={isEditing}
        editingValue={editingValue}
        setEditingValue={setEditingValue}
        startEditingTask={startEditingTask}
        saveTaskEdit={saveTaskEdit}
        cancelTaskEdit={cancelTaskEdit}
        task={task}
        onChangeStatus={handleChangeStatus}
      />
      <TaskDetailDescription />
      <TaskDetailFields
        task={task}
        currentUser={currentUser}
        assignPerson={handleAssignPerson}
        removeAssignee={handleRemoveAssignee}
        addCollaborator={handleAddCollaborator}
        removeCollaborator={handleRemoveCollaborator}
      />
    </div>
  );
};

export default TaskDetailForm;
