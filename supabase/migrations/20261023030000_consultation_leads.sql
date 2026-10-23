alter table public.demo_requests
  drop constraint if exists demo_requests_package_type_check;

alter table public.demo_requests
  add constraint demo_requests_package_type_check
  check (package_type in ('silver', 'bronze', 'gold', 'consultation'));
