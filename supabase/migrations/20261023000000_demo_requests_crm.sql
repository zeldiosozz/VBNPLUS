create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  package_type text not null check (package_type in ('silver', 'bronze', 'gold')),
  locale text not null check (locale in ('en', 'ar')),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone_number text not null,
  business_type text not null,
  address text not null,
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  admin_notes text not null default ''
);

create index if not exists demo_requests_created_at_idx
  on public.demo_requests (created_at desc);

create index if not exists demo_requests_status_idx
  on public.demo_requests (status);

alter table public.demo_requests enable row level security;

revoke all on table public.demo_requests from anon, authenticated;
grant all on table public.demo_requests to service_role;

-- The website uses a Supabase secret/service-role key only from server routes.
-- There are no public or signed-in-user policies for this private CRM table.
