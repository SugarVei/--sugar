-- Sugar Project Hub: run in the Supabase SQL editor or with the Supabase CLI.
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0), brief text not null default '', logo_url text,
  accent_color text not null default '#9c88d7', category text not null, status text not null,
  launch_date date, website_url text, github_url text, vercel_url text, supabase_url text, local_path text,
  archived boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.project_screenshots (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null, label text not null default '', sort_order integer not null default 0, created_at timestamptz not null default now()
);
create index if not exists projects_user_updated_idx on public.projects(user_id, updated_at desc);
create index if not exists projects_user_archived_idx on public.projects(user_id, archived);
create index if not exists screenshots_project_sort_idx on public.project_screenshots(project_id, sort_order);
create or replace function public.set_updated_at() returns trigger language plpgsql security invoker set search_path = public as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects for each row execute procedure public.set_updated_at();
alter table public.projects enable row level security;
alter table public.project_screenshots enable row level security;
create policy "Users manage their own projects" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage screenshots of their projects" on public.project_screenshots for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));
-- Create a private Storage bucket named project-assets in Dashboard > Storage.
-- Store paths under auth.uid()/project-id/ and add equivalent owner policies before enabling uploads.
