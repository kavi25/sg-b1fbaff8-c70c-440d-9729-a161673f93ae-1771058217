-- Create admin user in auth.users table
-- Note: Supabase manages auth.users via their API, so we'll need to use the dashboard
-- But we can prepare the profile entry

-- First, let's check if we need to insert a profile for any existing auth users
-- For now, I'll create a note that the admin user needs to be created via Supabase Dashboard

-- Create a helper function to make user admin after they sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, is_admin, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'admin',
    true,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();