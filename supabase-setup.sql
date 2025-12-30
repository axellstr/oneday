-- =====================================================
-- SUPABASE SETUP for oneday
-- Run this in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query
-- =====================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- Stores user profile information (created on signup)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Users can only view/edit their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- USER_HABITS TABLE
-- Stores habit data as JSONB for each user
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_habits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_data JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_habits ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own habits" ON public.user_habits;
DROP POLICY IF EXISTS "Users can update own habits" ON public.user_habits;
DROP POLICY IF EXISTS "Users can insert own habits" ON public.user_habits;
DROP POLICY IF EXISTS "Users can delete own habits" ON public.user_habits;

-- Users can only access their own habits
CREATE POLICY "Users can view own habits" 
  ON public.user_habits 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" 
  ON public.user_habits 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" 
  ON public.user_habits 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" 
  ON public.user_habits 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTION: Auto-create profile on user signup
-- Handles both email/password and Google OAuth signups
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile with data from auth.users
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'display_name',
      NULL
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture',
      NULL
    )
  );
  
  -- Also create empty habits record
  INSERT INTO public.user_habits (user_id, habit_data)
  VALUES (NEW.id, '[]'::jsonb);
  
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, skip
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- FUNCTION: Update updated_at timestamp automatically
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_habits_updated_at ON public.user_habits;
CREATE TRIGGER update_user_habits_updated_at
  BEFORE UPDATE ON public.user_habits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- INDEXES for better performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_habits_user_id ON public.user_habits(user_id);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.user_habits TO anon, authenticated;

-- =====================================================
-- ENABLE GOOGLE AUTH IN SUPABASE DASHBOARD
-- 
-- 1. Go to Authentication > Providers
-- 2. Enable Google
-- 3. Get credentials from Google Cloud Console:
--    - Go to https://console.cloud.google.com
--    - Create a project or select existing
--    - Go to APIs & Services > Credentials
--    - Create OAuth 2.0 Client ID (Web application)
--    - Add authorized redirect URI:
--      https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
-- 4. Enter Client ID and Client Secret in Supabase
-- 5. Save
-- 
-- URL Configuration (Authentication > URL Configuration):
-- - Site URL: Your production URL (e.g. https://yourdomain.com)
-- - Redirect URLs: Add your callback URLs:
--   - http://localhost:4321/auth/callback (development)
--   - https://yourdomain.com/auth/callback (production)
-- =====================================================
