create extension if not exists "pgcrypto";

create table if not exists public.demo_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  company text not null check (char_length(company) between 2 and 120),
  email text check (email is null or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  service text not null check (service in ('AI chatbot', 'Booking system', 'Dashboard', 'API integration')),
  budget text not null default 'Discovery',
  status text not null default 'new' check (status in ('new', 'qualified', 'proposal', 'won')),
  priority integer not null default 3 check (priority between 1 and 5),
  notes text not null default '',
  source text not null default 'portfolio_demo',
  created_at timestamptz not null default now()
);

create table if not exists public.demo_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 140),
  area text not null check (area in ('Frontend', 'Backend', 'Database', 'AI')),
  status text not null default 'queued' check (status in ('queued', 'in_progress', 'done')),
  owner text not null default 'Chatchawan',
  impact integer not null default 3 check (impact between 1 and 5),
  due_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.demo_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('lead_created', 'task_completed', 'proposal_sent', 'system_note')),
  message text not null check (char_length(message) between 3 and 220),
  created_at timestamptz not null default now()
);

create index if not exists demo_leads_created_at_idx on public.demo_leads (created_at desc);
create index if not exists demo_leads_status_idx on public.demo_leads (status);
create index if not exists demo_tasks_status_idx on public.demo_tasks (status);
create index if not exists demo_events_created_at_idx on public.demo_events (created_at desc);

alter table public.demo_leads enable row level security;
alter table public.demo_tasks enable row level security;
alter table public.demo_events enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete on public.demo_leads to service_role;
grant select, insert, update, delete on public.demo_tasks to service_role;
grant select, insert, update, delete on public.demo_events to service_role;

insert into public.demo_leads (name, company, email, service, budget, status, priority, notes, created_at)
values
  ('Anna Miller', 'Travel Ops Studio', 'anna@example.com', 'Booking system', '$1k - $3k', 'proposal', 5, 'Needs a booking dashboard with pickup management and invoice flow.', now() - interval '3 days'),
  ('Niran Tech', 'School Service Team', 'niran@example.com', 'Dashboard', '$500 - $1k', 'qualified', 4, 'Internal admin panel for forms, reports, and content updates.', now() - interval '2 days'),
  ('Mainframe Demo', 'DTC Email Platform', 'hello@example.com', 'AI chatbot', '$1k - $2k', 'new', 5, 'AI-assisted content workflow with clear milestone delivery.', now() - interval '8 hours')
on conflict do nothing;

insert into public.demo_tasks (title, area, status, owner, impact, due_date, created_at)
values
  ('Create typed Supabase data model', 'Database', 'done', 'Chatchawan', 5, current_date, now() - interval '2 days'),
  ('Build demo lead intake API', 'Backend', 'in_progress', 'Chatchawan', 5, current_date + 1, now() - interval '1 day'),
  ('Polish responsive backoffice view', 'Frontend', 'queued', 'Chatchawan', 4, current_date + 2, now() - interval '12 hours'),
  ('Prepare AI workflow handoff notes', 'AI', 'queued', 'Chatchawan', 3, current_date + 3, now() - interval '6 hours')
on conflict do nothing;

insert into public.demo_events (event_type, message, created_at)
values
  ('system_note', 'Portfolio backoffice demo connected to Supabase project.', now() - interval '3 days'),
  ('proposal_sent', 'Sent scoped PR proposal for AI-powered email platform.', now() - interval '1 day'),
  ('lead_created', 'New demo lead captured from portfolio website.', now() - interval '6 hours')
on conflict do nothing;
