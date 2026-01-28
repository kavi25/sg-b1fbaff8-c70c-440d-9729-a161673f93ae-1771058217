-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions" ON contact_submissions
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update contact submissions" ON contact_submissions
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete contact submissions" ON contact_submissions
  FOR DELETE USING (auth.uid() IS NOT NULL);