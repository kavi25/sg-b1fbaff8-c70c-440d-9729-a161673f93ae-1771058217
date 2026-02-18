-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can insert comments" ON blog_comments;

-- Create a new, more permissive INSERT policy that allows all users to submit comments
CREATE POLICY "Anyone can submit comments" ON blog_comments
  FOR INSERT
  WITH CHECK (true);