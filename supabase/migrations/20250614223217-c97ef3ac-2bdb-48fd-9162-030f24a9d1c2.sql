
-- 1. Create a whiteboards table to store board metadata and tldraw document

CREATE TABLE public.whiteboards (
  id text PRIMARY KEY, -- matches the existing frontend id/tldrawRoomId
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('tldraw', 'pdf')),
  last_modified timestamp with time zone NOT NULL DEFAULT now(),
  thumbnail text,
  project_id text NOT NULL,
  created_by text NOT NULL, -- user id
  shared_with_client boolean NOT NULL DEFAULT false,
  tldraw_data jsonb, -- stores tldraw data blob, nullable for pdf boards
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.whiteboards ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Team users can see/edit all boards (simple for now)
CREATE POLICY "Team can do everything" ON public.whiteboards
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. (Optional, later: Add stricter client-specific policies if needed)

-- 5. For Realtime sync
ALTER TABLE public.whiteboards REPLICA IDENTITY FULL;
