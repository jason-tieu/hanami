-- Ensure table exists (skip if already created)
create table if not exists public.lms_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider = 'canvas'),
  base_url text not null,
  external_user_id text not null,              -- Canvas numeric id as text for safety
  created_at timestamptz not null default now(),
  unique (owner_id, provider, base_url)
);

-- Profile fields (idempotent adds)
alter table public.lms_accounts
  add column if not exists name text,
  add column if not exists short_name text,
  add column if not exists sortable_name text,
  add column if not exists avatar_url text,
  add column if not exists primary_email text,
  add column if not exists login_id text,
  add column if not exists integration_id text,
  add column if not exists time_zone text,
  add column if not exists locale text,
  add column if not exists effective_locale text,
  add column if not exists calendar_ics text,
  add column if not exists last_profile_sync_at timestamptz;

-- RLS (keep existing; ensure these three exist as separate policies)
alter table public.lms_accounts enable row level security;

drop policy if exists lms_accounts_select_mine on public.lms_accounts;
create policy lms_accounts_select_mine
on public.lms_accounts for select using (owner_id = auth.uid());

drop policy if exists lms_accounts_update_mine on public.lms_accounts;
create policy lms_accounts_update_mine
on public.lms_accounts for update using (owner_id = auth.uid());

drop policy if exists lms_accounts_insert_mine on public.lms_accounts;
create policy lms_accounts_insert_mine
on public.lms_accounts for insert with check (owner_id = auth.uid());
