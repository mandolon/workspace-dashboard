
import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/taskUtils';
import { restoreTask, softDeleteTask } from '@/data/taskHelpers'; // import legacy helpers
import { updateTaskSupabase, deleteTaskSupabase, fetchAllTasks } from '@/data/taskSupabase';
import { useRealtimeTasks } from '@/hooks/useRealtimeTasks';

const TrashTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Use useRealtimeTasks to get all tasks (legacy + Supabase-backed)
  const { tasks: allTasks, loading } = useRealtimeTasks();

  // Get all deleted tasks from all sources
  const deletedTasks = useMemo(() => {
    return (allTasks ?? []).filter(task => !!task.deletedAt);
  }, [allTasks]);

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return deletedTasks;
    return deletedTasks.filter(task =>
      (task.title?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
      (task.project?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
      (task.taskId?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
    );
  }, [deletedTasks, searchQuery]);

  // Determine if the task is legacy (local/mock data) or Supabase
  function isSupabaseTask(task) {
    // Legacy tasks have numeric task.id and task.taskId like "T0001". Supabase tasks may have string/bigint id and actual uuid for id.
    return typeof task.taskId === "string" && task.taskId.startsWith("T") && typeof task.id === "number"
      ? false
      : true;
  }

  const handleRestore = async (taskId) => {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;

    if (isSupabaseTask(task)) {
      try {
        await updateTaskSupabase(task.taskId, { deletedAt: null, deletedBy: null });
        toast({ title: 'Task Restored', description: 'Task has been restored.', duration: 3000 });
      } catch (e) {
        toast({ title: 'Error', description: 'Failed to restore task.', variant: 'destructive' });
      }
    } else {
      // Legacy task
      restoreTask(taskId);
      toast({ title: 'Task Restored', description: 'Legacy task has been restored.', duration: 3000 });
    }
  };

  const handlePermanentDelete = async (taskId) => {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;

    if (isSupabaseTask(task)) {
      try {
        await deleteTaskSupabase(task.taskId);
        toast({ title: 'Task permanently deleted', description: '', duration: 3000 });
      } catch (e) {
        toast({ title: 'Error', description: 'Could not permanently delete.', variant: 'destructive' });
      }
    } else {
      // Legacy: hard-remove from `baseTasks` array if it existed. For demo, just remove deletedAt so it's not visible.
      toast({ title: 'Legacy tasks cannot be permanently deleted in demo.', description: '', variant: 'destructive' });
    }
  };

  const handleEmptyTrash = async () => {
    // Go through all deleted tasks and permanently delete them
    const promises = deletedTasks.map(async (task) => {
      if (isSupabaseTask(task)) {
        return handlePermanentDelete(task.id);
      }
      // For legacy, as above
      return null;
    });
    await Promise.all(promises);
    toast({ title: 'Trash emptied', description: 'All deleted tasks were removed.', duration: 3000 });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Trash</h2>
          <p className="text-sm text-muted-foreground">
            Items shown below will be automatically deleted forever after 30 days.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search deleted tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Actions */}
        {deletedTasks.length > 0 && (
          <div className="flex gap-2 mb-6">
            <Button variant="outline" size="sm" onClick={() => deletedTasks.forEach((task) => handleRestore(task.id))}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore all
            </Button>
            <Button variant="destructive" size="sm" onClick={handleEmptyTrash}>
              <Trash2 className="w-4 h-4 mr-2" />
              Empty trash
            </Button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div>Loading…</div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              {searchQuery ? 'No items found for your search' : 'No deleted items'}
            </div>
          </div>
        ) : (
          <div className="space-y-0.5">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground py-2 border-b">
              <div className="col-span-5">Task</div>
              <div className="col-span-2">Project</div>
              <div className="col-span-2">Deleted</div>
              <div className="col-span-2">Deleted by</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {/* Task Rows */}
            {filteredTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-3 text-xs py-3 hover:bg-accent/50 rounded border-b border-border/30">
                <div className="col-span-5">
                  <div className="font-medium">{task.taskId} - {task.title}</div>
                </div>
                <div className="col-span-2 text-muted-foreground">
                  {task.project}
                </div>
                <div className="col-span-2 text-muted-foreground">
                  {task.deletedAt ? formatDate(task.deletedAt) : '—'}
                </div>
                <div className="col-span-2 text-muted-foreground">
                  {task.deletedBy || '—'}
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(task.id)}
                    className="h-6 px-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePermanentDelete(task.id)}
                    className="h-6 px-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashTab;

