-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  price_starting NUMERIC(10,2),
  published BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Anyone can view published services" ON services
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can view all services" ON services
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage services" ON services
  FOR ALL USING (auth.uid() IS NOT NULL);