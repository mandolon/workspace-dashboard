
-- 1. Create a public bucket for PDFs
insert into storage.buckets (id, name, public) 
values ('pdfs', 'pdfs', true)
on conflict (id) do nothing;

-- 2. Add a column to the whiteboards table for storing the PDF file URL/key
alter table public.whiteboards
add column if not exists pdf_url text;

-- 3. Create a table for PDF comment pins
create table public.pdf_comments (
  id uuid primary key default gen_random_uuid(),
  whiteboard_id text not null references public.whiteboards(id) on delete cascade,
  user_id text not null,
  comment_text text not null,
  page_number integer not null default 1,
  x decimal not null,
  y decimal not null,
  comment_number integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Enable Row Level Security (RLS) for pdf_comments
alter table public.pdf_comments enable row level security;

-- 5. Allow only users associated with the whiteboard's project, or the creator, to view/add/update/delete pins
-- (Assume current app handles user roles/projects; we allow creator for now)
create policy "Users can view pdf comments for their whiteboard"
  on public.pdf_comments
  for select
  using (
    exists (
      select 1 from public.whiteboards w
      where w.id = whiteboard_id
      and (w.created_by = current_setting('request.jwt.claims', true))
      -- (extend logic for more roles if needed)
    )
  );

create policy "Users can insert pdf comments for their whiteboard"
  on public.pdf_comments
  for insert
  with check (
    exists (
      select 1 from public.whiteboards w
      where w.id = whiteboard_id
      and (w.created_by = current_setting('request.jwt.claims', true))
      -- (extend logic for more roles if needed)
    )
  );

create policy "Users can update/delete their own pdf comments"
  on public.pdf_comments
  for update using (user_id = current_setting('request.jwt.claims', true))
  with check (user_id = current_setting('request.jwt.claims', true));

create policy "Users can delete their own pdf comments"
  on public.pdf_comments
  for delete using (user_id = current_setting('request.jwt.claims', true));

-- 6. Enable real-time for pdf_comments
alter table public.pdf_comments replica identity full;
alter publication supabase_realtime add table public.pdf_comments;
