-- Add phone and address columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address text;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);