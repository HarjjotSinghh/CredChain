/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

create table roles (
    id text primary key,
    name text not null
);

create table user_roles (
  id uuid primary key,
  user_id uuid references auth.users not null,
  role_id text references roles not null
);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


/**
* CERTIFICATES
* Links Supabase with on-chain blockchain storage
*/
create table certificates (
    id uuid primary key, -- Unique identifier for this record
    user_id uuid references auth.users not null, -- The recipient of the certificate
    certificate_hash text not null, -- Hash or unique identifier from the blockchain
    issuing_institution_id text, -- References a new 'institutions' table (explained later)
    issue_date timestamp with time zone not null,
    metadata jsonb -- For other relevant details (course name, grades, etc. if desired)
    certificate_type_id text references certificate_types, -- References a new 'certificate_types' table
);
alter table certificates enable row level security;

create table certificate_types (
    id text primary key,
    name text not null,  -- (e.g., "Diploma", "Course Completion", etc.)
    description text
);

-- Policies: User's can view their own certificates. 
-- More nuanced restrictions may be needed later
create policy "Can view own certificates." on certificates 
    for select using (auth.uid() = user_id); 

create table institutions (
    id text primary key, -- Consider if you'll have institution-specific IDs
    name text not null, 
    address text,  
    contact_info text, 
    public_key text -- To verify on-chain signatures (more on this later)
);
-- Optionally add RLS policies if institutions have data visibility levels