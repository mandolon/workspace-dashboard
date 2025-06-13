
import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getTasksWithProjectNames } from '@/data/taskData';
import { formatDate } from '@/utils/taskUtils';

const TrashTab = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get all deleted tasks
  const deletedTasks = useMemo(() => {
    return getTasksWithProjectNames().filter(task => task.deletedAt);
  }, []);

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return deletedTasks;
    
    return deletedTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [deletedTasks, searchQuery]);

  const handleRestore = (taskId: number) => {
    console.log('Restoring task:', taskId);
    // Implementation for restoring task
  };

  const handlePermanentDelete = (taskId: number) => {
    console.log('Permanently deleting task:', taskId);
    // Implementation for permanent deletion
  };

  const handleEmptyTrash = () => {
    console.log('Emptying trash');
    // Implementation for emptying trash
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
            <Button variant="outline" size="sm">
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
        {filteredTasks.length === 0 ? (
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
