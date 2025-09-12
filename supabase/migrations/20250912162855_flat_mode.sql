/*
  # Fix RLS policy for reparix table

  1. Security Changes
    - Update existing INSERT policy to allow 'anon' role instead of 'public'
    - This allows anonymous users to submit emails through the frontend
    
  2. Changes Made
    - Drop existing policy that only allows 'public' role
    - Create new policy that allows 'anon' role to insert emails
*/

-- Drop the existing policy that only allows 'public' role
DROP POLICY IF EXISTS "Allow public email insertion" ON reparix;

-- Create new policy that allows anonymous users to insert emails
CREATE POLICY "Allow anonymous email insertion"
  ON reparix
  FOR INSERT
  TO anon
  WITH CHECK (true);