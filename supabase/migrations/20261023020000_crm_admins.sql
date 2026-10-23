create table if not exists public.crm_admins (
  id uuid primary key default gen_random_uuid(),
  username text not null unique
    check (username = lower(btrim(username)) and username ~ '^[a-z0-9._-]{2,80}$'),
  full_name text not null check (length(btrim(full_name)) between 1 and 160),
  email text not null,
  phone_number text not null default '',
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists crm_admins_email_lower_unique_idx
  on public.crm_admins (lower(email));

alter table public.crm_admins enable row level security;
revoke all on table public.crm_admins from anon, authenticated;
grant all on table public.crm_admins to service_role;
