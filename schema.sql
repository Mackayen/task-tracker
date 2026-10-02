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

create policy "Allow public update"
on tasks for update
to anon
using (true)
with check (true);

create policy "Allow public delete"
on tasks for delete
to anon
using (true);