alter table public.demo_requests
  add column if not exists priority text not null default 'normal',
  add column if not exists follow_up_at timestamptz,
  add column if not exists source text not null default 'website';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'demo_requests_priority_check'
      and conrelid = 'public.demo_requests'::regclass
  ) then
    alter table public.demo_requests
      add constraint demo_requests_priority_check
      check (priority in ('normal', 'high', 'urgent'));
  end if;
end $$;

create table if not exists public.demo_request_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.demo_requests(id) on delete cascade,
  activity_type text not null check (activity_type in ('created', 'status', 'priority', 'follow_up', 'note')),
  details text not null,
  created_at timestamptz not null default now(),
  actor text not null default 'Admin'
);

create index if not exists demo_request_activities_lead_created_idx
  on public.demo_request_activities (lead_id, created_at desc);

alter table public.demo_request_activities enable row level security;
revoke all on table public.demo_request_activities from anon, authenticated;
grant all on table public.demo_request_activities to service_role;

-- Backfill a first timeline entry for requests that existed before this migration.
insert into public.demo_request_activities (lead_id, activity_type, details, actor)
select id, 'created', 'Lead received through the website pricing form.', 'Website'
from public.demo_requests lead
where not exists (
  select 1 from public.demo_request_activities activity
  where activity.lead_id = lead.id and activity.activity_type = 'created'
);

create or replace function public.track_demo_request_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.demo_request_activities (lead_id, activity_type, details, actor)
    values (
      new.id,
      'created',
      case when new.source = 'website' then 'Lead received through the website pricing form.' else 'Lead added manually from ' || new.source || '.' end,
      case when new.source = 'website' then 'Website' else 'Admin' end
    );
    return new;
  end if;

  if new.status is distinct from old.status then
    insert into public.demo_request_activities (lead_id, activity_type, details)
    values (new.id, 'status', 'Status changed to ' || new.status || '.');
  end if;
  if new.priority is distinct from old.priority then
    insert into public.demo_request_activities (lead_id, activity_type, details)
    values (new.id, 'priority', 'Priority set to ' || new.priority || '.');
  end if;
  if new.follow_up_at is distinct from old.follow_up_at then
    insert into public.demo_request_activities (lead_id, activity_type, details)
    values (
      new.id,
      'follow_up',
      case when new.follow_up_at is null then 'Follow-up date cleared.' else 'Follow-up scheduled for ' || to_char(new.follow_up_at at time zone 'UTC', 'YYYY-MM-DD HH24:MI') || ' UTC.' end
    );
  end if;
  if new.admin_notes is distinct from old.admin_notes then
    insert into public.demo_request_activities (lead_id, activity_type, details)
    values (new.id, 'note', 'Internal CRM notes were updated.');
  end if;
  return new;
end;
$$;

drop trigger if exists demo_request_activity_audit on public.demo_requests;
create trigger demo_request_activity_audit
after insert or update on public.demo_requests
for each row execute function public.track_demo_request_changes();
