-- Drop the existing check constraint
ALTER TABLE ai_test_projects DROP CONSTRAINT IF EXISTS ai_test_projects_status_check;

-- Add new check constraint with all required status values
ALTER TABLE ai_test_projects 
ADD CONSTRAINT ai_test_projects_status_check 
CHECK (status = ANY (ARRAY['setup'::text, 'analyzing'::text, 'active'::text, 'completed'::text, 'archived'::text]));