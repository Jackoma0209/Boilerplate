# AgentForge

Production-ready AI Agent Builder SaaS built with Next.js App Router, TypeScript, Tailwind, Supabase, Stripe, and Vercel.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres)
- AI SDK + OpenAI
- Stripe checkout + portal + webhook foundation
- Vercel Analytics

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill required keys in `.env.local`.
4. Run app:
   ```bash
   npm run dev
   ```

## Required environment variables

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin flows)
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, defaults to `gpt-4o-mini`)
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_PRO`
- `STRIPE_WEBHOOK_SECRET`

## Supabase setup

- Apply SQL in `/supabase/migrations/0001_agentforge_schema.sql`.
- Ensure Supabase Auth email/password is enabled.

## Stripe setup

- Create a recurring price and set `STRIPE_PRICE_PRO`.
- Configure webhook endpoint: `/api/stripe/webhook`.
- Add `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` events.

## Build and lint

```bash
npm run lint
npm run build
```

## Production deployment (Vercel)

- Import repository into Vercel.
- Set all environment variables in Vercel Project Settings.
- Configure Supabase and Stripe production credentials.
