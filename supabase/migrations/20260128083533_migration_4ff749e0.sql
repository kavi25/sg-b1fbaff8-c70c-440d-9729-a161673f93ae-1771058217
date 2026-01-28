-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service_type TEXT NOT NULL,
  package_type TEXT,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Authenticated users can view orders" ON orders
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage orders" ON orders
  FOR ALL USING (auth.uid() IS NOT NULL);