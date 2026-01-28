-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can view all blog posts" ON blog_posts
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update blog posts" ON blog_posts
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts
  FOR DELETE USING (auth.uid() IS NOT NULL);