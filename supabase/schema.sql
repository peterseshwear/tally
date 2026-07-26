-- Tally schema: run this in the Supabase dashboard -> SQL Editor -> New query -> Run.
-- Safe to re-run (idempotent).

-- Merchant profile, one row per auth user.
create table if not exists public.merchants (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  business_name text not null default '',
  biz_type integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.merchants enable row level security;

drop policy if exists "merchants select own" on public.merchants;
create policy "merchants select own" on public.merchants
  for select using (auth.uid() = id);

drop policy if exists "merchants insert own" on public.merchants;
create policy "merchants insert own" on public.merchants
  for insert with check (auth.uid() = id);

drop policy if exists "merchants update own" on public.merchants;
create policy "merchants update own" on public.merchants
  for update using (auth.uid() = id);

-- Payments, owned by a merchant. processor_id is the Stripe PaymentIntent id.
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid references auth.users (id) on delete cascade,
  cents integer not null check (cents > 0),
  description text not null default '',
  method text not null default 'Tap to Pay',
  status text not null default 'Paid' check (status in ('Paid', 'Refunded', 'Disputed')),
  processor_id text unique,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

drop policy if exists "payments select own" on public.payments;
create policy "payments select own" on public.payments
  for select using (auth.uid() = merchant_id);

drop policy if exists "payments insert own" on public.payments;
create policy "payments insert own" on public.payments
  for insert with check (auth.uid() = merchant_id);

drop policy if exists "payments update own" on public.payments;
create policy "payments update own" on public.payments
  for update using (auth.uid() = merchant_id);

create index if not exists payments_merchant_created_idx
  on public.payments (merchant_id, created_at desc);
