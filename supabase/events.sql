
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text,
  description text,
  event_date date,
  image_url text,
  tier character varying,
  CONSTRAINT events_pkey PRIMARY KEY (id)
);

create policy "Get Events By Tier" on "public"."events"as PERMISSIVE
for SELECT to public
using(
    CASE (auth.jwt() ->> 'tier'::text)
        WHEN 'free'::text THEN 1
        WHEN 'silver'::text THEN 2
        WHEN 'gold'::text THEN 3
        WHEN 'platinum'::text THEN 4
        ELSE 0
    END >=
    CASE tier
        WHEN 'free'::text THEN 1
        WHEN 'silver'::text THEN 2
        WHEN 'gold'::text THEN 3
        WHEN 'platinum'::text THEN 4
        ELSE 0
END)