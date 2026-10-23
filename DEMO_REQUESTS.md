# Demo request email setup

The pricing form submits to `/api/demo-request`. The route validates the request and sends a plain-text notification through Resend. It does not store submissions in a database.

## Configure email delivery

1. Create a Resend account, verify a sending domain, and create an API key.
2. Copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY` to the API key and `DEMO_REQUEST_FROM` to a sender address on the verified domain. `DEMO_REQUEST_TO` is prefilled with `vbnpluss@gmail.com`.
4. Add the same three variables to the production hosting environment, then redeploy.

Keep `.env.local` and API keys out of version control. Submissions are delivered to the inbox; they are not retained by this website.
