-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Anyone can submit comments" ON blog_comments;

-- Create a new, more explicit INSERT policy that allows both anonymous and authenticated users
CREATE POLICY "Allow public comment submission" ON blog_comments
  FOR INSERT
  TO public
  WITH CHECK (
    -- Allow both anonymous (anon) and authenticated users
    (auth.role() = 'anon' OR auth.role() = 'authenticated')
    AND
    -- Ensure required fields are present
    author_name IS NOT NULL
    AND author_email IS NOT NULL
    AND comment_text IS NOT NULL
    AND post_id IS NOT NULL
    AND status = 'pending'
  );