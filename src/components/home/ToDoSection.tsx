import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Check } from 'lucide-react';

interface ToDoItem {
  id: number;
  text: string;
  completed: boolean;
  dateCreated: string;
}

const ToDoSection = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([{
    id: 1,
    text: 'Review project specifications',
    completed: false,
    dateCreated: '12/10/24'
  }, {
    id: 2,
    text: 'Schedule team meeting',
    completed: true,
    dateCreated: '12/09/24'
  }, {
    id: 3,
    text: 'Update project timeline',
    completed: false,
    dateCreated: '12/08/24'
  }]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: ToDoItem = {
        id: Math.max(...todos.map(t => t.id), 0) + 1,
        text: newTodoText.trim(),
        completed: false,
        dateCreated: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        })
      };
      setTodos([newTodo, ...todos]);
      setNewTodoText('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo,
      completed: !todo.completed
    } : todo));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="h-full rounded-lg bg-gray-50/30 p-4">
      <h2 className="text-lg font-semibold mb-3">To Do</h2>
      <div className="space-y-2">
        {/* Add New Todo */}
        <div className="flex gap-2">
          <Input 
            placeholder="Add a new task..." 
            value={newTodoText} 
            onChange={e => setNewTodoText(e.target.value)} 
            onKeyPress={handleKeyPress} 
            className="flex-1 text-sm h-7 border-0 bg-white/70" 
          />
          <Button 
            onClick={handleAddTodo} 
            size="sm" 
            className="h-7 px-2 bg-foreground text-background hover:bg-foreground/90"
          >
            <Plus className="w-3 h-3" strokeWidth="2" />
          </Button>
        </div>

        {/* Todo List */}
        <div className="max-h-[200px] overflow-y-auto space-y-0.5">
          {todos.length === 0 ? (
            <div className="text-center text-muted-foreground py-3 text-sm">
              No tasks found
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 py-1 text-sm hover:bg-white/80 rounded px-1">
                <button 
                  onClick={() => handleToggleComplete(todo.id)} 
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    todo.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-muted-foreground hover:border-foreground'
                  }`}
                >
                  {todo.completed && <Check className="w-2.5 h-2.5" strokeWidth="2" />}
                </button>
                <div className={`flex-1 min-w-0 ${
                  todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  <div className="truncate text-xs">{todo.text}</div>
                </div>
                <button 
                  onClick={() => handleDeleteTodo(todo.id)} 
                  className="text-red-500 hover:text-red-700 p-0.5 flex-shrink-0"
                >
                  <Trash2 className="w-3 h-3" strokeWidth="2" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoSection;
