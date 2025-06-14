
import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TaskDetailDescriptionProps {
  value: string | undefined;
  onSave?: (value: string) => void;
  disabled?: boolean;
}

const TaskDetailDescription: React.FC<TaskDetailDescriptionProps> = ({
  value,
  onSave,
  disabled,
}) => {
  const [desc, setDesc] = useState(value ?? "");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastSavedValue = useRef(value ?? "");

  // Sync local state when new task is loaded or prop changes
  useEffect(() => {
    setDesc(value ?? "");
    setDirty(false);
    setSaving(false);
    lastSavedValue.current = value ?? "";
  }, [value]);

  // Debounced autosave when user stops typing
  useEffect(() => {
    if (!dirty) return;
    if (!onSave) return;
    if (desc === lastSavedValue.current) {
      setDirty(false);
      setSaving(false);
      return;
    }
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    setSaving(true);
    saveTimeout.current = setTimeout(() => {
      onSave(desc);
      setSaving(false);
      setDirty(false);
      lastSavedValue.current = desc;
    }, 1800); // Save after 1.8 seconds inactivity
  }, [desc, dirty, onSave]);

  // Immediate save on blur
  const handleBlur = () => {
    if (
      dirty &&
      onSave &&
      desc !== lastSavedValue.current
    ) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      setSaving(true);
      onSave(desc);
      setSaving(false);
      setDirty(false);
      lastSavedValue.current = desc;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground">Description</label>
      <Textarea
        placeholder="Add description..."
        className="min-h-[80px] text-xs"
        value={desc}
        onChange={e => {
          setDesc(e.target.value);
          setDirty(true);
        }}
        onBlur={handleBlur}
        disabled={disabled}
        aria-label="Task description"
      />
      {saving && <div className="text-[10px] text-muted-foreground">Saving...</div>}
    </div>
  );
};

export default TaskDetailDescription;
