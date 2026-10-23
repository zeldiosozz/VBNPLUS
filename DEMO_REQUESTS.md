# Demo request form and CRM setup

The pricing form submits to `/api/demo-request`. Every valid submission is saved in Supabase and appears in the protected CRM at the private path configured by `CRM_ADMIN_PATH`. Resend sends an optional email notification to `vbnpluss@gmail.com`; a mail delivery problem does not discard the saved lead.

## 1. Create the CRM database

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. In the Supabase project, open **SQL Editor** and run [`supabase/migrations/20261023000000_demo_requests_crm.sql`](supabase/migrations/20261023000000_demo_requests_crm.sql).
3. Run the workflow upgrade [`supabase/migrations/20261023010000_crm_workflow.sql`](supabase/migrations/20261023010000_crm_workflow.sql) to add priority, follow-up dates, sources, and activity history.
4. Run [`supabase/migrations/20261023020000_crm_admins.sql`](supabase/migrations/20261023020000_crm_admins.sql) to create the CRM admin allowlist.
5. Run [`supabase/migrations/20261023030000_consultation_leads.sql`](supabase/migrations/20261023030000_consultation_leads.sql) to allow free-consultation requests to be stored separately from pricing plans.
6. Run [`supabase/migrations/20261023040000_newsletter_subscribers.sql`](supabase/migrations/20261023040000_newsletter_subscribers.sql) to create storage for footer newsletter signups. Submitting an address saves it in `newsletter_subscribers`; duplicate addresses are safely ignored.
7. Add an enabled admin account in the SQL Editor. Replace the example values with the admin's details:

   ```sql
   insert into public.crm_admins (username, full_name, email, phone_number, is_active)
   values ('your-username', 'Your Name', 'you@example.com', '+201234567890', true);
   ```

   Set `is_active = false` to block an account. Its existing sessions will also stop working.
8. From the project API settings, copy the project URL and a **Secret key** (`sb_secret_…`). Keep the secret key private. It is only used by server code and must never be prefixed with `NEXT_PUBLIC_`. The backend also accepts the older `service_role` key if your project only has that key.

## 2. Configure the website

Copy `.env.example` to `.env.local` and set:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your-private-secret-key
CRM_ADMIN_PASSWORD=choose-a-long-unique-password
CRM_SESSION_SECRET=generate-a-random-secret-at-least-32-characters-long
CRM_ADMIN_PATH=your-private-random-url-segment
```

Sign-in requires an existing, active username from `crm_admins` and the configured `CRM_ADMIN_PASSWORD`. All listed admins currently share that password. `CRM_ADMIN_PATH` controls the page URL after `/admin/`; `/admin` itself returns 404. Keep the path private and do not use a `NEXT_PUBLIC_` variable.

For email notifications, also set `RESEND_API_KEY` and `DEMO_REQUEST_FROM` to an address on your verified Resend domain. `DEMO_REQUEST_TO` is already set to `vbnpluss@gmail.com`. Email is optional; CRM storage works without Resend.

Restart the local Next.js server after changing `.env.local`, then open `/admin/<CRM_ADMIN_PATH>` and sign in with an active admin username and `CRM_ADMIN_PASSWORD`.

## 3. Configure production

Add the same values in your hosting provider's environment-variable settings for the production deployment, then redeploy. Use a unique, strong admin password and a separately generated random session secret and path in production. Do not commit `.env.local`, send credentials in chat, or expose the Supabase secret/service-role key to browser code.

## CRM features

- View and search the full lead history with server-side pagination and status filtering.
- Add leads manually or receive them from the pricing form.
- Search and filter all leads with server-side pagination.
- Open a lead to see its selected package, contact details, source, address, business type and message.
- Track each lead as New, Contacted, Qualified or Closed; set priority and schedule follow-ups.
- Review a permanent activity timeline, add notes, and export filtered leads to CSV.
- Sign in at the configured private path with an enabled username; sessions are HTTP-only and expire after 12 hours. Production refuses an admin password shorter than 12 characters.

Submissions and activity history are retained in Supabase. Leads are not currently deleted from the CRM.
