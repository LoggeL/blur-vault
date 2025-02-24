-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create function to create tables if they don't exist
CREATE OR REPLACE FUNCTION create_table_if_not_exists(
  table_name text,
  table_definition text
) RETURNS void AS $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = create_table_if_not_exists.table_name
  ) THEN
    EXECUTE format('CREATE TABLE %I (%s)', table_name, table_definition);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create user_credits table
SELECT create_table_if_not_exists(
  'user_credits',
  '
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    credits integer DEFAULT 5,
    is_admin boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
  '
);

-- Create processing_history table
SELECT create_table_if_not_exists(
  'processing_history',
  '
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    timestamp timestamp with time zone DEFAULT now(),
    faces_detected integer DEFAULT 0,
    thumbnail_url text,
    created_at timestamp with time zone DEFAULT now()
  '
);

-- Set up RLS (Row Level Security) policies
-- For user_credits table
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own credits" ON user_credits;
DROP POLICY IF EXISTS "Users can update their own credits" ON user_credits;
DROP POLICY IF EXISTS "Admins can view all credits" ON user_credits;

-- Create new policies
CREATE POLICY "Users can view their own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own credits"
  ON user_credits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all credits"
  ON user_credits FOR SELECT
  USING ((SELECT is_admin FROM user_credits WHERE user_id = auth.uid()) = true);

-- For processing_history table
ALTER TABLE processing_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own history" ON processing_history;
DROP POLICY IF EXISTS "Users can insert their own history" ON processing_history;
DROP POLICY IF EXISTS "Admins can view all history" ON processing_history;

-- Create new policies
CREATE POLICY "Users can view their own history"
  ON processing_history FOR SELECT
  USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own history"
  ON processing_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all history"
  ON processing_history FOR SELECT
  USING ((SELECT is_admin FROM user_credits WHERE user_id = auth.uid()) = true);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to user_credits table
DROP TRIGGER IF EXISTS update_user_credits_updated_at ON user_credits;
CREATE TRIGGER update_user_credits_updated_at
BEFORE UPDATE ON user_credits
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Create an RPC function to ensure tables exist
CREATE OR REPLACE FUNCTION ensure_tables_exist()
RETURNS boolean AS $$
BEGIN
  -- Create user_credits table if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = 'user_credits'
  ) THEN
    CREATE TABLE user_credits (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
      credits integer DEFAULT 5,
      is_admin boolean DEFAULT false,
      created_at timestamp with time zone DEFAULT now(),
      updated_at timestamp with time zone DEFAULT now()
    );
    
    -- Set up RLS for user_credits
    ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view their own credits"
      ON user_credits FOR SELECT
      USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can update their own credits"
      ON user_credits FOR UPDATE
      USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can insert their own credits"
      ON user_credits FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  -- Create processing_history table if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = 'processing_history'
  ) THEN
    CREATE TABLE processing_history (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
      timestamp timestamp with time zone DEFAULT now(),
      faces_detected integer DEFAULT 0,
      thumbnail_url text,
      created_at timestamp with time zone DEFAULT now()
    );
    
    -- Set up RLS for processing_history
    ALTER TABLE processing_history ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view their own history"
      ON processing_history FOR SELECT
      USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can insert their own history"
      ON processing_history FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 