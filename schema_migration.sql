-- Database Schema Migration and Seeding

-- 1. Add extra columns to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS author text,
ADD COLUMN IF NOT EXISTS sub_headline text,
ADD COLUMN IF NOT EXISTS region text,
ADD COLUMN IF NOT EXISTS seo_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'published';

-- Update existing articles with defaults
UPDATE public.articles SET status = 'published' WHERE status IS NULL;
UPDATE public.articles SET author = 'InPunjab Desk' WHERE author IS NULL;

-- 2. Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE,
    article_title text,
    username text,
    content text,
    status text DEFAULT 'pending', -- 'flagged', 'pending', 'approved', 'spam'
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE,
    source text DEFAULT 'Homepage Form',
    region text DEFAULT 'Punjab',
    status text DEFAULT 'active', -- 'active', 'unverified'
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create tickers table
CREATE TABLE IF NOT EXISTS public.tickers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    text text NOT NULL,
    scroll_speed text DEFAULT 'Normal (45s)',
    label text DEFAULT '🔴 Breaking',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create ads table
CREATE TABLE IF NOT EXISTS public.ads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slot_name text NOT NULL,
    size text,
    advertiser text,
    expires_at date,
    ctr numeric DEFAULT 0.0,
    status text DEFAULT 'Available', -- 'Live', 'Available', 'Expired'
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Setup Row-Level Security (RLS) policies
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on published articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public all access on articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public all access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public all access on comments" ON public.comments;
DROP POLICY IF EXISTS "Allow public all access on subscribers" ON public.subscribers;
DROP POLICY IF EXISTS "Allow public all access on tickers" ON public.tickers;
DROP POLICY IF EXISTS "Allow public all access on ads" ON public.ads;

CREATE POLICY "Allow public all access on articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on comments" ON public.comments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on subscribers" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on tickers" ON public.tickers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on ads" ON public.ads FOR ALL USING (true) WITH CHECK (true);

-- 7. Atomic RPC Function for View Counting
CREATE OR REPLACE FUNCTION increment_view_count(article_id uuid)
RETURNS void AS $$
BEGIN
    UPDATE public.articles
    SET view_count = COALESCE(view_count, 0) + 1
    WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Seed Initial Data
TRUNCATE TABLE public.comments CASCADE;
TRUNCATE TABLE public.subscribers CASCADE;
TRUNCATE TABLE public.tickers CASCADE;
TRUNCATE TABLE public.ads CASCADE;

-- Seed Tickers
INSERT INTO public.tickers (text, scroll_speed, label) VALUES
('Punjab CM announces new agricultural policy — direct benefit to 12 lakh farmers', 'Normal (45s)', '🔴 Breaking'),
('Amritsar: Golden Temple receives record 1.2 lakh pilgrims on Gurpurab', 'Normal (45s)', '🔴 Breaking'),
('Ludhiana industries report 18% growth in exports this quarter', 'Normal (45s)', '🔴 Breaking'),
('Chandigarh: High Court orders immediate action on river pollution', 'Normal (45s)', '🔴 Breaking'),
('India-Pakistan border: BSF nabs three smugglers near Firozpur', 'Normal (45s)', '🔴 Breaking');

-- Seed Comments (associated with a random article for demonstration)
DO $$
DECLARE
    art_id uuid;
BEGIN
    SELECT id INTO art_id FROM public.articles LIMIT 1;
    
    INSERT INTO public.comments (article_id, article_title, username, content, status) VALUES
    (art_id, 'Border Security Alert', 'Gurjeet_PB', 'This is completely false propaganda. The government is hiding the real situation from us. Wake up people before it''s too late! Share this everywhere!!!', 'flagged'),
    (art_id, 'Punjab Drug Crisis', 'anon_user_442', 'All politicians are same. Modi, Mann, all taking money. Nothing will change. This article is paid media nonsense.', 'flagged'),
    (art_id, 'Golden Temple Langar Kitchen', 'Simran_Amritsar', 'Wonderful initiative! I visit the Golden Temple regularly and this will make such a big difference. Waheguru bless this project. 🙏', 'pending');
END $$;

-- Seed Subscribers
INSERT INTO public.subscribers (email, source, region, status) VALUES
('gurpreet.s@gmail.com', 'Homepage Form', 'Ludhiana', 'active'),
('simran.kaur.92@yahoo.com', 'Breaking News Banner', 'Amritsar', 'active'),
('r.sharma.delhi@gmail.com', 'Social Media', 'Delhi', 'active'),
('nri.harjinder@outlook.com', 'NRI Readers Campaign', 'Canada', 'active'),
('test@test.com', 'Unknown', '—', 'unverified');

-- Seed Ads
INSERT INTO public.ads (slot_name, size, advertiser, expires_at, ctr, status) VALUES
('Header Banner (728×90)', '728×90', 'Punjab Kesari Real Estate Expo', '2026-06-30', 4.1, 'Live'),
('Sidebar Ad — Top (300×250)', '300×250', 'Omaxe Chandigarh Extension', '2026-07-15', 3.7, 'Live'),
('Leaderboard — Mid Page (970×90)', '970×90', 'Punjab National Bank', '2026-07-31', 2.2, 'Live'),
('Ad Strip — Ticker Row', 'rolling', 'DLF Punjab, Chandigarh University, Tata Motors (4 slots)', NULL, 1.9, 'Live'),
('Sidebar Ad — Bottom (300×250)', '300×250', NULL, NULL, 0.0, 'Available');
