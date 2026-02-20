-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Enable public comment submission" ON blog_comments;

-- Create new simplified policy that allows any user to insert as long as required fields are present
-- The status will be handled by the database default
CREATE POLICY "Allow anyone to submit comments"
ON blog_comments
FOR INSERT
WITH CHECK (true);