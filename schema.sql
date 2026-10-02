create table tasks (
  id bigint generated always as identity primary key,
  title text not null,
  category text,
  is_done boolean default false,
  created_at timestamptz default now()
);

create policy "Allow public read"
on tasks for select
to anon
using (true);