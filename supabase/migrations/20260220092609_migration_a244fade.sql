-- Drop the existing problematic INSERT policy
DROP POLICY IF EXISTS "Allow public comment submission" ON blog_comments;

-- Create a simpler, more permissive policy that definitely works
CREATE POLICY "Enable insert for all users" ON blog_comments
  FOR INSERT
  TO public
  WITH CHECK (
    author_name IS NOT NULL
    AND author_email IS NOT NULL
    AND comment_text IS NOT NULL
    AND post_id IS NOT NULL
  );