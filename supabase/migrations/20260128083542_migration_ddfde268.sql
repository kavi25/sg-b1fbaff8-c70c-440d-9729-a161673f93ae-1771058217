-- Create media_library table
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_media_created ON media_library(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_type ON media_library(mime_type);

-- Enable RLS
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_library
CREATE POLICY "Authenticated users can view media" ON media_library
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can upload media" ON media_library
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete media" ON media_library
  FOR DELETE USING (auth.uid() IS NOT NULL);