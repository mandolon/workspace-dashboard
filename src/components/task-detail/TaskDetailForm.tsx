
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
  } = useTaskContext();

  const isEditing = editingTaskId === task.id;

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
      />
      <TaskDetailDescription />
      <TaskDetailFields
        task={task}
        currentUser={currentUser}
        assignPerson={assignPerson}
        removeAssignee={removeAssignee}
      />
    </div>
  );
};

export default TaskDetailForm;
