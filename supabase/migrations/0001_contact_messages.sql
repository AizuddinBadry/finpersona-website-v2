-- Contact form submissions from the public /contact page.
-- Inserts are performed server-side via the service role key, so RLS denies
-- all client-side access by default.

create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  topic text not null check (topic in ('general','support','press','partnership','other')),
  message text not null check (char_length(message) between 10 and 5000),
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;
