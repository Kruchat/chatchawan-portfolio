create extension if not exists "pgcrypto";

create table if not exists public.site_content (
  locale text primary key check (locale in ('en', 'th', 'zh')),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key default 'default',
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  check (id = 'default')
);

create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  locale text not null check (locale in ('en', 'th', 'zh')),
  title text not null check (char_length(title) between 2 and 180),
  summary text not null default '',
  description text not null default '',
  price_from text not null default '',
  timeline text not null default '',
  features text[] not null default '{}',
  deliverables text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, locale)
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  locale text not null check (locale in ('en', 'th', 'zh')),
  title text not null check (char_length(title) between 2 and 180),
  type text not null default '',
  summary text not null default '',
  href text not null default '/projects/ai-service-crm',
  tags text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, locale)
);

create table if not exists public.hiring_requests (
  id uuid primary key default gen_random_uuid(),
  service_slug text,
  service_title text,
  name text not null check (char_length(name) between 2 and 100),
  company text,
  email text check (email is null or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  contact_channel text,
  budget text,
  timeline text,
  project_goal text not null check (char_length(project_goal) between 12 and 1600),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'in_progress', 'completed', 'cancelled')),
  locale text not null default 'en' check (locale in ('en', 'th', 'zh')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  company text,
  email text check (email is null or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  channel text,
  message text not null check (char_length(message) between 8 and 1200),
  status text not null default 'new' check (status in ('new', 'replied', 'archived')),
  locale text not null default 'en' check (locale in ('en', 'th', 'zh')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_packages_locale_active_idx on public.service_packages (locale, is_active, sort_order);
create index if not exists portfolio_projects_locale_active_idx on public.portfolio_projects (locale, is_active, sort_order);
create index if not exists hiring_requests_status_created_idx on public.hiring_requests (status, created_at desc);
create index if not exists contact_messages_status_created_idx on public.contact_messages (status, created_at desc);

alter table public.site_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.service_packages enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.hiring_requests enable row level security;
alter table public.contact_messages enable row level security;

revoke all on table public.site_content from anon, authenticated;
revoke all on table public.site_settings from anon, authenticated;
revoke all on table public.service_packages from anon, authenticated;
revoke all on table public.portfolio_projects from anon, authenticated;
revoke all on table public.hiring_requests from anon, authenticated;
revoke all on table public.contact_messages from anon, authenticated;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.site_content to service_role;
grant select, insert, update, delete on table public.site_settings to service_role;
grant select, insert, update, delete on table public.service_packages to service_role;
grant select, insert, update, delete on table public.portfolio_projects to service_role;
grant select, insert, update, delete on table public.hiring_requests to service_role;
grant select, insert, update, delete on table public.contact_messages to service_role;

insert into public.site_settings (id, settings)
values (
  'default',
  jsonb_build_object(
    'email', 'hello@example.com',
    'lineUrl', '',
    'whatsappUrl', '',
    'messengerUrl', '',
    'responseNote', 'Usually replies within 1 business day from Asia/Bangkok (UTC+7).'
  )
)
on conflict (id) do nothing;
