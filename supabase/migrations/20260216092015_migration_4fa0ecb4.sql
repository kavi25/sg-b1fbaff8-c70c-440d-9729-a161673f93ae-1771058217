-- Create storage bucket for blog media if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for blog media
CREATE POLICY "Public read access for blog media" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-media');

CREATE POLICY "Authenticated users can upload blog media" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-media' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update their blog media" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-media' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete their blog media" ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-media' AND
  auth.role() = 'authenticated'
);