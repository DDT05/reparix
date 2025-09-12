/*
  # Update RLS policy for reparix table - Allow everything

  1. Security Changes
    - Drop existing restrictive policies
    - Create permissive policies that allow all operations
    - Enable public access for INSERT, SELECT, UPDATE, DELETE

  This resolves the "new row violates row-level security policy" error
  by allowing anonymous users to insert email subscriptions.
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous email insertion" ON reparix;
DROP POLICY IF EXISTS "Allow authenticated users to read" ON reparix;

-- Create new permissive policies that allow everything
CREATE POLICY "Allow all operations for everyone"
  ON reparix
  FOR ALL
  TO anon, authenticated, public
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE reparix ENABLE ROW LEVEL SECURITY;