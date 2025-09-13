/*
  # Fix Reparix table RLS policy for email insertions

  1. Security Changes
    - Drop existing restrictive INSERT policy on Reparix table
    - Create new INSERT policy allowing anonymous users to insert emails
    - Ensure RLS remains enabled for security while allowing public email submissions

  2. Changes Made
    - Allow anonymous (anon) role to insert new email records
    - Maintain existing SELECT policy for authenticated users
    - Keep RLS enabled for overall table security
*/

-- Drop the existing restrictive INSERT policy if it exists
DROP POLICY IF EXISTS "Allow public email insertion" ON public."Reparix";

-- Create a new INSERT policy that allows anonymous users to insert emails
CREATE POLICY "Allow anonymous email insertion"
  ON public."Reparix"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the existing SELECT policy for authenticated users remains
-- (This should already exist based on the schema, but we'll recreate it to be safe)
DROP POLICY IF EXISTS "Allow authenticated users to read emails" ON public."Reparix";

CREATE POLICY "Allow authenticated users to read emails"
  ON public."Reparix"
  FOR SELECT
  TO authenticated
  USING (true);