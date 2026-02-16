-- Create comments table for blog posts
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_website TEXT,
  comment_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved comments
CREATE POLICY "Anyone can view approved comments" 
ON blog_comments FOR SELECT 
USING (status = 'approved');

-- Anyone can insert comments (will be pending by default)
CREATE POLICY "Anyone can insert comments" 
ON blog_comments FOR INSERT 
WITH CHECK (auth.role() = 'anon' OR auth.role() = 'authenticated');

-- Only authenticated users can update comments
CREATE POLICY "Authenticated users can update comments" 
ON blog_comments FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Only authenticated users can delete comments
CREATE POLICY "Authenticated users can delete comments" 
ON blog_comments FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);