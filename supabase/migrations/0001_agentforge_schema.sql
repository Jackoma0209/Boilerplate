create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  slug text not null unique,
  system_prompt text not null,
  tools_config jsonb not null default '[]'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agent_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  system_prompt text not null,
  tools_config jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  title text not null default 'New Chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  token_count integer,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.agent_templates enable row level security;
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.analytics_events enable row level security;
alter table public.subscriptions enable row level security;

create policy "profiles owner read" on public.profiles for select using (auth.uid() = id);
create policy "profiles owner update" on public.profiles for update using (auth.uid() = id);

create policy "agents owner full" on public.agents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "agents public read" on public.agents for select using (is_public = true);

create policy "templates public read" on public.agent_templates for select using (true);

create policy "chats owner full" on public.chats for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "messages owner full" on public.messages
for all using (
  exists (
    select 1 from public.chats where chats.id = messages.chat_id and chats.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.chats where chats.id = messages.chat_id and chats.user_id = auth.uid()
  )
);

create policy "analytics owner full" on public.analytics_events
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "subscriptions owner full" on public.subscriptions
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into public.agent_templates (title, description, category, system_prompt, tools_config)
values
  ('Marketing Agent', 'Plans campaigns, positioning, and launch assets for your product.', 'Marketing', 'You are a senior marketing strategist. Build clear channel plans, messaging, and launch timelines with concise action steps.', '["web-search","brand-voice"]'),
  ('Research Agent', 'Finds facts, synthesizes sources, and drafts concise reports.', 'Research', 'You are a research analyst. Gather reliable evidence, cite assumptions, and summarize tradeoffs clearly.', '["web-search","source-summarizer"]'),
  ('Outreach Agent', 'Writes personalized outbound messages and follow-up sequences.', 'Sales', 'You are an outreach specialist. Draft high-converting personalized outreach with strong but respectful calls to action.', '["crm-lookup","email-drafter"]'),
  ('Content Agent', 'Generates blogs, social posts, and repurposed content quickly.', 'Content', 'You are a content strategist. Turn ideas into audience-specific content with strong hooks and clear structure.', '["content-calendar","seo-optimizer"]'),
  ('Job Search Agent', 'Optimizes resumes, cover letters, and interview prep responses.', 'Career', 'You are a career coach. Tailor resumes and cover letters to roles, and provide actionable interview prep guidance.', '["resume-parser","job-matcher"]'),
  ('Voice Agent', 'Creates voice-ready scripts and conversational dialogue flows.', 'Voice', 'You are a voice assistant designer. Write natural spoken responses and concise dialogue trees for voice experiences.', '["speech-style","voice-script"]'),
  ('Code Review Agent', 'Reviews code for quality, security, and maintainability.', 'Engineering', 'You are a principal engineer reviewer. Identify bugs, security risks, and maintainability issues with prioritized fixes.', '["repo-search","static-analysis"]'),
  ('Personal Assistant', 'Helps plan schedules, tasks, and daily decision workflows.', 'Productivity', 'You are a proactive personal assistant. Help prioritize tasks, structure plans, and provide concise next actions.', '["calendar","task-manager"]')
on conflict do nothing;
