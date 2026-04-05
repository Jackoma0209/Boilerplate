# AgentForge

Production-ready AI Agent Builder SaaS built with Next.js 15 App Router, TypeScript, Tailwind, Supabase, Stripe, and Vercel.

## What’s included

- Authenticated SaaS shell (marketing, auth, dashboard)
- Agent CRUD + sharing
- Streaming chat with AI SDK
- 8 ready-to-use agent templates
- Simple usage dashboard (agents, chats, messages, tokens + recent activity)
- Stripe test-mode checkout + billing portal + webhook foundation

## Tech stack

- Next.js 15 + TypeScript + Tailwind CSS
- Supabase (Auth + Postgres)
- Stripe
- Vercel Analytics

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. Fill `.env.local` with your values.
4. Start dev server:
   ```bash
   npm run dev
   ```

## Environment variables

Required:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY` (must be test key for current checkout flow: `sk_test_...`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_PRO`
- `STRIPE_WEBHOOK_SECRET`

Optional:

- `OPENAI_MODEL`

## Supabase setup (production and local)

1. Create Supabase project.
2. Enable Auth provider: **Email + Password**.
3. In SQL editor, run migration:
   - `/supabase/migrations/0001_agentforge_schema.sql`
4. Copy project URL and anon/service keys into env vars.

## Stripe test mode setup

1. In Stripe Dashboard, switch to **Test mode**.
2. Create a recurring product/price and set `STRIPE_PRICE_PRO`.
3. Use `STRIPE_SECRET_KEY=sk_test_...`.
4. For local webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
5. Add webhook events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Test card:
   - `4242 4242 4242 4242`
   - Any future date, any CVC, any ZIP

## Vercel deployment instructions

1. Push repository to GitHub.
2. Import project in Vercel.
3. Set build command/output defaults (Next.js preset).
4. Add all env vars in **Project Settings → Environment Variables**.
5. Configure production Stripe webhook endpoint:
   - `https://<your-domain>/api/stripe/webhook`
6. Redeploy after env updates.

## Validation

```bash
npm run lint
npm run build
```

## One-click Gumroad-ready zip

Create a distributable zip from repository root:

```bash
rm -rf /tmp/agentforge-release
mkdir -p /tmp/agentforge-release
rsync -av --exclude node_modules --exclude .next --exclude .git ./ /tmp/agentforge-release/
cd /tmp && zip -r agentforge-mvp.zip agentforge-release
```

Upload `/tmp/agentforge-mvp.zip` to Gumroad as your downloadable product asset.
