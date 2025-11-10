-- Supabase schema for leads capture
-- Run in the Supabase SQL editor (be sure to select your project)

-- Enable pgcrypto for gen_random_uuid (often enabled by default on Supabase)
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null check (length(email) <= 254 and position('@' in email) > 1),
  ua text,
  path text,
  ip text,
  ts timestamptz not null default now()
);

-- RLS: deny all by default (service_role bypasses RLS)
alter table public.leads enable row level security;

-- No policies = anonymous/authenticated clients cannot read/write.
-- Only service_role (server-side key) used in API can insert.

-- Helpful indexes for analytics
create index if not exists idx_leads_ts on public.leads (ts desc);
create index if not exists idx_leads_email on public.leads (email);

-- Optional: view for last 30 days
create or replace view public.leads_last_30d as
select * from public.leads
where ts >= now() - interval '30 days'
order by ts desc;