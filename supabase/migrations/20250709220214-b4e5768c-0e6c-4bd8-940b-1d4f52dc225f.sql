-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  project_id TEXT NOT NULL,
  project TEXT NOT NULL,
  estimated_completion TEXT,
  date_created TEXT,
  due_date TEXT,
  assignee JSONB,
  has_attachment BOOLEAN DEFAULT false,
  collaborators JSONB[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'progress',
  archived BOOLEAN DEFAULT false,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by TEXT,
  description TEXT
);

-- Create task_messages table
CREATE TABLE public.task_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks (allow all operations for authenticated users for now)
CREATE POLICY "Allow all operations on tasks for authenticated users" 
ON public.tasks 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Create policies for task_messages (allow all operations for authenticated users for now)
CREATE POLICY "Allow all operations on task_messages for authenticated users" 
ON public.task_messages 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_task_messages_updated_at
  BEFORE UPDATE ON public.task_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_tasks_task_id ON public.tasks(task_id);
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_created_at ON public.tasks(created_at);
CREATE INDEX idx_task_messages_task_id ON public.task_messages(task_id);
CREATE INDEX idx_task_messages_created_at ON public.task_messages(created_at);