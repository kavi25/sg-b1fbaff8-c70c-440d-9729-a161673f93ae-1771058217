-- Create the avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public Avatar Access" ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

-- Create storage policy for authenticated upload
CREATE POLICY "Authenticated Upload Avatars" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Create storage policy for users to update their own avatars
CREATE POLICY "Users Update Own Avatars" ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

-- Create storage policy for users to delete their own avatars
CREATE POLICY "Users Delete Own Avatars" ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');